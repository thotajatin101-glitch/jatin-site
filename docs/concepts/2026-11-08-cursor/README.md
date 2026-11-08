# Cursor — 2026-11-08

## Round 1
**His words:** "i want us to work on making a custom curser for the website. here is a refrence that fits our theme.
i want the curser to have it own personality and behaviour but not sure how to explain that." Then, after my read of
it: "Build it straight".

**Reference** (`reference.webp`): a pixel arrow and pointing hand extruded into blocks; glossy black faces with one
curved shine, lavender rim, pink → violet sides.

**My read, which he took:** an object with weight that answers you and never fidgets.

**Built (`CursorFX`):**
- One 96px canvas pinned to the pointer, drawn at one texel per 2px cell and blown up unsmoothed.
- Black glossy face, curved shine, lavender rim; the side runs the page's accent (light at the face, deep at the
  back) inside a black ink rule, so it reads on every page including the same-coloured wedge.
- Position is instant; only the lean has weight (spring, slight overshoot). A flick throws the side out long.
- Arrow → hand on anything clickable (read from the site's own `cursor:` rules + inline styles), a hard cut with a
  punch and one stepped glint. Pixel I-beam over text fields.
- Click = key press: the face sinks into its side, a 90ms red/cyan split, six pixels pop off.
- Loop stops when settled. Off without a fine hovering pointer; reduced motion drops lean and pops.
- `CursorFX.pose(shape, press, leanX, leanY)` freezes a pose for stills.

**Stills:** `docs/process/stills/2026-11-08-cursor-v1/states.png` (rest, flicks, hand, click, I-beam, lean, press).

**Left out on purpose:** a trail (it would read as the idle flicker he cut).

