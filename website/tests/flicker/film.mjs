// node film.mjs <tag> [engine] [mode: idle|bar|scroll]  → frames of SKILLS on a phone, ~every 60ms
import { serve } from '../serve.mjs';
import pw from '../browsers/node_modules/playwright/index.js';
import fs from 'node:fs';
const [tag, eng = 'chromium', mode = 'idle', sec = 'skills'] = process.argv.slice(2), OUT = import.meta.dirname + '/out/' + tag;
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const srv = await serve('127.0.0.1'), base = `http://127.0.0.1:${srv.address().port}/`;
const browser = await pw[eng].launch();
const W = 390, H = 652;
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, hasTouch: true, isMobile: eng !== 'firefox' });
const page = await ctx.newPage(); page.on('pageerror', (e) => console.log('ERR', e.message));
await page.goto(base); await page.waitForSelector('#pressAny');
for (let i = 0; i < 60 && !(await page.evaluate(() => document.body.classList.contains('menu') && !!document.querySelector('#m-about.done,#m-about.sel'))); i++) {
  if (!(await page.evaluate(() => document.body.classList.contains('menu')))) await page.keyboard.press('x'); await sleep(300); }
await sleep(1800);
await page.locator('#m-' + sec).tap();
await page.waitForFunction((id) => document.getElementById('sec-' + id).classList.contains('active'), sec, { timeout: 8000 });
await sleep(4200);
const log = [];
for (let i = 0; i < 48; i++) {
  if (mode === 'bar' && i % 8 === 4) await page.setViewportSize({ width: W, height: (i % 16 === 4) ? H + 56 : H });
  if (mode === 'scroll' && i % 8 === 4) { await page.mouse.move(200, 400); await page.mouse.wheel(0, (i % 16 === 4) ? 120 : -120); }
  const t = Date.now();
  await page.screenshot({ path: `${OUT}/${String(i).padStart(2, '0')}.png` });
  log.push([i, Date.now() - t, await page.evaluate(() => [innerHeight, scrollY, document.documentElement.scrollHeight])]);
}
console.log(JSON.stringify(log.filter((_, i) => i % 6 === 0)));
await browser.close(); srv.close();
