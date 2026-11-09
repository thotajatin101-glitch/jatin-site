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

## Round 2 — 2026-11-09 · posts, electric

**His notes, in his words:** "The posts are definetly alot better but reels require alot of effort still. but let's
use this doc itself as preview for changes, let's work on perfecting the posts look right now, So i like the whole 3d
look it has with light and everything but the colours and background washed out i want them to stick to the electric
colour scheme we have."

**Why it washed out:**
- The key light sat on the camera's side (-4,22,4), so every flat face mirrored it back as a white glare.
- The hemisphere light and the coloured point light pushed every object toward pastel.
- The voxel ramps reached into their near-white steps.
- The floor's specular turned the black tiles grey (~73/255).

**Built:**
- **Light:** the key now comes from the back left (-13,20,-6) at 1.02, with a 0.16 hemisphere fill, balanced so a flat
  face renders at its exact palette value. The shadows got longer and harder.
- **Accent:** the point light is gone. A low accent kicker from the far side lights only the voxel walls.
- **Floor:** matte Lambert pure black. The grout is emissive neon in the accent, with a glow and a white-hot core, and
  an accent bloom pools at the vanishing point. It now samples about 5/255.
- **Voxels:** they use the middle of the ramp (chains .9–2.75; pink props .8–2.4), so there are no pastel steps.
- **Bloom:** a post bloom on the bright, saturated pixels only (`bloom()` in `finishPost`).
- **Fixes:** the sparkle is off the "i", the star is off NIGHT's T, and p3 is tagged EDIT NOTES · 02.

**Stills:** round 1 is kept as `img/p*-round1.jpg`; round 2 is `img/p*.jpg`.

**Open:** extruded type (a side wall on the rim); the CRT body still reads flat grey; the reels wait until the posts lock.
