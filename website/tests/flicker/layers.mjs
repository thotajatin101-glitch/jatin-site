// node layers.mjs [section] → the compositor's layers on a phone-sized page and how often each is re-painted while idle
import { serve } from '../serve.mjs';
import pw from '../browsers/node_modules/playwright/index.js';
const sec = process.argv[2] || 'skills';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const srv = await serve('127.0.0.1'), base = `http://127.0.0.1:${srv.address().port}/`;
const browser = await pw.chromium.launch({ args: ['--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--use-angle=metal', '--enable-gpu'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 652 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true });
const page = await ctx.newPage();
await page.goto(base); await page.waitForSelector('#pressAny');
for (let i = 0; i < 60 && !(await page.evaluate(() => document.body.classList.contains('menu') && !!document.querySelector('#m-about.done,#m-about.sel'))); i++) {
  if (!(await page.evaluate(() => document.body.classList.contains('menu')))) await page.keyboard.press('x'); await sleep(300); }
await sleep(1800); await page.locator('#m-' + sec).tap();
await page.waitForFunction((id) => document.getElementById('sec-' + id).classList.contains('active'), sec, { timeout: 8000 });
await sleep(6000);
const cdp = await ctx.newCDPSession(page); let layers = [];
await cdp.send('DOM.enable'); await cdp.send('DOM.getDocument', { depth: -1 });
cdp.on('LayerTree.layerTreeDidChange', (e) => { if (e.layers) layers = e.layers; });
await cdp.send('LayerTree.enable'); await sleep(600);
const a = Object.fromEntries(layers.map((l) => [l.layerId, l.paintCount])); await sleep(4000);
await cdp.send('LayerTree.disable'); await cdp.send('LayerTree.enable'); await sleep(600);
for (const l of layers) { const d = l.paintCount - (a[l.layerId] ?? 0); if (!l.drawsContent || (d < 2 && l.width * l.height < 60000)) continue; let nm = '?';
  try { const n = (await cdp.send('DOM.describeNode', { backendNodeId: l.backendNodeId })).node; nm = n.nodeName + ' ' + (n.attributes || []).join(' ').slice(0, 50); } catch {}
  let why = ''; try { why = (await cdp.send('LayerTree.compositingReasons', { layerId: l.layerId })).compositingReasonIds.join(','); } catch {}
  console.log(`${String(d).padStart(4)} paints/4s  ${Math.round(l.width)}x${Math.round(l.height)}  ${nm}  [${why}]`); }
console.log('gpu canvas:', await page.evaluate(() => { const c = document.createElement('canvas'); const g = c.getContext('webgl'); const e = g && g.getExtension('WEBGL_debug_renderer_info'); return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'none'; }));
await browser.close(); srv.close();
