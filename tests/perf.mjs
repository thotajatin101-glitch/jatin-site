// Slow-machine frame test: walks the whole site the way a visitor does and records every frame,
// on machines much weaker than this one. Dev-only (Playwright from tests/browsers), never ships.
//
//   node tests/perf.mjs                    all rigs, site/ served locally
//   node tests/perf.mjs <url>              a live deploy
//   RIG=gpu node tests/perf.mjs            one rig (names below)
//   ONLY=about,contact node tests/perf.mjs  only those sections
//   SITE_DIR=<folder> TAG=before …          measure another copy of the site (e.g. the last release) under its own file name
//   PROF=1 node tests/perf.mjs             also profile JS per phase (top functions by self time)
//   LADDER=1,2,4,8,12 RIG=phone node tests/perf.mjs
//                                          his ask: lower the power after each pass. Runs the whole walk once per CPU
//                                          slowdown, weakest last, then prints one table: fps per screen per step,
//                                          so you can see where each screen falls apart.
//
// Rigs:
//   gpu    a weak integrated GPU: software rendering (SwiftShader) on a 1366×768 laptop, 2× slower CPU.
//          Every pixel the GPU would draw runs on the CPU, so fill-heavy screens show up hard.
//   phone  a mid-range phone: 390×844 @3x touch, 6× slower CPU, real GPU (headed, Metal).
//   cpu    a slow laptop CPU: 1440×900 @1x, 6× slower CPU, real GPU (headed, Metal).
//
// Per phase it prints fps (median), p95 frame ms, % of frames over 33ms (visible stutter),
// the longest frame, long tasks, and the frame governor's level (Q.s) at the end.
// Results also land in docs/process/perf/<date>-<rig>.json so runs can be compared.

import fs from 'node:fs';
import path from 'node:path';
import { serve } from './serve.mjs';
import { chromium } from './browsers/node_modules/playwright/index.mjs';

const REPO = path.resolve(import.meta.dirname, '..');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const RIGS = {
  gpu:   { cpu: 2, headless: true,  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
           ctx: { viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 } },
  phone: { cpu: 6, headless: false, args: ['--use-angle=metal', '--ignore-gpu-blocklist'],
           ctx: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } },
  cpu:   { cpu: 6, headless: false, args: ['--use-angle=metal', '--ignore-gpu-blocklist'],
           ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
};

// rAF recorder + long tasks, installed before the page's own code runs.
const REC = () => {
  const f = []; window.__f = f; window.__lt = [];
  const loop = (t) => { f.push(t); requestAnimationFrame(loop); }; requestAnimationFrame(loop);
  try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push([e.startTime, e.duration]))).observe({ type: 'longtask', buffered: true }); } catch {}
};

function stats(ts, lt, a, b) {
  const t = ts.filter((x) => x >= a && x <= b), d = [];
  for (let i = 1; i < t.length; i++) d.push(t[i] - t[i - 1]);
  if (!d.length) return null;
  const s = [...d].sort((x, y) => x - y), q = (p) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
  const L = lt.filter(([st]) => st >= a && st <= b);
  return { fps: +(1000 / q(.5)).toFixed(1), p95: +q(.95).toFixed(1), jank: +(100 * d.filter((x) => x > 33.4).length / d.length).toFixed(1),
           worst: +s[s.length - 1].toFixed(0), longTasks: L.length, longMs: Math.round(L.reduce((x, [, y]) => x + y, 0)) };
}

