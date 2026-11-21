# justjatin posts · the white look

## 2026-11-21 · direction set

**His note, in his words:** "i want my content creation design style to be changing into something like this but with a
pinch of our own style, essentially wanted to go for something that is simpler like my reference but also including our
style with a white background too keep it more liking to audience".

**References:** `img/ref11-1.jpg` (026 MEMORIAS poster) and `img/ref11-2.jpg` (Sr. Motion Designer poster).

**New base:** white paper ground, lots of air, one hero subject plus the title, black doing most of the work, colour in
small loud doses. **Our pinch:** palette tiles and blobs, Bayer dither and pixel steps, the pixel chain and cursor, the
red/cyan split, boxed mono labels. Replaces the dark shard world and the full-bleed mixed-media background. Nothing built yet. The dark look, rounds 1–10, is archived in `../../archive/2026-11-09-dark-look/`.

## Round 1 — 2026-11-21

**His ask:** "in new drop start on our new design style as well".

**Built** (`studio.html`, `WHITE LOOK, ROUND 1`, drafts `w1`–`w3`; render with `node studio/render.mjs <out> w1 w2 w3`):
- `wstage` white paper with a faint dot grid; `engrave` a line-screen engraving (line width follows darkness, the line
  path is any phase function); `gmap` a photo through a palette ramp in 3px Bayer steps (the colour tiles); `pblob` the
  pixel colour blob; `wtitle` black Cyberway on a paper rim with the static cyan/pink split; `blabel` boxed mono labels;
  `vlabel` vertical caps; `zoom` box-to-inset lines; `wcursor` the site cursor extruded; `wfoot` rule, JATIN mark,
  highlighted line, barcode.
- **w1 MADE IT without TRYING:** an engraved fingerprint (identity nobody designs) on an acid blob; its core zooms out to
  the JATIN logo; site screens as tiles.
- **w2 CONSUME to your heart's content FIRST:** an engraved eye in rings on a pink blob, his flux photo in the iris and
  in the inset, three more of his photos as tiles.
- **w3 NO FRAMEWORK NO STEPS:** an engraved staircase on a cyan blob, struck through in pink pixels; the 5-step how-to
  window with every step crossed out and the cursor on its close box; a pink chain snapped off it.

**Fixed while checking:** the labels fell back to a serif (Plex 500 wasn't loaded before drawing); the stairs read as a
ramp until each step got an ink edge and alternating tones; the eye's rings filled the frame, and its vertical labels
got lost in them (cut).

**Open:** still busier than his references; MADE IT's site tiles read as abstract colour.

**Stills:** `img/w1.jpg`–`img/w3.jpg`. Viewer: `personal-brand/kit/index.html` (white look and dark look, one drop-down each).

## Round 2 — 2026-11-21 · one reading path, a readable headline

**His note, in his words:** "overall the design looks good but the problem is u need to understand viewers reading
patterns and font selection/hierarchy for the readers to read to easily."

**Built** (drafts `w1`–`w3`; round 1 kept as `w1r1`–`w3r1`):
- One path, top-left first: headline block → hero → support line → JATIN mark. No sentence split round the hero.
- Headline in DM Serif Display italic (`head`, fitted to the width), one word on a palette marker strip; Cyberway only on
  the mark; no split on the headline.
- Three levels: headline, a 31px mono support line (`sub`), the footer mark (`wfoot2`). Cut: the boxed WITHOUT, the side
  words, the 21px footer sentence, extra tiles.
- Checked at phone width (`img/round2-phone.jpg`).

**Stills:** round 1 is `img/w*-round1.jpg`; round 2 is `img/w*.jpg`.

## Round 3 — 2026-11-21 · Sterion headlines

**His pick, in his words:** "i just downloaded a font called sterion font use that instead".

**Built:** headlines in Sterion Italic (`kit/fonts/SterionItalic-R99PA.ttf`, loaded in `studio.html`). It's wide, so
each headline gets its own breaks (`HL3`) and is fitted to fill the top block (y 80–440). Layout, reading path and the
marker strip are round 2's (`w*r2`; `w*` wraps them with the Sterion headline).

**Licence:** Sterion is CC BY-NC (non-commercial), from fontspace (`kit/fonts/sterion-info.txt`). Fine for personal
posts; a paid job or ad would need a commercial licence.

**Stills:** round 2 is `img/w*-round2.jpg`; round 3 is `img/w*.jpg`.

## Round 4 — 2026-11-21 · the 3D eye (CONSUME)

**His ask, in his words:** "i would rather u make a 3d eyeball model with a similar gradient animation like the screen
recording i uploaded" (plus two eyeball refs: a glossy photo eye and a halftone cut-out eye). His clip (1.8s, 828×1234):
a still, lit 3D object whose tones run through a gradient map, white → grey → black → crimson → orange → yellow, with
the map flowing through the form; HUD labels type on beside it.

**Built** (`studio.html`, `EYE_FS` / `eyeGL` / `consume4`; drafts `w2r4` still, `w2m` motion):
- One fragment shader, no library: an analytic sphere, gaze frame, iris fibres, limbal ring, pupil, veins on the back,
  hard window reflections on a bulged cornea, an ink rim at the silhouette.
- Tone → cyclic palette ramp (paper, grey, ink, purple, pink, acid) in 2px Bayer steps; the map index is tone + angle
  from the pupil − time, so the colour flows outward. Gaze turns on a 4s sine; the flow does 2 cycles in 4s: seamless loop.
- Static post layers are built once; the eye is drawn per frame between them.
- `render-reel.mjs` now launches Chromium with SwiftShader WebGL (headless had no GL for the shader).

**Files:** `img/w2-eye.jpg` (still), `w2-motion.mp4` (4s, 24fps, 1080×1350).

## Round 5 — 2026-11-21 · tracking boxes

**His ask, in his words:** "Could u replace those picture boxes with these kind of tracery effect like in the refrence ?"
(ref: a face cut into computer-vision detection boxes, each tinted one colour, outlined, with a "098%" tab).

**Built:** `TRACK` switches `tile()` to a tracking box: the photo through a one-colour ramp (deep shade → colour →
pale → paper) in 2px Bayer steps, a 3px outline in that colour, and a tab with a confidence number seeded by position.
Pink / cyan / acid stand in for the ref's red / blue / green. Drafts: `w1`, `w2` (the 3D eye), `w3`, motion `w2m5`.

**Fixed while checking:** the first tint had stray green pixels (the accent hex went through an rgba parser).

**Files:** round 3 is `img/w*-round3.jpg`, round 4's loop is `w2-motion-round4.mp4`; round 5 is `img/w*.jpg` and
`w2-motion.mp4`.

## Round 6 — 2026-11-21 · macro viewfinders on the hero

**His note, in his words:** "No i don't want photos inside the boxes as well instead make it similar to the refrence where
it above and making a macro view finder tracery effect".

**Built:** `scope()` draws a tracking box ON the hero: the region under it, magnified (`zoom`), tinted one colour in 2px
Bayer steps, outline, ink corner brackets, centre tick, confidence tab. `scoped()` renders a round 3 post with no tiles
(`TRACK=2`) and lays the boxes over it. On the eye, `eyeBoxes` projects the pupil from the gaze each frame so the cyan box
follows it; the confidence numbers tick at 6/s. Photo tiles and MADE IT's logo inset are gone.

**Fixed while checking:** the pupil box at 1.8× zoom was solid dark; at 1.12× it frames pupil and iris.

**Files:** round 5 is `img/w*-round5.jpg`, `w2-motion-round5.mp4`; round 6 is `img/w*.jpg`, `w2-motion.mp4`.
