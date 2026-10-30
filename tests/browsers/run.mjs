// Cross-browser walk: the site on the engines modern computers and phones run.
// Dev-only (Playwright, pinned in package.json); never ships.
//
//   cd tests/browsers && npm install && npx playwright install chromium firefox webkit
//   node run.mjs                      site/ served locally
//   node run.mjs <url>                a live deploy
//   ONLY=iphone,pixel node run.mjs    a subset (matches the config names)
//   CPU=6 ONLY=chrome node run.mjs    Chromium on a 6× slower CPU (shakes out timing races)
//
// Engines: Chromium = Chrome, Edge, Brave, Opera, Samsung Internet, Android.
//          WebKit   = Safari on Mac AND every browser on iPhone/iPad.
//          Firefox  = Firefox desktop.
// Each config walks it like a visitor — taps on touch devices, clicks and
// keys on desktop: intro → PROJECTS → the computer → FLUX photos + tabs → every photo
// grid → the viewer (+ zoom) → EXIT. Fails on collapsed tiles (the Safari
// "dots"), broken images, sideways overflow, console errors, failed requests.
// Screenshots land in docs/process/stills/<date>-browsers/.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, firefox, webkit, devices } from 'playwright';

const REPO = path.resolve(import.meta.dirname, '..', '..');
const SITE = path.join(REPO, 'site');
const OUT = path.join(REPO, 'docs', 'process', 'stills', `${new Date().toISOString().slice(0, 10)}-browsers`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const desk = (w, h) => ({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
const CONFIGS = [
  ['chrome-desktop', chromium, desk(1440, 900)],
  ['safari-desktop', webkit, desk(1440, 900)],
  ['firefox-desktop', firefox, desk(1440, 900)],
  ['chrome-laptop-1280', chromium, desk(1280, 800)],
  ['safari-short-1440x700', webkit, desk(1440, 700)],
  ['firefox-1080p', firefox, { viewport: { width: 1920, height: 1080 } }],
  ['iphone-17-pro', webkit, devices['iPhone 17 Pro']],
  ['iphone-17-pro-max', webkit, devices['iPhone 17 Pro Max']],
  ['iphone-se', webkit, devices['iPhone SE (3rd gen)']],
  ['iphone-17-pro-landscape', webkit, devices['iPhone 17 Pro landscape']],
  ['pixel-9', chromium, devices['Pixel 9']],
  ['galaxy-s24', chromium, devices['Galaxy S24']],
  ['ipad-pro-11', webkit, devices['iPad Pro 11']],
  ['ipad-mini', webkit, devices['iPad Mini']],
].filter(([n]) => !process.env.ONLY || process.env.ONLY.split(',').some((o) => n.includes(o)));

function serve() {
  const TYPES = { '.html': 'text/html', '.png': 'image/png', '.jpg': 'image/jpeg' };
  const srv = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(SITE, rel === '/' ? 'index.html' : rel);
    if (!file.startsWith(SITE) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(fs.readFileSync(file));
  });
  return new Promise((r) => srv.listen(0, '127.0.0.1', () => r(srv)));
}

async function walk(name, engine, opts, base) {
  const r = { name, engine: engine.name(), fails: [], notes: [] };
  const fail = (m) => r.fails.push(m), note = (m) => r.notes.push(m);
  const browser = await engine.launch();
  const ctx = await browser.newContext({ ...opts });
  const page = await ctx.newPage();
  if (process.env.CPU && engine === chromium) await (await ctx.newCDPSession(page)).send('Emulation.setCPUThrottlingRate', { rate: +process.env.CPU });   // CPU=6: a slow laptop
  const touch = !!opts.hasTouch;
  page.on('console', (m) => { if (m.type() === 'error') fail('console: ' + m.text().slice(0, 140)); });
  page.on('pageerror', (e) => fail('exception: ' + String(e.message).slice(0, 140) + ' @ ' + (String(e.stack).split('\n').find((l) => /index\.html:\d+/.test(l)) || '').trim().replace(/^at /, '').replace(/https?:\/\/[^/]+\//, '')));
  page.on('requestfailed', (q) => { if (!/favicon/.test(q.url())) fail(`request failed: ${q.url().split('/').slice(-2).join('/')} ${q.failure()?.errorText}`); });
  page.on('response', (q) => { if (q.status() >= 400) fail(`HTTP ${q.status()}: ${q.url().split('/').slice(-2).join('/')}`); });
  const shot = (tag) => page.screenshot({ path: path.join(OUT, `${name}-${tag}.jpg`), type: 'jpeg', quality: 80 }).catch(() => {});
  const tapOrClick = async (sel) => { const el = page.locator(sel).first(); touch ? await el.tap() : await el.click(); };
  const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  try {
    const t0 = Date.now();
    await page.goto(`${base}/?v=${Date.now()}`, { waitUntil: 'load' });
    r.webgl = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl'));
    // intro: it waits for a press once the word lands
    await page.waitForSelector('#pressAny', { timeout: 20000 });
    for (let i = 0; i < 80; i++) {
      if (await page.evaluate(() => document.getElementById('sec-projects').classList.contains('active'))) break;
      touch ? await page.touchscreen.tap(opts.viewport.width / 2, opts.viewport.height * .7) : await page.keyboard.press('x');
      await sleep(400);
    }
    if (!(await page.evaluate(() => document.getElementById('sec-projects').classList.contains('active')))) throw new Error('intro never reached PROJECTS');
    r.intro = ((Date.now() - t0) / 1000).toFixed(1) + 's';
    await sleep(2600);                                         // the computer lands, chains snap, screen boots
    await shot('1-projects');
    if (await overflow() > 0) fail(`PROJECTS overflows sideways by ${await overflow()}px`);
    // open the computer the way a visitor would: tap/click on it (search the canvas for the model)
    const box = await page.locator('#sec-projects .pcCv').boundingBox();
    let opened = false;
    for (let gy = 2; gy <= 8 && !opened; gy++) for (let gx = 2; gx <= 8 && !opened; gx++) {
      const x = box.x + box.width * gx / 10, y = box.y + box.height * gy / 10;
      touch ? await page.touchscreen.tap(x, y) : await page.mouse.click(x, y);
      await sleep(120);
      opened = await page.evaluate(() => MonitorFX.isOpen());
    }
    r.tapOpens = opened;
    if (!opened) { note('no tap/click hit the computer — opened with Return'); await page.keyboard.press('Enter'); }
    await page.waitForSelector('.pcOS.full', { timeout: 8000 }).catch(() => fail('OS never went fullscreen'));
    await sleep(500);
    const os = await page.locator('.pcOS').boundingBox();
    if (!os || Math.abs(os.width - opts.viewport.width) > 2) fail(`OS not fullscreen (${os && Math.round(os.width)}px wide)`);
    // FLUX → straight onto its PHOTOS tab
    await tapOrClick('.osFolder');
    await page.waitForSelector('.osGrid.photos .osPhoto', { timeout: 6000 }); await sleep(900);
    r.grids = [await checkGrid(page, 'flux photos', fail)];
    await shot('2-flux');
    // EDITS tab, then back to PHOTOS
    const tabs = await page.$$eval('.osTab', (t) => t.map((b) => b.textContent.trim().split(/\s+/)[0]));
    if (tabs.join() !== 'PHOTOS,EDITS') fail(`FLUX tabs are ${tabs.join() || 'missing'}`);
    else {
      await tapOrClick('.osTab[data-tab="1"]'); await sleep(500);
      if (!(await page.evaluate(() => !!document.querySelector('.osEmpty') || document.querySelector('.osGrid.photos')))) fail('EDITS tab shows nothing');
      await shot('3-edits');
      await tapOrClick('.osTab[data-tab="0"]');
      await page.waitForSelector('.osGrid.photos .osPhoto', { timeout: 6000 }); await sleep(700);
    }
    await viewer(page, touch, r, fail, shot);
    // OUTSTATION
    await tapOrClick('.osNav [data-go="1"]');
    await page.waitForSelector('.osGrid.photos .osPhoto', { timeout: 8000 }); await sleep(700);
    r.grids.push(await checkGrid(page, 'outstation', fail));
    if (await overflow() > 0) fail(`OS overflows sideways by ${await overflow()}px`);
    // EXIT
    await tapOrClick('.osExit');
    await page.waitForFunction(() => !MonitorFX.isOpen(), null, { timeout: 6000 }).catch(() => fail('EXIT did not close the OS'));
  } catch (e) {
    fail(e.message.split('\n')[0]);
    await shot('error');
  }
  await browser.close();
  return r;
}

/* every tile has a real size (not the Safari corner dots) and every thumb loads */
async function checkGrid(page, label, fail) {
  for (let i = 0; i < 30; i++) {
    const done = await page.evaluate(() => { const v = document.querySelector('.osGridV'); v.scrollTop += v.clientHeight * .8;
      return [...document.querySelectorAll('.osGrid img')].every((i) => i.complete && i.naturalWidth > 0); });
    if (done) break;
    await sleep(250);
  }
  await page.evaluate(() => { document.querySelector('.osGridV').scrollTop = 0; });
  const t = await page.$$eval('.osGrid .osPhoto', (els) => els.map((b) => { const r = b.getBoundingClientRect(), i = b.querySelector('img');
    return [Math.round(r.width), Math.round(r.height), !!(i.complete && i.naturalWidth)]; }));
  const small = t.filter((x) => x[0] < 40 || x[1] < 40).length, broken = t.filter((x) => !x[2]).length;
  if (small) fail(`${label}: ${small}/${t.length} tiles collapsed (e.g. ${t.find((x) => x[1] < 40)?.slice(0, 2).join('×')})`);
  if (broken) fail(`${label}: ${broken}/${t.length} thumbs did not load`);
  const cols = await page.evaluate(() => getComputedStyle(document.querySelector('.osGrid')).gridTemplateColumns.split(' ').length);
  return `${label} ${t.length} tiles ${t[0]?.[0]}×${t[0]?.[1]} ${cols}col`;
}

async function viewer(page, touch, r, fail, shot) {
  await page.locator('.osGrid .osPhoto').nth(2)[touch ? 'tap' : 'click']();
  await page.waitForFunction(() => { const h = document.querySelector('.osShot .hi'); return h.classList.contains('ok') && h.naturalWidth > 0; }, null, { timeout: 10000 })
    .catch(() => fail('viewer photo did not load'));
  const s = await page.locator('.osShot').boundingBox();
  if (!s || s.width < 100 || s.height < 100) fail(`viewer photo collapsed (${s && Math.round(s.width)}×${s && Math.round(s.height)})`);
  r.viewer = s ? `${Math.round(s.width)}×${Math.round(s.height)}` : '-';
  await shot('4-viewer');
  // zoom: double-tap on touch, wheel on desktop
  const cx = s.x + s.width / 2, cy = s.y + s.height / 2;
  if (touch) { await page.touchscreen.tap(cx, cy); await sleep(90); await page.touchscreen.tap(cx, cy); }
  else { await page.mouse.move(cx, cy); for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, -240); await sleep(40); } }
  await sleep(700);
  r.zoom = await page.locator('.osZv').textContent();
  if (parseInt(r.zoom) <= 100) fail(`zoom did not engage (${touch ? 'double-tap' : 'wheel'})`);
  await shot('5-zoom');
  // next photo by swipe/arrow after resetting to fit, then close
  await page.locator('.osZv')[touch ? 'tap' : 'click']();
  await sleep(300);
  await page.locator('.osViewX')[touch ? 'tap' : 'click']();
  await page.waitForFunction(() => document.querySelector('.osView').hidden, null, { timeout: 3000 }).catch(() => fail('viewer CLOSE did not close'));
}

// --- run -------------------------------------------------------------------
fs.mkdirSync(OUT, { recursive: true });
const live = process.argv[2];
const srv = live ? null : await serve();
const base = live ? live.replace(/\/$/, '') : `http://127.0.0.1:${srv.address().port}`;
console.log(`${base}  ·  ${CONFIGS.length} configs  ·  screenshots → ${path.relative(REPO, OUT)}\n`);
const results = [];
for (const [name, engine, opts] of CONFIGS) {
  process.stdout.write(`${name.padEnd(26)}`);
  const r = await walk(name, engine, opts, base);
  results.push(r);
  console.log(r.fails.length ? `FAIL (${r.fails.length})` : 'ok', `· webgl ${r.webgl ? 'yes' : 'NO'} · intro ${r.intro || '-'} · tap opens computer ${r.tapOpens ? 'yes' : 'no'} · viewer ${r.viewer || '-'} · zoom ${r.zoom || '-'}`);
  for (const g of r.grids || []) console.log(' '.repeat(28) + g);
  for (const n of r.notes) console.log(' '.repeat(28) + 'note: ' + n);
  for (const f of [...new Set(r.fails)]) console.log(' '.repeat(28) + 'FAIL ' + f);
}
srv?.close();
fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2));
const bad = results.filter((r) => r.fails.length);
console.log(`\n${results.length - bad.length}/${results.length} configs passed`);
process.exit(bad.length ? 1 : 0);