async function runRig(name, url, cpu) {
  const R = { ...RIGS[name], cpu: cpu ?? RIGS[name].cpu };
  const browser = await chromium.launch({ headless: R.headless, args: R.args });
  const ctx = await browser.newContext(R.ctx);
  await ctx.addInitScript(REC);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: R.cpu });
  const errors = []; page.on('pageerror', (e) => errors.push(String(e)));
  const touch = !!R.ctx.hasTouch, W = R.ctx.viewport.width, H = R.ctx.viewport.height;
  const now = () => page.evaluate(() => performance.now());
  const phases = [];
  let prof = null;
  if (process.env.PROF) { await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: 500 }); }

  // one phase = an action, then `ms` of watching
  const phase = async (label, act, ms) => {
    if (prof !== null || process.env.PROF) await cdp.send('Profiler.start');
    const a = await now(); await act(); await sleep(ms); const b = await now();
    let top = null;
    if (process.env.PROF) {
      const { profile } = await cdp.send('Profiler.stop'); const self = new Map();
      const byId = new Map(profile.nodes.map((n) => [n.id, n])), dt = profile.timeDeltas, up = new Map();
      profile.nodes.forEach((n) => (n.children || []).forEach((c) => up.set(c, n.id)));
      // a browser call (getImageData, texImage2D…) is named with the site function that made it
      const name = (id) => { const n = byId.get(id).callFrame; let k = `${n.functionName || '(anon)'}:${n.lineNumber + 1}`;
        if (!n.url && n.lineNumber < 0) { let p = up.get(id); while (p && !byId.get(p).callFrame.url) p = up.get(p); if (p) { const c = byId.get(p).callFrame; k = `${n.functionName}<${c.functionName || '(anon)'}:${c.lineNumber + 1}`; } }
        return k; };
      profile.samples.forEach((id, i) => { const k = name(id); self.set(k, (self.get(k) || 0) + (dt[i] || 0) / 1000); });
      top = [...self].filter(([k]) => !/^\((idle|program|garbage collector)\)/.test(k)).sort((x, y) => y[1] - x[1]).slice(0, 6).map(([k, v]) => `${k} ${v.toFixed(0)}ms`);
    }
    const { f, lt, q } = await page.evaluate(() => ({ f: window.__f, lt: window.__lt, q: typeof Q !== 'undefined' ? Q.s : null }));
    const s = stats(f, lt, a, b); phases.push({ label, ...s, Q: q, top });
    const row = s ? `${label.padEnd(26)} ${String(s.fps).padStart(5)}fps  p95 ${String(s.p95).padStart(6)}ms  jank ${String(s.jank).padStart(5)}%  worst ${String(s.worst).padStart(5)}ms  long ${s.longTasks}/${s.longMs}ms  Q ${q == null ? '-' : q.toFixed(2)}` : `${label} (no frames)`;
    console.log('  ' + row); if (top) console.log('      ' + top.join(' · '));
  };
  const tap = (x, y) => touch ? page.touchscreen.tap(x, y) : page.mouse.click(x, y);
  const key = (k) => page.keyboard.press(k);
  // the menu wraps, so walk from the selected plate (read off the page), never by a fixed count
  const toItem = async (i) => { for (let n = 0; n < 8; n++) { const c = await page.evaluate(() => [...document.querySelectorAll('.mItem')].findIndex((e) => e.classList.contains('sel')));
    if (c === i) return; await key(c < i ? 'ArrowDown' : 'ArrowUp'); await sleep(120); } throw new Error('could not select menu item ' + i); };


  console.log(`\n${name}  (${R.ctx.viewport.width}×${R.ctx.viewport.height} @${R.ctx.deviceScaleFactor}x, CPU ÷${R.cpu}${R.args[0].includes('swift') ? ', software GPU' : ''})`);
  await page.goto(url, { waitUntil: 'load' });
  await phase('intro: float (waiting)', async () => {}, 2500);
  await phase('intro: snap → menu', async () => { touch ? await tap(W / 2, H * .22) : await key('x'); }, 5000);
  await phase('menu: idle', async () => {}, 3000);
  await phase('menu: browsing', async () => { for (let i = 0; i < 6; i++) { await key(i % 2 ? 'ArrowUp' : 'ArrowDown'); await sleep(350); } }, 600);
  const SECS = ['about', 'projects', 'skills', 'contact'];
  for (let i = 0; i < 4; i++) {
    const s = SECS[i];
    if (process.env.ONLY && !process.env.ONLY.split(',').includes(s)) continue;
    await toItem(i); await sleep(500);
    await phase(`${s}: open`, () => key('Enter'), 3000);
    const open = await page.evaluate((id) => document.getElementById('sec-' + id)?.classList.contains('active'), s);
    if (!open) throw new Error(`${s} did not open`);
    await phase(`${s}: idle`, async () => {}, 2500);
    if (s === 'projects') {
      await phase('projects: dolly → OS', () => key('Enter'), 3000);
      await phase('projects: OS browse', async () => { for (let n = 0; n < 4; n++) { await key('ArrowRight'); await sleep(400); } }, 600);
      await phase('projects: open folder', () => key('Enter'), 2500);
      for (let n = 0; n < 3; n++) { await key('Escape'); await sleep(700); }
    }
    if (s === 'skills') await phase('skills: deal a card', async () => { await key('ArrowRight'); }, 2500);
    if (s === 'contact') {
      await phase('contact: flip open', () => key('Enter'), 2500);
      await phase('contact: buzzing', async () => {}, 2500);
      await phase('contact: chat', () => key('Enter'), 2500);
      for (let n = 0; n < 3; n++) { await key('Escape'); await sleep(700); }
    }
    await phase(`${s}: back to menu`, () => key('Escape'), 1500);
    if (page.url().includes('#')) { await key('Escape'); await sleep(800); }
  }
  if (errors.length) console.log('  page errors: ' + errors.slice(0, 3).join(' | '));
  await browser.close();
  const out = path.join(REPO, 'docs', 'process', 'perf'); fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, `${new Date().toISOString().slice(0, 10)}-${name}-cpu${R.cpu}${process.env.TAG ? '-' + process.env.TAG : ''}.json`), JSON.stringify({ rig: name, cpu: R.cpu, url, phases, errors }, null, 1));
  return phases;
}

const arg = process.argv[2];
let srv = null, url = arg;
if (!url) { srv = await serve('127.0.0.1'); url = `http://127.0.0.1:${srv.address().port}/`; }
const ladder = process.env.LADDER ? process.env.LADDER.split(',').map(Number) : null;
for (const r of (process.env.RIG || 'gpu,phone,cpu').split(',')) {
  if (!ladder) { await runRig(r, url); continue; }
  const cols = [];
  for (const c of ladder) cols.push([c, await runRig(r, url, c)]);
  // fps per phase per step; * marks visible stutter (more than 10% of frames over 33ms)
  console.log(`\n${r} ladder — fps (median), * = over 10% of frames stutter`);
  console.log('  ' + 'phase'.padEnd(26) + cols.map(([c]) => `÷${c}`.padStart(9)).join(''));
  cols[0][1].forEach((p, i) => console.log('  ' + p.label.padEnd(26) + cols.map(([, ph]) => { const q = ph[i]; return q && q.fps != null ? `${q.fps}${q.jank > 10 ? '*' : ' '}`.padStart(9) : '-'.padStart(9); }).join('')));
}
srv?.close();
