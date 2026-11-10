// Load test: the site the way a reviewer meets it — a real (headless) Chrome
// on a throttled connection with an empty cache. Zero dependencies (Node 22+);
// drives any installed Chromium over the DevTools protocol, like
// docs/tools/snap.mjs.
//
//   node tests/load.mjs                 site/ served locally
//   node tests/load.mjs <url>           a live deploy
//   NET=slow node tests/load.mjs        slow 4G only (default: 4g then slow)
//
// Walks: first load → intro → PROJECTS → the computer → every photo set:
// the grid (all thumbs), then the viewer through every photo; on the first
// set also zoom (wheel), drag, double-click back to fit. The OS must go
// fullscreen once it opens. Then a phone pass. Fails on: a failed or non-200 request, a console error or uncaught
// exception, a broken image, photos fetched before anyone opens a folder,
// a viewer photo slower than the network's limit, or the OS overflowing
// sideways on a phone.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { serve as serveSite } from './serve.mjs';
import { spawn } from 'node:child_process';

const SITE = path.resolve(import.meta.dirname, '..', 'site');
/* Chrome DevTools' own presets. limit = slowest acceptable viewer photo */
const NETS = {
  '4g': { label: '4G (9 Mbps, 60ms)', latency: 60, down: 9e6 / 8, up: 1.5e6 / 8, limit: 2500 },
  slow: { label: 'slow 4G (1.6 Mbps, 150ms)', latency: 150, down: 1.6e6 / 8, up: 750e3 / 8, limit: 6000 },
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let failed = 0;
const ok = (msg) => console.log('  ok   ' + msg);
const bad = (msg) => { failed++; console.log('  FAIL ' + msg); };
const info = (msg) => console.log('       ' + msg);

const serve = () => serveSite('127.0.0.1');   // range-aware, like GitHub Pages: tests/serve.mjs

const BROWSERS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Comet.app/Contents/MacOS/Comet',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
];
async function launch() {
  const bin = process.env.BROWSER || BROWSERS.find((b) => fs.existsSync(b));
  if (!bin) { console.error('no Chromium-based browser found; set BROWSER=/path/to/chrome'); process.exit(1); }
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'load-profile-'));
  const proc = spawn(bin, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--mute-audio', '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows', '--window-size=1440,900', 'about:blank'],
  { stdio: ['ignore', 'ignore', 'pipe'] });
  const ws = await new Promise((res, rej) => {
    let buf = '';
    const t = setTimeout(() => rej(new Error('browser did not start')), 20000);
    proc.stderr.on('data', (d) => {
      buf += d;
      const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
      if (m) { clearTimeout(t); proc.stderr.removeAllListeners('data'); proc.stderr.resume(); res(m[1]); }
    });
  });
  const origin = new URL(ws.replace('ws:', 'http:')).origin;
  const target = await (await fetch(origin + '/json/new?about:blank', { method: 'PUT' })).json();
  return {
    cdp: await connect(target.webSocketDebuggerUrl),
    async close() { await new Promise((r) => { proc.once('exit', r); proc.kill(); }); fs.rmSync(profile, { recursive: true, force: true }); },
  };
}
function connect(url) {
  const ws = new WebSocket(url);
  let seq = 0;
  const pending = new Map(), subs = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); }
    else if (m.method) (subs.get(m.method) || []).slice().forEach((f) => f(m.params));
  };
  const cdp = {
    send(method, params = {}) { const id = ++seq; return new Promise((res, rej) => { pending.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); }); },
    on(method, f) { if (!subs.has(method)) subs.set(method, []); subs.get(method).push(f); },
    once(method) { return new Promise((res) => { const f = (p) => { subs.set(method, subs.get(method).filter((g) => g !== f)); res(p); }; cdp.on(method, f); }); },
  };
  return new Promise((res, rej) => { ws.onopen = () => res(cdp); ws.onerror = () => rej(new Error('DevTools connection failed')); });
}

const live = process.argv[2];
const srv = live ? null : await serve();
const base = live ? live.replace(/\/$/, '') : `http://127.0.0.1:${srv.address().port}`;
const browser = await launch();
const { cdp } = browser;
await Promise.all(['Page.enable', 'Network.enable', 'Runtime.enable'].map((m) => cdp.send(m)));
await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });

