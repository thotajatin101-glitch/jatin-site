// Pre-release check for the shipped folder. Zero dependencies (Node 18+).
//
//   node tests/check.mjs            check site/ locally
//   node tests/check.mjs <url>      check a live deploy, e.g. https://example.com
//
// 1. Syntax: every inline <script> in site/index.html must compile.
// 2. Routes: every key route returns 200 with its key content
//    (cache-busted with ?v=<timestamp>). Locally it serves site/ itself.
// 3. Photos: every photo the PHOTOS block names is served as a JPEG (all
//    three sizes: grid thumb, viewer full, zoom); locally also: exact-case filenames (hosts are case-sensitive,
//    macOS isn't), no EXIF/GPS left in, sizes match the block, weight budgets,
//    no stray files. Live, each one must match the local file byte for byte
//    in length, i.e. the deploy is current.
// This is the "lint + route tests" step in docs/RELEASE.md. It does not run
// the page — motion and console errors are checked in a real browser
// (docs/VERIFY.md); loading under a slow network is tests/load.mjs.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const SITE = path.resolve(import.meta.dirname, '..', 'site');
const html = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');
let failed = 0;
const ok = (msg) => console.log('  ok   ' + msg);
const bad = (msg) => { failed++; console.log('  FAIL ' + msg); };

// --- 1. syntax -------------------------------------------------------------
console.log('syntax');
[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach((m, i) => {
  try { new vm.Script(m[1], { filename: `inline-script-${i}` }); ok(`inline script ${i}`); }
  catch (e) { bad(`inline script ${i}: ${e.message}`); }
});

// --- 2. routes -------------------------------------------------------------
// Hash routes (#about etc.) never reach the server, so they're checked as
// "the screen exists in the page"; the browser pass covers opening them.
const PAGE_HAS = [
  ['menu: ABOUT plate', 'id="m-about"'],
  ['menu: PROJECTS plate', 'id="m-projects"'],
  ['menu: SKILLS plate', 'id="m-skills"'],
  ['menu: CONTACT plate', 'id="m-contact"'],
  ['#about screen', 'id="sec-about"'],
  ['#projects screen', 'id="sec-projects"'],
  ['#skills screen', 'id="sec-skills"'],
  ['#contact screen', 'id="sec-contact"'],
  ['intro canvas', 'IntroFX'],
  ['?frame scrub', 'frame='],
  ['reduced motion', 'prefers-reduced-motion'],
];
const ROUTES = [
  ['/', 'text/html', PAGE_HAS],
  ['/?frame=20', 'text/html', []],
  ['/jatin-cutout.png', 'image/png', []],
];

function serve() {
  const TYPES = { '.html': 'text/html', '.png': 'image/png', '.jpg': 'image/jpeg' };
  const srv = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(SITE, rel === '/' ? 'index.html' : rel);
    if (!file.startsWith(SITE) || !fs.existsSync(file)) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(fs.readFileSync(file));
  });
  return new Promise((r) => srv.listen(0, () => r(srv)));
}

const live = process.argv[2];
const srv = live ? null : await serve();
const base = live ? live.replace(/\/$/, '') : `http://localhost:${srv.address().port}`;
console.log(`routes  (${base})`);
const bust = 'v=' + Date.now();
for (const [route, type, checks] of ROUTES) {
  const url = base + route + (route.includes('?') ? '&' : '?') + bust;
  try {
    const res = await fetch(url);
    const ct = res.headers.get('content-type') || '';
    if (res.status !== 200) { bad(`${route} → ${res.status}`); continue; }
    if (!ct.includes(type)) { bad(`${route} → content-type ${ct}, want ${type}`); continue; }
    ok(`${route} → 200 ${type}`);
    if (checks.length) {
      const body = await res.text();
      for (const [name, needle] of checks) body.includes(needle) ? ok(`  ${name}`) : bad(`  ${name} missing (${needle})`);
    }
  } catch (e) { bad(`${route} → ${e.message}`); }
}

