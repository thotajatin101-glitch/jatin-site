// Pre-release check for the shipped folder. Zero dependencies (Node 18+).
//
//   node tests/check.mjs            check site/ locally
//   node tests/check.mjs <url>      check a live deploy, e.g. https://example.com
//
// 1. Syntax: every inline <script> in site/index.html must compile.
// 2. Routes: every key route returns 200 with its key content
//    (cache-busted with ?v=<timestamp>). Locally it serves site/ itself.
// This is the "lint + route tests" step in docs/RELEASE.md. It does not run
// the page — motion and console errors are checked in a real browser
// (docs/VERIFY.md).

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
  const TYPES = { '.html': 'text/html', '.png': 'image/png' };
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
srv?.close();

console.log(failed ? `\n${failed} failed` : '\nall passed');
process.exit(failed ? 1 : 0);
