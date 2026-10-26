// Process snapshots: stills and frame-accurate films of the site, for the
// process journal (docs/process/). Zero dependencies (Node 22+, for the
// built-in WebSocket); drives any installed Chromium over the DevTools
// protocol, headless, on its own throwaway profile.
//
//   node docs/tools/snap.mjs <label>                      every still of site/
//   node docs/tools/snap.mjs <label> --only menu,about    just those scenes
//   node docs/tools/snap.mjs <label> --film intro         + a frame-accurate film
//   node docs/tools/snap.mjs <label> --rev 94ab34d        an older commit, out of git
//
// Scenes: intro, menu, transition, one per section (about, projects, ...),
//         phone. Default: all of them.
// Films:  intro      24fps, one page load per ?frame=N
//         transition 60fps, TransFX.peek(ms)
//         projects   30fps, MonitorFX.hold(ms) — the chained entrance
//         (encoded with ffmpeg; without it the PNG frames are kept)
//
// Writes docs/process/stills/<date>-<label>/: the stills (JPEG), films/*.mp4,
// shots.json (the manifest — a re-run merges into it, so --only can retake
// one shot without losing the rest), README.md and contact-sheet.jpg.
// <date> is today, or the commit's own date with --rev.
// BROWSER=/path/to/chrome overrides the browser search.
//
// The harness names (?frame=N, TransFX.peek, MonitorFX.hold, select,
// openSection) are the site's own — see docs/VERIFY.md. Older commits that
// lack one get a fallback (timed shots of the live intro) or skip it.

import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync, execFileSync } from 'node:child_process';

const REPO = path.resolve(import.meta.dirname, '..', '..');
const STILLS = path.join(REPO, 'docs', 'process', 'stills');
const DESK = { w: 1440, h: 900, dpr: 1 };
const PHONE = { w: 375, h: 812, dpr: 2, mobile: true };

/* the intro's key beats, in its own frame numbers (CLAUDE.md timing table) */
const INTRO = [
  [5, 'chained: JATIN and the chains fly in out of depth'],
  [8, 'tug: the sway kicks the other way'],
  [17, 'strain: squeeze, tremble, slices'],
  [20, 'SNAP: the white flash frame'],
  [21, 'the links flung at the lens, shockwave'],
  [23, 'the fan slam crashes in around the name'],
  [28, 'fan slam: bolt wedge, swoosh, speed streaks'],
  [34, 'starburst whiteout'],
  [38, 'hold: logo slammed centre over the crumpled star'],
  [44, 'beat: scale punch, split spike, ASCII band'],
  [72, 'crumple-out: pixel-block datamosh'],
];
const INTRO_LAST = 76;   /* END frame — the menu transition takes over here */
const TRANSITION = [
  [90, 'trace: neon outlines whip in'],
  [200, 'flash: the white impact frame'],
  [228, 'slam: fills land oversized, wide RGB split'],
  [330, 'retract: fills drain off, outlines un-draw'],
];
const PROJECTS_HOLDS = [
  [600, 'chained up, mid-spin'],
  [1060, 'the snap'],
  [1300, 'the break: links fly at the lens'],
];
const SETTLE = { about: 2600, projects: 3400 };   /* ms after the swap; others 2000 */

const sleep = (ms) => new Promise((r) => setTimeout(r, Math.max(0, ms)));
const pad = (n) => String(n).padStart(2, '0');
const log = (s) => console.log(s);
const die = (s) => { console.error(s); process.exit(1); };
const today = () => new Date().toLocaleDateString('en-CA');
const git = (...a) => execFileSync('git', ['-C', REPO, ...a], { encoding: 'utf8' }).trim();

// --- args ------------------------------------------------------------------
const args = { label: null, only: null, film: [], rev: null };
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a === '--only') args.only = process.argv[++i].split(',');
  else if (a === '--film') args.film = process.argv[++i].split(',');
  else if (a === '--rev') args.rev = process.argv[++i];
  else if (!a.startsWith('--')) args.label = a;
  else die(`unknown option ${a}`);
}
if (!args.label || !/^[a-z0-9-]+$/.test(args.label))
  die('usage: node docs/tools/snap.mjs <label> [--only scenes] [--film intro,transition,projects] [--rev <commit>]\n' +
      '       <label> is lower-case-with-dashes, e.g. menu-staircase');