// --- 3. photos -------------------------------------------------------------
// budgets: what a phone on a mid connection can pull without stalling.
// A grid opens ~20 thumbs at once; the viewer pulls one full + two neighbours;
// a zoom file only loads when someone zooms into that one photo.
const BUDGET = { thumb: 180 * 1024, full: 750 * 1024, zoom: 1.8 * 1048576, site: 100 * 1048576, html: 2 * 1048576 };
const block = html.match(/const PHOTOS=(\{[\s\S]*?\});/);
const PHOTOS = block ? new Function(`return ${block[1]}`)() : null;
console.log('photos');
if (!PHOTOS) bad('PHOTOS block not found in index.html');
else {
  const kb = (n) => `${(n / 1024) | 0}K`;
  // width × height from a JPEG's SOF segment; true if an EXIF APP1 is present
  const jpeg = (buf) => {
    let i = 2, exif = false, dim = null;
    while (i < buf.length - 9 && buf[i] === 0xff) {
      const m = buf[i + 1], len = buf.readUInt16BE(i + 2);
      if (m === 0xe1 && buf.toString('latin1', i + 4, i + 8) === 'Exif') exif = true;
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) { dim = [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)]; break; }
      i += 2 + len;
    }
    return { exif, dim, jpeg: buf[0] === 0xff && buf[1] === 0xd8 };
  };
  const files = [];
  for (const [set, list] of Object.entries(PHOTOS)) {
    const dir = path.join(SITE, 'work', set);
    const names = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
    let n = 0, weight = 0;
    list.forEach(([w, h], i) => {
      for (const kind of ['full', 'thumb', 'zoom']) {
        const thumb = kind === 'thumb';
        const name = String(i + 1).padStart(2, '0') + { full: '', thumb: '-t', zoom: '-z' }[kind] + '.jpg', rel = `work/${set}/${name}`;
        files.push(rel);
        if (!names.includes(name)) { bad(`${rel} missing (or wrong case)`); continue; }
        const buf = fs.readFileSync(path.join(dir, name)), j = jpeg(buf);
        weight += buf.length;
        if (!j.jpeg) bad(`${rel} is not a JPEG`);
        if (j.exif) bad(`${rel} still carries EXIF (camera/GPS data) — re-run docs/tools/photos.mjs`);
        if (kind === 'full' && j.dim && (j.dim[0] !== w || j.dim[1] !== h)) bad(`${rel} is ${j.dim.join('×')}, block says ${w}×${h}`);
        if (kind === 'zoom' && j.dim && Math.abs(j.dim[0] / j.dim[1] - w / h) > .01) bad(`${rel} has a different shape from its full frame`);
        if (buf.length > BUDGET[kind]) bad(`${rel} ${kb(buf.length)} over the ${kind} budget`);
        n++;
      }
    });
    const stray = names.filter((f) => !files.includes(`work/${set}/${f}`) && !f.startsWith('.'));
    if (stray.length) bad(`work/${set}: files not in the PHOTOS block: ${stray.join(', ')}`);
    ok(`${set}: ${list.length} photos, ${n} files, ${kb(weight)}`);
  }
  const sets = fs.existsSync(path.join(SITE, 'work')) ? fs.readdirSync(path.join(SITE, 'work')).filter((d) => !d.startsWith('.')) : [];
  sets.filter((d) => !PHOTOS[d]).forEach((d) => bad(`work/${d} is not in the PHOTOS block`));
  // every set a folder points at must exist
  for (const m of html.matchAll(/set:'([^']+)'/g)) if (!PHOTOS[m[1]]) bad(`a folder points at set '${m[1]}', which has no photos`);
  const du = (d) => fs.readdirSync(d, { withFileTypes: true }).reduce((a, e) => a + (e.isDirectory() ? du(path.join(d, e.name)) : fs.statSync(path.join(d, e.name)).size), 0);
  const total = du(SITE);
  total > BUDGET.site ? bad(`site/ is ${(total / 1048576).toFixed(1)}MB, over ${BUDGET.site / 1048576}MB`) : ok(`site/ total ${(total / 1048576).toFixed(1)}MB (budget ${BUDGET.site / 1048576}MB)`);
  html.length > BUDGET.html ? bad(`index.html ${kb(html.length)} over budget`) : ok(`index.html ${kb(html.length)}`);
  // served: right type, and live must match the local file's length
  let served = 0;
  await Promise.all(files.map(async (rel) => {
    try {
      const res = await fetch(`${base}/${rel}?${bust}`);
      const ct = res.headers.get('content-type') || '', body = Buffer.from(await res.arrayBuffer());
      if (res.status !== 200) return bad(`${rel} → ${res.status}`);
      if (!ct.includes('image/jpeg')) return bad(`${rel} → content-type ${ct}`);
      const local = path.join(SITE, rel);
      if (live && fs.existsSync(local) && fs.statSync(local).size !== body.length) return bad(`${rel} live copy differs from local (stale deploy?)`);
      served++;
    } catch (e) { bad(`${rel} → ${e.message}`); }
  }));
  served === files.length ? ok(`all ${served} photo files served as image/jpeg`) : bad(`${served}/${files.length} photo files served`);
}
srv?.close();

console.log(failed ? `\n${failed} failed` : '\nall passed');
process.exit(failed ? 1 : 0);
