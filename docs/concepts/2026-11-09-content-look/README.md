# Content look — posts and reels in his language

Drafts: https://claude.ai/artifact/M92mq2HztYmj2Qgp5dCTbq (private). Renderer: `docs/studio/` (dev-only, never
ships; `node docs/studio/render.mjs <outDir> p1 p2 p3 r1 … r7`, uses tests/browsers' pinned Playwright + three.js r128
from cdnjs).

## Round 1 — 2026-11-09

**His notes, in his words:** "whatever u made so far is pretty simple and not good yet" (on the asset-kit preview).
"i dont want you to look into the context of the posts as my context might be different but rather want you to look
at the Design and theme because i want to achieve this quality of posts for my reels and posts. 1:40 sec video is
more of simpler edit with a alot more talking and context and other 40 sec one is a high effort edit … make this
type of content with my design language".

**References:** two posts (giant hand-lettered yellow/red type, one real object — TV / notebook — with real shadow,
voxel props, white grid, tilted label); a 1:40 talking reel (cutout host bottom-centre, fixed caption box, a new
full-bleed image every phrase); a 40s high-effort reel (built three-colour world, kinetic type in depth behind and in
front of the subject, ransom letters, flat-colour roto silhouettes, retro OS windows, collage pages, cuts every
0.5–1s).

**Built:** 3 posts (STOP editing SAFE / FRAMES i almost DELETED / CUT IT in one NIGHT) as real 3D scenes: black tile
floor with accent grout, his photos as curled prints, voxel chain / star / sparkle / cursor / CRT stepped through the
Bayer ramps, hand-sticker Cyberway type on panels that cast shadows. 7 reel frames: 3 talk-format (fixed cutout +
caption, world changes per phrase), 4 high-effort (word behind him, pink roto silhouette, JATINSPACE window, collage).

**Fixed while checking:** ACES tone mapping + unconverted instance colours washed everything pastel → no tone mapping,
sRGB→linear colours; a 1px fallback font stacked the small mono word into one glyph; mono words drawn under the big
fills; captions over his face; type clipping off the frame.

**Open:** floor reads slightly grey; type has no thickness; high-effort needs a motion test.
