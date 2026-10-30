// Video pipeline: his edit masters → web-ready files in site/work/, and the
// VIDEOS block in site/index.html rewritten to match. The twin of photos.mjs;
// re-run whenever an edit changes, it rebuilds everything it owns.
//
//   node docs/tools/videos.mjs "/path/to/FLux best work"
//
// Each edit becomes three files:
//   site/work/<set>/NN.mp4     H.264 High + AAC, long edge ≤1920 / short ≤1080
//                              (4K and 2160² masters come down to 1080), CRF 23
//                              capped at 5Mbps, +faststart so it plays while it
//                              loads, no metadata. Rec.709 tags kept.
//   site/work/<set>/NN.jpg     poster, 1920 long edge — the viewer, before play
//   site/work/<set>/NN-t.jpg   poster thumb, 640w — the grid
// The poster is the most "typical" frame around a third of the way in (ffmpeg's
// thumbnail filter), so it's never a black head frame or a fade.
// Order and titles are SETS below, not the folder's filename order.
//
// Needs ffmpeg + ffprobe (Homebrew).

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const REPO = path.resolve(import.meta.dirname, '..', '..');
const SITE = path.join(REPO, 'site');
const WORK = path.join(SITE, 'work');

/* set id → [source file, title shown in the OS], in play order. The OS's FOLDERS refer to these ids. */
const SETS = [
  { id: 'flux-edits', files: [
    ['Flux teaser1.mp4', 'FLUX TEASER'],
    ['Flux issue3.mp4', 'FLUX ISSUE 03'],
    ['cover.mp4', 'COVER'],
    ['Fashion edit issue3.mp4', 'FASHION EDIT · ISSUE 03'],
    ['Event issue3.mp4', 'EVENT · ISSUE 03'],
    ['natyam.mp4', 'NATYAM'],
    ['TAJfalaknuma.mp4', 'TAJ FALAKNUMA'],
  ] },
  { id: 'outstation-edits', files: [['outstation edit 4k.mov', 'OUTSTATION']] },
];
const MAX_MB = 95;   // GitHub refuses any single file over 100MB

const src = process.argv[2];
if (!src || !fs.existsSync(src)) { console.error('usage: node docs/tools/videos.mjs "/path/to/FLux best work"'); process.exit(1); }

const run = (args) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: ['ignore', 'pipe', 'inherit'] });
const probe = (f) => JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration', '-of', 'json', f]).toString());
const out = {};
let bytes = 0;

for (const s of SETS) {
  const dest = path.join(WORK, s.id);
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  out[s.id] = [];
  s.files.forEach(([f, title], i) => {
    const input = path.join(src, f);
    if (!fs.existsSync(input)) { console.error(`missing: ${f}`); process.exit(1); }
    const n = String(i + 1).padStart(2, '0');
    const mp4 = path.join(dest, `${n}.mp4`), poster = path.join(dest, `${n}.jpg`), thumb = path.join(dest, `${n}-t.jpg`);
    run(['-i', input, '-map', '0:v:0', '-map', '0:a:0?', '-map_metadata', '-1', '-map_chapters', '-1',
      '-vf', 'scale=w=min(1920\\,iw):h=min(1080\\,ih):force_original_aspect_ratio=decrease:force_divisible_by=2,format=yuv420p',
      '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '23', '-maxrate', '5M', '-bufsize', '10M',
      '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
      '-c:a', 'aac', '-b:a', '160k', '-ac', '2', '-movflags', '+faststart', mp4]);
    const p = probe(mp4), { width: w, height: h } = p.streams[0], dur = +(+p.format.duration).toFixed(1);
    run(['-ss', String(dur * .33), '-i', mp4, '-vf', 'thumbnail=72', '-frames:v', '1', '-q:v', '3', poster]);
    run(['-i', poster, '-vf', 'scale=640:-2', '-q:v', '5', thumb]);
    const mb = fs.statSync(mp4).size / 1048576;
    if (mb > MAX_MB) { console.error(`${s.id}/${n}.mp4 is ${mb.toFixed(1)}MB, over ${MAX_MB}MB`); process.exit(1); }
    out[s.id].push([w, h, dur, title]);
    bytes += fs.statSync(mp4).size + fs.statSync(poster).size + fs.statSync(thumb).size;
    console.log(`  ${s.id}/${n}  ${f}  ${w}×${h}  ${dur}s  ${mb.toFixed(1)}MB`);
  });
}

/* rewrite the generated block in the page: set id → [[w,h,seconds,title], …] in play order */
const file = path.join(SITE, 'index.html');
const html = fs.readFileSync(file, 'utf8');
const re = /(\/\* VIDEOS:BEGIN[^*]*\*\/)[\s\S]*?(\/\* VIDEOS:END \*\/)/;
if (!re.test(html)) { console.error('VIDEOS:BEGIN / VIDEOS:END markers not found in site/index.html'); process.exit(1); }
const block = '\n  const VIDEOS={\n' + Object.entries(out).map(([k, v]) => `    '${k}':${JSON.stringify(v)}`).join(',\n') + '};\n  ';
fs.writeFileSync(file, html.replace(re, `$1${block}$2`));
console.log(`\n${Object.values(out).flat().length} edits, ${(bytes / 1048576).toFixed(1)}MB in site/work/; VIDEOS block updated`);
