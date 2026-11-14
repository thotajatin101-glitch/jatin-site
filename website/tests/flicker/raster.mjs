// node raster.mjs [section] → how much the browser re-draws (paints + rasters) per second while a section idles on a phone.
// A layer that is re-drawn every frame is the one a real phone drops for a frame (his clip, 2026-11-14).
import { serve } from '../serve.mjs';
import pw from '../browsers/node_modules/playwright/index.js';
const sec = process.argv[2] || 'skills', SECS = 4;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const srv = await serve('127.0.0.1'), base = `http://127.0.0.1:${srv.address().port}/`;
const browser = await pw.chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 652 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true });
const page = await ctx.newPage(); page.on('pageerror', (e) => console.log('ERR', e.message));
await page.goto(base); await page.waitForSelector('#pressAny');
for (let i = 0; i < 60 && !(await page.evaluate(() => document.body.classList.contains('menu') && !!document.querySelector('#m-about.done,#m-about.sel'))); i++) {
  if (!(await page.evaluate(() => document.body.classList.contains('menu')))) await page.keyboard.press('x'); await sleep(300); }
await sleep(1800);
await page.locator('#m-' + sec).tap();
await page.waitForFunction((id) => document.getElementById('sec-' + id).classList.contains('active'), sec, { timeout: 8000 });
await sleep(4200);
const cdp = await ctx.newCDPSession(page), ev = [];
cdp.on('Tracing.dataCollected', (d) => ev.push(...d.value));
await cdp.send('Tracing.start', { categories: 'devtools.timeline,cc,disabled-by-default-devtools.timeline', transferMode: 'ReportEvents' });
await sleep(SECS * 1000);
const done = new Promise((r) => cdp.once('Tracing.tracingComplete', r)); await cdp.send('Tracing.end'); await done;
const sum = (n) => { const e = ev.filter((x) => x.name === n && x.ph === 'X'); return [e.length, e.reduce((a, x) => a + (x.dur || 0), 0) / 1000]; };
const by = {};
for (const x of ev) if (x.name === 'Paint' && x.args?.data) { const d = x.args.data, c = d.clip || [], w = Math.round(Math.abs(c[2] - c[0])), h = Math.round(Math.abs(c[5] - c[1])), k = `${d.nodeName || d.nodeId} ${w}x${h}`; by[k] = (by[k] || 0) + 1; }
console.log(Object.entries(by).sort((a, b) => b[1] - a[1]).slice(0, 14).map(([k, n]) => `${(n / SECS).toFixed(0)}/s  ${k}`).join('\n'));
const out = { section: sec };
for (const n of ['Paint', 'RasterTask', 'PaintImage', 'Layerize', 'UpdateLayerTree', 'CompositeLayers']) { const [c, ms] = sum(n); out[n] = `${(c / SECS).toFixed(0)}/s ${(ms / SECS).toFixed(1)}ms/s`; }
console.log(JSON.stringify(out, null, 1));
await browser.close(); srv.close();
