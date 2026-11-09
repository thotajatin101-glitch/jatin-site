// Dev-only: renders studio.html drafts to PNG. Never ships.
// node docs/studio/render.mjs <outDir> p1 p2 ...   (uses the Playwright pinned in tests/browsers)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(path.resolve(import.meta.dirname, '../../tests/browsers/package.json'));
const { chromium } = require('playwright');

const ROOT = path.resolve(import.meta.dirname, '../..');
const TYPES = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.ttf': 'font/ttf', '.js': 'text/javascript' };
const srv = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return res.writeHead(404).end();
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0, '127.0.0.1');
await new Promise(r => srv.on('listening', r));
const port = srv.address().port;

const [out, ...ids] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
for (const id of ids) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  page.on('console', m => { if (m.type() === 'error') console.log(id, 'console:', m.text()); });
  await page.goto(`http://127.0.0.1:${port}/docs/studio/studio.html?d=${id}`);
  await page.waitForFunction(() => window.READY || window.ERR, null, { timeout: 180000 });
  const err = await page.evaluate(() => window.ERR);
  if (err) { console.log(id, 'ERR', err); await page.close(); continue; }
  const data = await page.evaluate(() => document.getElementById('out').toDataURL('image/png'));
  fs.writeFileSync(path.join(out, id + '.png'), Buffer.from(data.split(',')[1], 'base64'));
  console.log(id, 'ok');
  await page.close();
}
await browser.close();
srv.close();