const want = (scene) => !args.only || args.only.includes(scene);

// --- what to shoot: the working tree, or a commit pulled out of git --------
function source() {
  if (!args.rev) {
    const dirty = git('status', '--porcelain', '--', 'site').length > 0;
    return { root: path.join(REPO, 'site'), date: today(),
      commit: git('rev-parse', '--short', 'HEAD') + (dirty ? ' + uncommitted changes' : '') };
  }
  const sha = git('rev-parse', '--short', args.rev);
  const files = git('ls-tree', '-r', '--name-only', sha).split('\n');
  const dir = files.includes('site/index.html') ? 'site/' : '';   /* before the site/ move it lived at the root */
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'snap-rev-'));
  for (const f of files) {
    const rel = f.slice(dir.length);
    if (!f.startsWith(dir) || rel.includes('/') || !/\.(html|png|jpe?g|svg)$/.test(rel)) continue;
    fs.writeFileSync(path.join(root, rel), execFileSync('git', ['-C', REPO, 'show', `${sha}:${f}`]));
  }
  return { root, commit: sha, date: git('show', '-s', '--format=%cs', sha), temp: true };
}

// --- a static server: the site at /, the output folder at /__out/ ----------
function serve(root, out) {
  const TYPES = { '.html': 'text/html', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml' };
  const srv = http.createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]), base = root;
    if (rel.startsWith('/__out/')) { base = out; rel = rel.slice('/__out'.length); }
    const file = path.join(base, rel === '/' ? 'index.html' : rel);
    if (!file.startsWith(base) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(fs.readFileSync(file));
  });
  return new Promise((r) => srv.listen(0, '127.0.0.1', () => r(srv)));
}

