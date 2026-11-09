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

## Round 3 — 2026-11-09 · posts, in his world

**His notes, in his words:** "These posts are also of similar style that i do like they are bold and the get idea too
and right now posts look fine good but it doesnt feel like it captured my style. and i can see the elements of website
design but that's how i remember my website to look like. remember what i like and don't like. i like our chain design
and our curser and everything (althought i do prefer the font design in the current so keep that)". New references:
bold flat graphic layers (paper shapes, starbursts, marker strokes) behind one real object (a sketchbook, a clip).

**Read:** round 2 was the site's props on a neon Tron floor, and the floor is not the site. The site is its world.

**Built (`siteWorld`, `ditherTri`, `chainLinks` in studio.html):**
- **Camera:** straight down. Every flat layer (`framePlane`) is sized to land exactly on the frame at its height, so
  the 2D ground and the 3D objects line up pixel for pixel.
- **Ground** (painted flat, 2 texels per px), all from the site:
  - the menu sky pooled at a vanishing point, plus the perspective grid;
  - the site's `makeShardSVG` geometry and fills (stripe/hatch prints, thick ink);
  - the accent wedge in 4×4 Bayer steps with its red/cyan edge;
  - ink streaks, light streaks with white-hot cores, the bloom, and the 23° ink-dot screen;
  - the furniture: P5 stars, sparkles, pixel stickers, wire scribbles.
- **Acid shade:** acid now shades to deep green. Into the purple shade it went olive.
- **Chain:** the site's own pixel-piece link sprites (`ChainFX.sprite` ported), on a Hermite path out of the light,
  growing toward the lens. It sits on a lifted plane, so it casts a real shadow. On p1 it snaps over the print with
  an impact burst, and the flung links ride a higher plane, so their shadows read as flight.
- **Labels:** black menu plates with an accent number.
- **Kept:** the type treatment (his call), the voxel cursor, the prints, and the electric light from round 2.
- **p3:** the light comes out of the CRT (vanishing point on its screen), like the ABOUT handycam.

**Fixed while checking:** the type crowded the corner mark (sizes −7%, lines lower); the acid world went olive; a
flung link landed on his head; the CRT dominated (scaled .82).

**Stills:** round 2 is `img/p*-round2.jpg`, round 1 is `img/p*-round1.jpg`, round 3 is `img/p*.jpg`.

**Open:** the CRT is a flat black box from above (could become the site's beige computer); the reels.

**His verdict (2026-11-10):** "alot better". The site-world ground is the direction.

## Round 4 — 2026-11-10 · one colour world per post

**His notes, in his words:** "the scattered shards in the background needs to have the same dither look we have and
keep the same colour consistency as colour theme of the post itself and the text should be contrasting colour to that
colour scheme."

**Built:**
- **Shards:** each shard is filled with a 4-step ramp in 4×4 Bayer cells (3px), running along its length from the
  light outward. The direction and starting step are per shard. About a quarter of them stay black.
- **Colour:** the families live in `SHARD_FAM`, one per accent: pink/magenta/purple, cyan/teal/deep blue, acid/green.
  The stripe/hatch prints and flat gradients are gone.
- **Type:** `TYPE_ON` gives each world its contrasting type colours. The treatment is unchanged.

| World | Fill | Foot | Rim |
|---|---|---|---|
| Pink | acid | green | cyan |
| Cyan | pink | magenta | acid |
| Acid | pink | magenta | purple |

**Stills:** round 3 is `img/p*-round3.jpg`; round 4 is `img/p*.jpg`.
