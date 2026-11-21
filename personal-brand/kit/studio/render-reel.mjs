// Dev-only: renders a studio.html motion test (window.FRAME / NFRAMES) to an mp4. Never ships.
// node personal-brand/kit/studio/render-reel.mjs <out.mp4> m1 [fps]   (Playwright from website/tests/browsers, ffmpeg on PATH)
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(path.resolve(import.meta.dirname, '../../../website/tests/browsers/package.json'));
const { chromium } = require('playwright');

const ROOT = path.resolve(import.meta.dirname, '../../..');
const TYPES = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.ttf': 'font/ttf', '.js': 'text/javascript' };
const srv = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return res.writeHead(404).end();
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0, '127.0.0.1');
await new Promise(r => srv.on('listening', r));

const [out, id = 'm1', fps = '24'] = process.argv.slice(2);
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'jatin-reel-'));
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
page.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()); });
await page.goto(`http://127.0.0.1:${srv.address().port}/personal-brand/kit/studio/studio.html?d=${id}`);
await page.waitForFunction(() => window.READY || window.ERR, null, { timeout: 300000 });
const err = await page.evaluate(() => window.ERR);
if (err) { console.log('ERR', err); process.exit(1); }
const n = await page.evaluate(() => window.NFRAMES);
for (let f = 0; f < n; f++) {
  const data = await page.evaluate(f => window.FRAME(f).toDataURL('image/jpeg', .93), f);
  fs.writeFileSync(path.join(dir, String(f).padStart(4, '0') + '.jpg'), Buffer.from(data.split(',')[1], 'base64'));
}
await browser.close(); srv.close();
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', fps, '-i', path.join(dir, '%04d.jpg'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '24', '-preset', 'slow', '-movflags', '+faststart', out]);
console.log('frames in', dir, '->', out, n, 'frames');