// --- the browser -----------------------------------------------------------
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
  if (!bin) die('no Chromium-based browser found; set BROWSER=/path/to/chrome');
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'snap-profile-'));
  const proc = spawn(bin, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--mute-audio',
    '--force-color-profile=srgb', '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows',
    `--window-size=${DESK.w},${DESK.h}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  const ws = await new Promise((res, rej) => {
    let buf = '';
    const t = setTimeout(() => rej(new Error('browser did not start')), 20000);
    proc.on('exit', (c) => rej(new Error(`browser exited (${c})`)));
    proc.stderr.on('data', (d) => {
      buf += d;
      const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
      if (m) { clearTimeout(t); proc.stderr.removeAllListeners('data'); proc.stderr.resume(); res(m[1]); }
    });
  });
  const origin = new URL(ws.replace('ws:', 'http:')).origin;
  const version = await (await fetch(origin + '/json/version')).json();
  const target = await (await fetch(origin + '/json/new?about:blank', { method: 'PUT' })).json();
  return {
    cdp: await connect(target.webSocketDebuggerUrl),
    name: `${path.basename(bin)}, ${version.Browser.replace('/', ' ')}`,
    async close() {
      await new Promise((r) => { proc.once('exit', r); proc.kill(); });
      fs.rmSync(profile, { recursive: true, force: true });
    },
  };
}

function connect(url) {
  const ws = new WebSocket(url);
  let seq = 0;
  const pending = new Map(), waiters = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      const { res, rej } = pending.get(m.id); pending.delete(m.id);
      m.error ? rej(new Error(m.error.message)) : res(m.result);
    } else if (m.method && waiters.has(m.method)) {
      waiters.get(m.method).splice(0).forEach((f) => f(m.params));
    }
  };
  const cdp = {
    send(method, params = {}) {
      const id = ++seq;
      return new Promise((res, rej) => { pending.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); });
    },
    once(method) {
      return new Promise((res) => { if (!waiters.has(method)) waiters.set(method, []); waiters.get(method).push(res); });
    },
  };
  return new Promise((res, rej) => { ws.onopen = () => res(cdp); ws.onerror = () => rej(new Error('DevTools connection failed')); });
}

function pageApi(cdp, base) {
  const p = {
    async size(v) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width: v.w, height: v.h, deviceScaleFactor: v.dpr, mobile: !!v.mobile });
      await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: !!v.mobile, maxTouchPoints: v.mobile ? 5 : 1 });
    },
    async go(q = '') {
      const loaded = cdp.once('Page.loadEventFired');
      await cdp.send('Page.navigate', { url: `${base}/${q}` });
      await loaded;
    },
    async js(expression) {
      const r = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (r.exceptionDetails) throw new Error(`page: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`);
      return r.result.value;
    },
    async until(expression, ms = 20000) {
      const t = Date.now();
      while (!(await p.js(expression))) {
        if (Date.now() - t > ms) throw new Error(`timed out waiting for ${expression}`);
        await sleep(60);
      }
    },
    frames: (n = 2) => p.js(`new Promise(r=>{let n=${n};const f=()=>--n>0?requestAnimationFrame(f):r();requestAnimationFrame(f);})`),
    async key(key) {
      const vk = { Enter: 13, Escape: 27, ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40 }[key];
      for (const type of ['keyDown', 'keyUp']) await cdp.send('Input.dispatchKeyEvent', { type, key, code: key, windowsVirtualKeyCode: vk });
    },
    /* stills are JPEG q90: same as PNG by eye at 1:1, a third of the size
       (the halftone and grain defeat PNG). Film frames stay lossless. */
    async capture(file) {
      const jpg = file.endsWith('.jpg');
      const { data } = await cdp.send('Page.captureScreenshot', jpg ? { format: 'jpeg', quality: 90 } : { format: 'png' });
      fs.writeFileSync(file, Buffer.from(data, 'base64'));
    },
  };
  return p;
}

// --- run -------------------------------------------------------------------
const src = source();
const html = fs.readFileSync(path.join(src.root, 'index.html'), 'utf8');
const has = (s) => html.includes(s);
const out = path.join(STILLS, `${src.date}-${args.label}`);
fs.mkdirSync(out, { recursive: true });
const manifestFile = path.join(out, 'shots.json');
const manifest = fs.existsSync(manifestFile)
  ? JSON.parse(fs.readFileSync(manifestFile, 'utf8'))
  : { date: src.date, label: args.label, shots: [], films: [] };
Object.assign(manifest, { commit: src.commit, captured: today() });

const srv = await serve(src.root, out);
const base = `http://127.0.0.1:${srv.address().port}`;
const browser = await launch();
const { cdp } = browser;
const p = pageApi(cdp, base);
await cdp.send('Page.enable');
await p.size(DESK);
manifest.browser = browser.name;
log(`${path.relative(REPO, out)}  (${src.commit}, ${browser.name})`);

function record(list, entry) {
  const i = list.findIndex((e) => e.file === entry.file);
  i < 0 ? list.push(entry) : (list[i] = entry);
}
async function still(name, caption) {
  await p.capture(path.join(out, name + '.jpg'));
  record(manifest.shots, { file: name + '.jpg', caption });
  log(`  ${name}`);
}

async function introFrame(n) {
  await p.go(`?frame=${n}`);
  await p.until(`!!document.getElementById('introCv')`);
  await sleep(350);
  await p.frames(3);
}
async function toMenu() {
  await p.go(`?_=${Date.now()}`);
  await p.until('typeof menuReady!=="undefined"&&menuReady', 30000);
  await sleep(900);
}
async function openSec(i, name) {
  await p.js(`select(${i})`);
  await sleep(300);
  await p.js(`openSection('sec-${name}')`);
  await p.until('!!currentScreen&&!busy');
  await sleep(SETTLE[name] || 2000);
}
async function backOut() {
  await p.js(`typeof goBack==='function'?goBack():backToMenu()`);
  await p.until('!currentScreen&&menuReady', 15000);
  await sleep(500);
}

/* films: frame-step a harness, then encode at the beat's own rate */
async function film(name, fps, steps, show, caption) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `snap-${name}-`));
  log(`  film ${name} (${steps.length} frames)`);
  for (const [i, s] of steps.entries()) { await show(s); await p.capture(path.join(dir, `f${String(i).padStart(4, '0')}.png`)); }
  fs.mkdirSync(path.join(out, 'films'), { recursive: true });
  const mp4 = path.join(out, 'films', `${name}.mp4`);
  const ff = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(dir, 'f%04d.png'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-preset', 'slow', '-movflags', '+faststart', mp4]);
  if (ff.status === 0) {
    fs.rmSync(dir, { recursive: true, force: true });
    record(manifest.films, { file: `films/${name}.mp4`, caption });
  } else {
    log(`  ffmpeg unavailable or failed; frames kept in ${dir}`);
  }
}

