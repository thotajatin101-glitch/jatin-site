// The local static server every test uses for site/. Answers byte ranges
// (206) the way GitHub Pages does: Safari / WebKit will not play a <video>
// from a server that ignores Range, so a 200-only server fails the edits
// even though the live site is fine.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

export const SITE = path.resolve(import.meta.dirname, '..', 'site');
const TYPES = { '.html': 'text/html', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4' };

export function handler(req, res) {
  const rel = decodeURIComponent(req.url.split('?')[0]);
  const file = path.join(SITE, rel === '/' ? 'index.html' : rel);
  if (!file.startsWith(SITE) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
  const size = fs.statSync(file).size, type = TYPES[path.extname(file)] || 'application/octet-stream';
  const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
  if (m) {
    let a = m[1] ? +m[1] : size - +m[2], b = m[1] && m[2] ? +m[2] : size - 1;
    if (!(a >= 0 && a <= b && b < size)) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }).end(); return; }
    res.writeHead(206, { 'Content-Type': type, 'Content-Length': b - a + 1, 'Content-Range': `bytes ${a}-${b}/${size}`, 'Accept-Ranges': 'bytes' });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file, { start: a, end: b }).pipe(res);
    return;
  }
  res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(file).pipe(res);
}

/* listen on a free port; resolves to the server */
export const serve = (host) => new Promise((r) => { const s = http.createServer(handler); s.listen(0, host, () => r(s)); });
