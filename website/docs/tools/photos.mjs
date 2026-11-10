// Photo pipeline: his source folders → web-ready files in site/work/, and the
// PHOTOS block in site/index.html rewritten to match. Re-run whenever a folder
// changes; it rebuilds everything it owns.
//
//   node docs/tools/photos.mjs "/path/to/BEST"
//
// Each photo becomes three files:
//   site/work/<set>/NN.jpg     full, 2000px long edge, q82 — the viewer
//   site/work/<set>/NN-t.jpg   thumb, 640px wide, q74     — the grid
//   site/work/<set>/NN-z.jpg   zoom, 3000px long edge, q80 — fetched only
//                              when someone zooms in (every source is
//                              ≥3129px, so this never upscales)
// Colour is converted to sRGB first (some sources are Display P3 / Rec.709,
// which shift if the profile is just dropped), then every tag is stripped:
// no EXIF, no GPS, no camera serials on the public site. Progressive JPEG,
// lower-case names — web hosts are case-sensitive even though macOS isn't.
// Order is the source folder's filename order.
//
// Needs macOS `sips` (colour + resize) and ImageMagick `convert` (encode).

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const REPO = path.resolve(import.meta.dirname, '..', '..');
const SITE = path.join(REPO, 'site');
const WORK = path.join(SITE, 'work');
const SRGB = '/System/Library/ColorSync/Profiles/sRGB Profile.icc';
const CONVERT = ['/opt/ImageMagick/bin/convert', '/opt/homebrew/bin/convert', '/usr/local/bin/convert'].find((b) => fs.existsSync(b));

/* set id → source subfolder. The OS's FOLDERS refer to these ids. */
const SETS = [
  { id: 'flux-01', dir: 'Mag 1' },
  { id: 'flux-02', dir: 'Mag 2' },
  { id: 'flux-03', dir: 'Mag 3' },
  { id: 'outstation', dir: 'outstation' },
];
const FULL = { edge: 2000, q: 82 }, THUMB = { w: 640, q: 74 }, ZOOM = { edge: 3000, q: 80 };

const src = process.argv[2];
if (!src || !fs.existsSync(src)) { console.error('usage: node docs/tools/photos.mjs "/path/to/BEST"'); process.exit(1); }
if (!CONVERT) { console.error('ImageMagick convert not found'); process.exit(1); }

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'photos-'));
const run = (bin, args) => execFileSync(bin, args, { stdio: ['ignore', 'pipe', 'pipe'] }).toString();
const dims = (f) => run('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', f]).match(/\d+/g).slice(-2).map(Number);
const out = {};
let bytes = 0;

for (const s of SETS) {
  const dir = path.join(src, s.dir);
  if (!fs.existsSync(dir)) { console.log(`skip ${s.id}: no "${s.dir}"`); continue; }
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|tiff?|heic)$/i.test(f)).sort();
  const dest = path.join(WORK, s.id);
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  out[s.id] = [];
  files.forEach((f, i) => {
    const n = String(i + 1).padStart(2, '0'), master = path.join(tmp, `${s.id}-${n}.tif`);
    /* sRGB + downsize in one pass (sips), then encode + strip (ImageMagick) */
    run('sips', ['-s', 'format', 'tiff', '--matchTo', SRGB, '-Z', String(ZOOM.edge), path.join(dir, f), '--out', master]);
    const full = path.join(dest, `${n}.jpg`), thumb = path.join(dest, `${n}-t.jpg`), zoom = path.join(dest, `${n}-z.jpg`);
    const enc = ['-strip', '-interlace', 'Plane', '-sampling-factor', '4:2:0'];
    run(CONVERT, [master, ...enc, '-quality', String(ZOOM.q), zoom]);
    run(CONVERT, [master, '-resize', `${FULL.edge}x${FULL.edge}>`, ...enc, '-quality', String(FULL.q), full]);
    run(CONVERT, [master, '-resize', `${THUMB.w}x`, ...enc, '-quality', String(THUMB.q), thumb]);
    const [w, h] = dims(full);
    out[s.id].push([w, h]);
    bytes += fs.statSync(full).size + fs.statSync(thumb).size + fs.statSync(zoom).size;
    console.log(`  ${s.id}/${n}  ${f}  ${w}×${h}  ${[full, thumb, zoom].map((x) => ((fs.statSync(x).size / 1024) | 0) + 'K').join(' / ')}`);
  });
}
fs.rmSync(tmp, { recursive: true, force: true });

/* rewrite the generated block in the page: set id → [[w,h], …] in file order */
const file = path.join(SITE, 'index.html');
const html = fs.readFileSync(file, 'utf8');
const re = /(\/\* PHOTOS:BEGIN[^*]*\*\/)[\s\S]*?(\/\* PHOTOS:END \*\/)/;
if (!re.test(html)) { console.error('PHOTOS:BEGIN / PHOTOS:END markers not found in site/index.html'); process.exit(1); }
const block = '\n  const PHOTOS={\n' + Object.entries(out).map(([k, v]) => `    '${k}':${JSON.stringify(v)}`).join(',\n') + '};\n  ';
fs.writeFileSync(file, html.replace(re, `$1${block}$2`));
console.log(`\n${Object.values(out).flat().length} photos, ${(bytes / 1048576).toFixed(1)}MB in site/work/; PHOTOS block updated`);