try {
  if (want('intro')) {
    log('intro');
    if (has('frame=')) {
      for (const [n, c] of INTRO) { await introFrame(n); await still(`intro-f${pad(n)}`, `Intro f${n}: ${c}`); }
    } else {   /* older builds have no scrub harness: shoot the live intro on the clock */
      await p.go(`?_=${Date.now()}`);
      const t0 = Date.now();
      for (const ms of [400, 1000, 1600, 2300, 3100]) { await sleep(ms - (Date.now() - t0)); await still(`intro-${ms}ms`, `Intro at ${ms}ms (live, timed)`); }
    }
  }
  if (args.film.includes('intro') && has('frame=')) {
    const steps = Array.from({ length: INTRO_LAST + 1 }, (_, n) => n);
    await film('intro', 24, steps, introFrame, `The whole intro, frame by frame at 24fps (f0–f${INTRO_LAST}, ?frame=N)`);
  }

  const introOnly = args.only?.every((s) => s === 'intro') && args.film.every((f) => f === 'intro');
  if (!introOnly) await toMenu();
  const sections = introOnly ? [] : await p.js(`items.map(it=>it.dataset.target.replace('sec-',''))`);

  if (want('menu')) {
    log('menu');
    for (const [i, name] of sections.entries()) {
      await p.js(`select(${i})`);
      await sleep(900);
      await still(`menu-${pad(i + 1)}-${name}`, `Menu, ${name.toUpperCase()} selected`);
    }
    await p.js('select(0)');
    await sleep(600);
  }

  if (has('TransFX') && (want('transition') || args.film.includes('transition'))) {
    log('transition');
    if (want('transition')) for (const [ms, c] of TRANSITION) {
      await p.js(`TransFX.peek(${ms})`); await p.frames(2);
      await still(`transition-${ms}ms`, `Screen transition at ${ms}ms: ${c}`);
    }
    if (args.film.includes('transition')) {
      const steps = Array.from({ length: 33 }, (_, i) => Math.round(i * 1000 / 60));
      await film('transition', 60, steps, async (ms) => { await p.js(`TransFX.peek(${ms})`); await p.frames(1); },
        'A screen transition, 0–533ms at 60fps (TransFX.peek; drawn over the menu, so no screen swap underneath)');
    }
    await p.js('TransFX.hide()');
    await sleep(300);
  }

  for (const [i, name] of sections.entries()) {
    const extras = name === 'projects' && has('MonitorFX');
    if (!want(name) && !(extras && args.film.includes('projects'))) continue;
    log(name);
    await openSec(i, name);
    if (want(name)) await still(`${pad(i + 1)}-${name}`, `${name.toUpperCase()}, settled after entry`);
    if (extras && want(name)) {
      for (const [ms, c] of PROJECTS_HOLDS) {
        await p.js(`MonitorFX.hold(${ms})`); await sleep(300);
        await still(`${pad(i + 1)}-projects-${ms}ms`, `PROJECTS entrance at ${ms}ms: ${c}`);
      }
      await p.js('MonitorFX.hold(null)'); await sleep(2500);
      await p.key('Enter'); await sleep(2200);
      await still(`${pad(i + 1)}-projects-os`, 'PROJECTS, clicked: the dolly lands in JATIN OS (folder stage)');
      await p.key('Enter'); await sleep(1800);
      await still(`${pad(i + 1)}-projects-os-folder`, 'JATIN OS, first folder opened');
      await p.key('Escape'); await sleep(800);
      await p.key('Escape'); await sleep(1600);
    }
    if (extras && args.film.includes('projects')) {
      const steps = Array.from({ length: 61 }, (_, i) => Math.round(i * 1000 / 30));
      await film('projects', 30, steps, async (ms) => { await p.js(`MonitorFX.hold(${ms})`); await p.frames(3); },
        'PROJECTS entrance, 0–2000ms at 30fps (MonitorFX.hold): rise, chains, snap, break');
      await p.js('MonitorFX.hold(null)'); await sleep(1500);
    }
    await backOut();
  }

  if (want('phone')) {
    log('phone');
    await p.size(PHONE);
    await toMenu();
    await still('phone-menu', 'Phone 375×812, menu');
    for (const [i, name] of sections.entries()) {
      await openSec(i, name);
      await still(`phone-${pad(i + 1)}-${name}`, `Phone 375×812, ${name.toUpperCase()}`);
      await backOut();
    }
  }

  // --- the manifest, README and contact sheet (from everything in the set) --
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
  await contactSheet();
  writeReadme();
  log(`done: ${manifest.shots.length} stills, ${manifest.films.length} films`);
} finally {
  await browser.close();
  srv.close();
  if (src.temp) fs.rmSync(src.root, { recursive: true, force: true });
}