/* every request: url, status, bytes; anything that fails is a failure */
const reqs = new Map();
cdp.on('Network.requestWillBeSent', (p) => reqs.set(p.requestId, { url: p.request.url, t: p.timestamp }));
cdp.on('Network.responseReceived', (p) => { const r = reqs.get(p.requestId); if (r) r.status = p.response.status; });
cdp.on('Network.loadingFinished', (p) => { const r = reqs.get(p.requestId); if (r) { r.bytes = p.encodedDataLength; r.done = p.timestamp; } });
cdp.on('Network.loadingFailed', (p) => { const r = reqs.get(p.requestId); if (r && !p.canceled) r.error = p.errorText; });
const problems = [];
cdp.on('Runtime.exceptionThrown', (p) => problems.push('uncaught: ' + (p.exceptionDetails.exception?.description || p.exceptionDetails.text).split('\n')[0]));
cdp.on('Runtime.consoleAPICalled', (p) => { if (p.type === 'error') problems.push('console.error: ' + p.args.map((a) => a.value ?? a.description).join(' ')); });

const js = async (expression) => {
  const r = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
};
const until = async (expr, ms, what) => {
  const t = Date.now();
  while (!(await js(expr))) { if (Date.now() - t > ms) throw new Error(`timed out (${ms}ms) waiting for ${what || expr}`); await sleep(50); }
  return Date.now() - t;
};
const key = async (k) => {
  const vk = { Enter: 13, Escape: 27, ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40, x: 88 }[k];
  for (const type of ['keyDown', 'keyUp']) await cdp.send('Input.dispatchKeyEvent', { type, key: k, code: k.length === 1 ? 'Key' + k.toUpperCase() : k, windowsVirtualKeyCode: vk });
};
const kb = (n) => n > 1048576 ? `${(n / 1048576).toFixed(1)}MB` : `${(n / 1024) | 0}KB`;
const sum = (f) => [...reqs.values()].filter(f).reduce((a, r) => a + (r.bytes || 0), 0);
const isPhoto = (r) => r.url.includes('/work/');

async function size(w, h, mobile) {
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: mobile ? 3 : 2, mobile });
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: mobile, maxTouchPoints: mobile ? 5 : 1 });
}

/* load, release the intro, get into the computer's OS */
async function boot() {
  reqs.clear();
  const t0 = Date.now(), loaded = cdp.once('Page.loadEventFired');
  await cdp.send('Page.navigate', { url: `${base}/?v=${Date.now()}` });
  await loaded;
  const tLoad = Date.now() - t0;
  const first = sum(() => true);
  // the intro waits for a press once the word has landed; keep pressing until it lets go
  const tIntro = Date.now();
  while (!(await js(`document.getElementById('sec-projects').classList.contains('active')||document.body.classList.contains('menu')`))) {
    if (Date.now() - tIntro > 60000) throw new Error('intro never handed over');
    await key('x'); await sleep(300);
  }
  if (!(await js(`document.getElementById('sec-projects').classList.contains('active')`))) {
    await js(`document.getElementById('m-projects').click()`);       // full site: the menu is up, open PROJECTS
    await until(`document.getElementById('sec-projects').classList.contains('active')`, 15000, 'PROJECTS');
  }
  const tProjects = Date.now() - t0;
  const early = [...reqs.values()].filter(isPhoto).length;
  await sleep(1500);                                                   // the computer lands, chains snap
  const tOS = Date.now();
  while (!(await js(`!!document.querySelector('.pcOS.on .osHero')`))) {
    if (Date.now() - tOS > 30000) throw new Error('the computer never opened');
    await key('Enter'); await sleep(400);
  }
  await until(`!!document.querySelector('.pcOS.full')`, 3000, 'the OS going fullscreen');
  await sleep(400);
  return { tLoad, first, tProjects, early };
}