async function contactSheet() {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const cell = (s) => `<figure><img src="${s.file}"><figcaption><b>${pad(manifest.shots.indexOf(s) + 1)}</b> ${esc(s.caption)}</figcaption></figure>`;
  const desk = manifest.shots.filter((s) => !s.file.startsWith('phone-'));
  const phone = manifest.shots.filter((s) => s.file.startsWith('phone-'));
  const sheet = path.join(out, '.sheet.html');
  fs.writeFileSync(sheet, `<!doctype html><meta charset=utf-8><style>
body{margin:0;padding:32px;background:#000;color:#ddd;font:13px/1.4 ui-monospace,Menlo,monospace}
h1{margin:0 0 24px;font-size:18px;letter-spacing:.14em;color:#e8ff00}h1 span{color:#00f0d8}
main{display:grid;gap:20px;grid-template-columns:repeat(4,1fr);margin-bottom:28px}main.phone{grid-template-columns:repeat(6,1fr)}
figure{margin:0}img{display:block;width:100%;outline:1px solid #333}figcaption{margin-top:6px}b{color:#ff2e88}
</style><h1>JATIN · ${manifest.date} · ${esc(manifest.label)} <span>${esc(manifest.commit)}</span></h1>
<main>${desk.map(cell).join('')}</main>${phone.length ? `<main class="phone">${phone.map(cell).join('')}</main>` : ''}`);
  await p.size({ w: 1800, h: 1000, dpr: 1 });
  await p.go('__out/.sheet.html');
  await p.js(`Promise.all([...document.images].map(i=>i.complete||new Promise(r=>i.onload=i.onerror=r)))`);
  await p.size({ w: 1800, h: await p.js('document.documentElement.scrollHeight'), dpr: 1 });
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
  fs.writeFileSync(path.join(out, 'contact-sheet.jpg'), Buffer.from(data, 'base64'));
  fs.rmSync(sheet);
}

function writeReadme() {
  const rows = manifest.shots.map((s, i) => `| ${pad(i + 1)} | [${s.file}](${s.file}) | ${s.caption} |`);
  const films = manifest.films.map((f) => `| [${f.file}](${f.file}) | ${f.caption} |`);
  fs.writeFileSync(path.join(out, 'README.md'), [
    `# Stills: ${manifest.date} · ${manifest.label}`, '',
    `Captured ${manifest.captured} from \`${manifest.commit}\` with \`docs/tools/snap.mjs\` (${manifest.browser}, headless).`,
    'Desktop 1440×900 @1x, phone 375×812 @2x. Generated file: re-run the tool rather than editing it;',
    'the story behind these frames is in [../../JOURNAL.md](../../JOURNAL.md).', '',
    '![Contact sheet](contact-sheet.jpg)', '',
    '| # | Still | Moment |', '|---|---|---|', ...rows, '',
    ...(films.length ? ['## Films', '', '| Film | What |', '|---|---|', ...films, ''] : []),
  ].join('\n'));
}