/* wheel in at the centre, drag, double-click back to fit — on the photo now up */
async function zoomTest(name, netLimit) {
  const c = await js(`(()=>{const r=document.querySelector('.osShot').getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2];})()`);
  const mouse = (type, x, y, extra = {}) => cdp.send('Input.dispatchMouseEvent', { type, x, y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1, pointerType: 'mouse', ...extra });
  for (let i = 0; i < 4; i++) { await cdp.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: c[0], y: c[1] - 40, deltaX: 0, deltaY: -240 }); await sleep(40); }
  const z = await js(`document.querySelector('.osZv').textContent`);
  const tz = await until(`(()=>{const z=document.querySelector('.osShot .zm');return z.classList.contains('ok')&&Math.max(z.naturalWidth,z.naturalHeight)>=2900;})()`, netLimit * 2, `${name}: zoom frame`).catch((e) => (bad(e.message), -1));
  const t0 = await js(`document.querySelector('.osPan').style.transform`);
  await mouse('mousePressed', c[0], c[1]);
  for (let i = 1; i <= 6; i++) { await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: c[0] + i * 25, y: c[1] + i * 15, button: 'left', buttons: 1 }); await sleep(16); }
  await mouse('mouseReleased', c[0] + 150, c[1] + 90);
  const t1 = await js(`document.querySelector('.osPan').style.transform`);
  for (const n of [1, 2]) { await mouse('mousePressed', c[0], c[1], { clickCount: n }); await mouse('mouseReleased', c[0], c[1], { clickCount: n }); await sleep(60); }
  await sleep(300);
  const z2 = await js(`document.querySelector('.osZv').textContent`);
  const good = parseInt(z) > 150 && tz >= 0 && t1 !== t0 && z2 === '100%';
  (good ? ok : bad)(`${name}: zoom ${z} (3000px frame in ${tz}ms) · drag moves it · double-click back to ${z2}`);
}

async function walkSet(folderIdx, netLimit, zoomCheck, opened) {
  // stage → folder → its photos (first tab); `opened`: the folder is already up
  if (!opened) {
    await js(`document.querySelectorAll('.osNav [data-go]')[${folderIdx}].click()`);
    await until(`!!document.querySelector('.osGrid .osTile')&&!document.querySelector('.osGridV').hidden`, 8000, 'folder grid');
  }
  const name = await js(`document.querySelector('.osPath').textContent.replace('JATINSPACE / ','')`);
  const n = await js(`document.querySelectorAll('.osGrid img').length`);
  const before = sum(isPhoto);
  // first screen: the thumbs visible without scrolling
  const tFirst = await until(`(()=>{const v=document.querySelector('.osGridV').getBoundingClientRect();
    return [...document.querySelectorAll('.osGrid img')].filter(i=>i.getBoundingClientRect().top<v.bottom).every(i=>i.complete&&i.naturalWidth>0);})()`, 30000, `${name}: first screen of thumbs`);
  // the rest: scroll the grid so lazy thumbs fetch
  const tAll0 = Date.now();
  for (let s = 0; s < 40; s++) {
    const done = await js(`(()=>{const v=document.querySelector('.osGridV');v.scrollTop+=v.clientHeight*.8;
      return [...document.querySelectorAll('.osGrid img')].every(i=>i.complete&&i.naturalWidth>0);})()`);
    if (done) break;
    await sleep(250);
  }
  const broken = await js(`[...document.querySelectorAll('.osGrid img')].filter(i=>!(i.complete&&i.naturalWidth>0)).map(i=>i.src.split('/work/')[1])`);
  broken.length ? bad(`${name}: thumbs not loaded: ${broken.join(', ')}`) : null;
  const tAll = tFirst + (Date.now() - tAll0);
  const thumbs = sum(isPhoto) - before;
  // the viewer: open photo 1, then step through every photo
  await js(`document.querySelector('.osGridV').scrollTop=0;document.querySelector('.osGrid .osPhoto').click()`);
  const times = [];
  for (let i = 0; i < n; i++) {
    const t = await until(`(()=>{const h=document.querySelector('.osShot .hi');return h.classList.contains('ok')&&h.naturalWidth>0;})()`, 30000, `${name}: viewer photo ${i + 1}`);
    times.push(t);
    if (i < n - 1) { await key('ArrowRight'); await sleep(60); }
  }
  if (zoomCheck) await zoomTest(name, netLimit);
  const worst = Math.max(...times), firstView = times[0], rest = times.slice(1).sort((a, b) => a - b), med = rest.length ? rest[rest.length >> 1] : 0;
  const msg = `${name}: ${n} photos · first screen ${tFirst}ms · all thumbs ${tAll}ms (${kb(thumbs)}) · viewer first ${firstView}ms, next median ${med}ms, worst ${worst}ms`;
  worst > netLimit ? bad(msg + ` — over ${netLimit}ms`) : ok(msg);
  await key('Escape'); await sleep(250);              // viewer → grid
  await key('Escape'); await sleep(500);              // grid → stage
}

/* the folders, read from the page itself so the test follows the content */
const folders = () => js(`[...document.querySelectorAll('.osNav [data-go]')].map(a=>a.textContent)`);

try {
  for (const id of process.env.NET ? [process.env.NET] : ['4g', 'slow']) {
    const net = NETS[id];
    console.log(`\n${net.label} · empty cache · 1440×900  (${base})`);
    await size(1440, 900, false);
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: net.latency, downloadThroughput: net.down, uploadThroughput: net.up });
    problems.length = 0;
    const b = await boot();
    info(`first load ${b.tLoad}ms, ${kb(b.first)} · intro → PROJECTS ${(b.tProjects / 1000).toFixed(1)}s (includes the intro itself)`);
    b.early ? bad(`${b.early} photos fetched before any folder was opened`) : ok('no photos fetched until a folder is opened');
    // every folder opens straight onto its photos (FLUX: the PHOTOS tab)
    const names = await folders();
    for (let f = 0; f < names.length; f++) {
      await js(`document.querySelectorAll('.osNav [data-go]')[${f}].click()`);
      await until(`!document.querySelector('.osGridV').hidden`, 8000, `${names[f]} contents`);
      await sleep(300);
      const photos = await js(`document.querySelector('.osGrid').classList.contains('photos')`);
      if (photos) { await walkSet(f, net.limit, f === 0, true); continue; }   // measure it now, before anything is cached
      await key('Escape'); await sleep(700);
      ok(`${names[f].trim()}: opens, empty`);
    }
    const all = [...reqs.values()];
    const failedReqs = all.filter((r) => r.error || (r.status && r.status >= 400));
    failedReqs.length ? failedReqs.forEach((r) => bad(`request ${r.url} → ${r.error || r.status}`)) : ok(`${all.length} requests, none failed · ${kb(sum(isPhoto))} of photos over the whole walk`);
    problems.length ? [...new Set(problems)].forEach((p) => bad(p)) : ok('no console errors or exceptions');
  }

  // phone: the OS on a small glass — nothing may push the page sideways
  console.log('\nphone 375×812 · 4G');
  await size(375, 812, true);
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: NETS['4g'].latency, downloadThroughput: NETS['4g'].down, uploadThroughput: NETS['4g'].up });
  problems.length = 0;
  await boot();
  await js(`document.querySelectorAll('.osNav [data-go]')[0].click()`);
  await until(`document.querySelector('.osGrid').classList.contains('photos')`, 8000, 'photo grid');
  await sleep(1500);
  const ph = await js(`(()=>{const v=document.querySelector('.osGridV'),o=document.querySelector('.pcOS').getBoundingClientRect();
    return {grid:v.scrollWidth-v.clientWidth,page:document.documentElement.scrollWidth-innerWidth,os:[Math.round(o.left),Math.round(o.right)],cols:getComputedStyle(document.querySelector('.osGrid')).gridTemplateColumns.split(' ').length};})()`);
  const fs0 = await js(`(()=>{const o=document.querySelector('.pcOS').getBoundingClientRect();return Math.round(o.width)===innerWidth&&Math.round(o.height)===innerHeight;})()`);
  fs0 ? ok('OS fills the phone screen') : bad('OS is not fullscreen on the phone');
  ph.grid > 0 || ph.page > 0 ? bad(`sideways overflow: grid ${ph.grid}px, page ${ph.page}px`) : ok(`no sideways overflow · OS ${ph.os.join('–')}px · ${ph.cols} columns`);
  await js(`document.querySelector('.osGrid .osPhoto').click()`);
  await until(`document.querySelector('.osShot .hi').classList.contains('ok')`, 10000, 'phone viewer');
  const fit = await js(`(()=>{const s=document.querySelector('.osShot').getBoundingClientRect(),o=document.querySelector('.osView').getBoundingClientRect();
    return s.width>40&&s.height>40&&s.left>=o.left-1&&s.right<=o.right+1&&s.bottom<=o.bottom+1;})()`);
  fit ? ok('viewer photo fits the phone glass') : bad('viewer photo does not fit the phone glass');
  problems.length ? [...new Set(problems)].forEach((p) => bad(p)) : ok('no console errors or exceptions');
} catch (e) {
  bad(e.message);
} finally {
  await browser.close();
  srv?.close();
}
console.log(failed ? `\n${failed} failed` : '\nall passed');
process.exit(failed ? 1 : 0);
