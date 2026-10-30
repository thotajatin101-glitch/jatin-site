# JATIN — Personal Portfolio Site

## Who this is for

Jatin. Visual & creative director, runs **Beyond the Noise Studio** (independent
creative studio, Hyderabad). Disciplines: video editing, editorial shoots,
visual/creative direction. Primary tools: DaVinci Resolve + Fusion, where he
builds his own reusable macros.

He is a **director, not a developer**. Talk about this project in editing and
motion terms — cuts, frames, easing, hold, impact — not in framework terms.
He gives feedback the way an editor gives notes ("too slow", "hits too soft",
"it should hold longer"), and that is the right vocabulary to answer in.

**His stated preferences:** short, usable outputs. Direct and structured.
Opinionated creative input over neutral lists of options — pick a direction and
defend it rather than offering him five choices.

## What this is

A single-page personal portfolio. It is not a scrolling website — it behaves
like a **game menu**. One landing screen, and sections open over it.

The concept is a deliberate merge of two references (see `docs/site/reference/`; raw recordings in `.local/reference/`, gitignored):

1. **His own JATIN intro logo animation** — supplies the entire visual language.
2. **A Persona-style game menu** — supplies the interaction and layout model.

## How we work (set up 2026-10-26)

**Start / finish every session**
- Read `docs/HANDOFF.md` before changing files. When done, add an entry at the
  top: date, did, in flight, next, watch out. Commit docs before the session
  ends.
- `docs/BUILD-ORDER.md` is the index of workstreams and which is active.
- Before any hand-over run `docs/WEB-BUGS.md`; check motion per
  `docs/VERIFY.md`. Releases follow `docs/RELEASE.md` — **deploy only when he
  says "deploy"**.

**Building**
- Plan for the long term — no stopgaps meant to be replaced later.
- Content: one source of truth. Here that means one content object inside
  `index.html`, not a separate typed file (no TS, no build — single-file rule
  below wins).
- Dependencies: the single-file, no-dependency rule (Technical state) wins over
  "install a package". Dev-only tools that never ship (e.g. Playwright for
  filming) are OK with his yes; pin exact versions and say why.
- Every screen keeps working direct links (`#about` etc.), a phone layout as
  considered as desktop, keyboard access and reduced motion.

**Shared repo hygiene**
- Never touch, revert or commit someone else's uncommitted files. Stage by
  name; never `git add -A`.
- Never bare `git stash` — WIP commit, or a uniquely tagged stash applied by SHA.

**Iterating on design or motion**
- Each piece gets `docs/concepts/YYYY-MM-DD-name/README.md`: every round, his
  notes in his words, what was built, stills, why ideas were dropped.
- Show stills of key moments before building anything big; look at every
  frame yourself first.
- When he corrects you, save the lesson (his words + why) to memory and to the
  relevant section here.

**Documenting the process** (his ask, 2026-10-26: snapshots + the story, so
he can make documentation for others when it's done)
- Any session that changes the look or motion: `node docs/tools/snap.mjs
  <label> --only <pieces>` and a new chapter in `docs/process/JOURNAL.md` —
  his notes in his words, what was built, what was cut and why.
- Snapshot anything he rejects **before** replacing it.
- Full set + `--film intro,transition,projects` at milestones only (~40MB).
  See `docs/process/README.md`.

## The aesthetic — non-negotiable

Everything comes from his logo animation. Do not soften or "clean up" this look.

- **Palette:** acid yellow `#e8ff00`, cyan `#00f0d8`, magenta `#c81ee0`,
  purple `#7a12b0`, green `#39e639`, pink `#ff2e88` on pure black. Loud,
  high-saturation, clashing on purpose. Yellow→green and cyan→dark gradients
  inside some shards (they're in the video). **Black shards are part of the
  look** — big black wedges between the color, straight from the video.
- **Shatter geometry:** shards radiating from screen center, thick black
  strokes, full bleed edge to edge. **No vignette — ever.** He removed it
  explicitly; the frame stays bright to the edges like the video.
- **Halftone is a fine screenprint screen, not a graphic grid.** Small INK
  dots sitting *on* the colour (`--dotgrid`, `--dot:5px`, rotated
  `--dot-angle:23deg`). Two rules he arrived at the hard way:
  1. **Ink dots, not holes punched in black.** A black-field-with-holes
     version was tried and rejected — punching holes makes the texture read
     as a layer on top of everything, and it shows up over the black shards
     where there should be nothing. Ink dots vanish into the blacks by
     themselves, which is what makes it feel like part of the print.
  2. **Small and angled.** 14px squared-up dots read as "some pattern" —
     his words. It should feel like something naturally in the image, never
     resolve into a visible grid.
  Applied as a CSS overlay on `#shardbg::after`, `#wedge::after` and
  `.section::after` — oversized and rotated, sitting above the colour but
  below all type. Per-shard SVG halftone patterns were removed; don't stack
  the two.
- **Center hold:** not a big dark tunnel — a soft black feathered blob that
  hugs the wordmark (`#hole`), exactly like the shadow behind JATIN in the
  video. The blob is the only darkness on screen.
- **Type: Cyberway Riders** — his own font file, supplied by him, used for the
  wordmark AND every heading (menu plates, section heads, wedge word, card
  titles, back button). It is **embedded as a base64 data URI** in the
  `@font-face` at the top of the stylesheet so the page stays one portable
  self-contained file. The source `CyberwayRiders-lg97d.ttf` sits in the
  project root — keep it, it's the master. Mono for body and micro-copy
  (IBM Plex Mono).
- **Tracking: `--track` (.14em) on ALL display type, `--wordsp` (.28em) on
  multi-word heads.** Cyberway Riders has long spurs/swashes; near zero
  tracking the glyphs fuse (he flagged PROJECTS reading as one blob). Tested
  side by side: .035 merges, .12 separates, .16 falls apart as a word. Never
  set display type tighter than the token — and the intro's canvas logo is
  tracked by hand in `makeLogo` (canvas ignores CSS letter-spacing).
- **Layout rule: anything placed under a heading hangs off the heading's real
  size.** Headings are capped by width AND height (`--headFs`:
  `clamp(3rem,min(9.5vw,15vh),7.2rem)`; collage uses its own); `.secBody`
  and the collage's tag/card stack (`--cgTop`) start at
  `7vh + 1.95 × --headFs + gap`. Width-only sizing collided with vh-placed
  content on short, wide screens. The banner is height-capped too and sits
  14px higher, since its rotation drops the left end toward BACK. On the
  collage the heading sits above the portrait (z7). On phones the outline
  section number shrinks and rides above the heading's second line.
- **Layout audit before shipping any type/layout change:** check every screen
  (menu + 4 sections) at 1440×900, 1280×800, 1440×700 (short-wide — where
  the collisions show) and 375×812 for overflow (`scrollWidth >
  clientWidth`, including every `.mItem`), collisions between headings /
  cards / tags / BACK, and off-screen text. Bounding boxes overstate rotated
  elements (the banner's 1.6° adds ~29px), so confirm borderline hits by eye.
- **No grunge/distress.** He cut it. The texture comes from the glitch
  shadow, not from eroded glyphs. Don't reach for distressed faces.
- **Glitch shadow** replaces it: a static chromatic split (cyan left, pink
  right, hard black offset) in three sizes — `--glitch-sm/md/lg`. **Static, not
  animated** — idle motion is the "broken TV" he rejected. Rules learned:
  never put the split on mono micro-copy (`.pNum`, `.pSub`) or it doubles the
  letterforms; on a selected plate (ink on flooded accent) drop to a single
  light offset; at small sizes like card titles keep the split to ~1px.
  Headings are always tilted a few degrees, never level.
- **Texture:** light static film grain only. He cut the grain jump / idle
  glitch twitches ("looks like a problem with a TV"), then cut the
  **scanlines entirely** — 1px lines every 3px moiréd against the halftone
  dots and read as glitch/noise. No line overlay, no animated texture.
- **The world has depth (Oct 2026 — supersedes "one slow rotation").** He
  asked for "more depth, intentionality and personality", from Spider-Verse-
  style references. What makes those read as SPACE: one **vanishing point**
  that everything radiates from or recedes into; a glowing **perspective
  grid** floor + ceiling; **light streaks** with white-hot cores; **ink
  streaks** (dark tonal-halftone wedges cutting the bright field); a **bloom**
  at the point; partial shapes with **air** between them; layers moving at
  different depths. Built as:
  - `DepthFX` — one canvas (`#fxCv`, ~1ms/frame of lines) at z17: over the
    wedge, under the black panel, plates and type. Grid flows toward the
    viewer, streaks turn with the shard field (180s), sparkles sit fixed, and
    every layer parallaxes with the pointer at its own depth. On a selection:
    streak burst + the whole world eases to that item's accent (`--world`,
    a registered `@property` so the sky transitions too). It is re-parented
    INTO a section when one opens (between its bands and its dot screen /
    copy) and back to the body for the menu. `SECTION_WORLD` sets each
    section's vanishing point + tint (ABOUT points behind the portrait).
  - Shards are sparse now (`sparse:true`: narrower, starting further out) and
    the bitmap is centred on the vanishing point, so the slow turn pivots on
    the light source; they dissolve as they recede into it (radial
    destination-out in `BgRaster.split`). Gaps stay transparent so the sky
    (`#shardbg::before`, glow pooled at the point) reads through.
  - Motions are few and coherent — flow, turn, parallax, burst-on-input. No
    twinkle, no flicker, no vignette (the sky only brightens toward the
    point; edges are never darkened).
  - The intro speaks the same language (`pGrid`, `lightStreaks`,
    `inkStreaks`, `glow` in IntroFX): the grid shoots out of the vanishing
    point during the build, light streaks rip through the fan slam, and the
    hold stands on a glowing perspective floor that surges on every beat.
    Transitions fire speed streaks from centre on the slam.
  - An IntroFX frame that throws is skipped, never frozen on screen.
  - **The wedge is alive** (`livingWedge` in DepthFX): a gradient flows
    through the accent triangle on a 5-step ramp of the accent (deep purple
    shade → accent → near-white highlight), at ~0.62 alpha so the halftone
    reads through. Tuning history (his notes, in order): "not too harsh" →
    "too subtle, more motion and contrast, keep the smooth blend" → "bands too
    narrow, make them flowy and wider, add a small dither". So now:
    - **Wide, flowing bands** (~0.85 cycles across the screen) moving outward
      from the vanishing point (5.2s), **warped by a slow wave** so they curve
      and sway, with the band axis itself swaying ±0.12rad; a cross-drift
      (11s) and a wandering light pool (slow Lissajous).
    - **Ordered 4×4 Bayer dither** between the ramp steps, in 3px cells, so
      blends resolve in small deliberate pixel steps — print/screen texture,
      intentional, never a smear.
    - Computed per pixel on a low-res CPU buffer, then scaled up unsmoothed:
      ~2ms at 1440×900, recomputed at 30fps and re-blitted between. No GPU
      readback, no per-frame gradient objects, never animate the wedge's own
      SVG fill. Menu only; follows the accent on selection.
  - **Every solid shape carries the same dither** (`DitherFX`, his ask: "give
    it some personality"). Plates, section bands, cards, BACK, collage tabs,
    quote, role ribbon, name banner, wedge tag and description plate each get
    a `canvas.dith` inside them (host `isolation:isolate`, canvas `z-index:-1`)
    so the host's own clip-path/skew/rotation shape it and type stays on top.
    Same field as the wedge — wide flowing bands, 4×4 Bayer, 3px cells (5px
    on the huge section bands) — each shape on its own phase. Two strengths:
    - **Colour shapes:** full ramp around their own colour, deep → highlight.
    - **Black shapes:** subtle sheen tinted 20% toward the current accent, so
      white copy stays fully legible. Don't push this one harder.
    Base colour is read live from the computed background (`.mItem` reads
    `--acc` when `.sel` so the dither flips on the cut, not after the 0.13s
    steps transition). `paintWedge` rewrites `textContent`, which drops the
    canvas — `attach()` re-inserts it; keep that if you touch either. Ticked
    from `DepthFX.draw` at 30fps, sine via a lookup table, and the menu shapes
    are skipped while a section covers them: ~1.2ms menu, ~1.4ms a section.
    To add a shape, add its selector to `SEL`.
  - **No SVG `url()` filter on anything that animates or is large.** The menu
    background used to run `#chromaSplit` live on a 172%-of-screen rotating
    layer: ~15M pixels re-filtered every frame, forever, starving every other
    animation. Now `BgRaster` rasterises the shard SVG once (during the intro's
    black-slate frames), bakes the channel split into a bitmap, removes the
    live SVG, and only the bitmap rotates (compositor-only). The 5s glitch beat
    is a redraw of that bitmap with wider offsets, skipped while a transition
    is running. The bitmap is sized to the window diagonal; it re-rasters if
    the window grows past that.
  - Section bands and the wedge use a red/cyan `drop-shadow` pair instead of
    the SVG filter — identical at the edge of a flat colour shape, GPU-cheap.
    They animate in right at the transition swap, which is where the old
    filter stuttered.
  - The SVG filter defs are deleted. The true channel split now lives only in
    canvas code (`IntroFX.composite`, `BgRaster.split`).
  - Intro paces on **rAF** (vsync) with a `setTimeout` watchdog for hidden
    tabs; the old pure-setTimeout clock judders against the display.
  - **Intro ASCII runs on the GPU** (`asciiGL`: a tiny WebGL pass reads the
    downsampled scene as a texture and picks glyphs in the shader). The old
    `getImageData` path stalled 10–22ms per band (64ms on the first) waiting
    for the GPU to finish the frame. After a few reads Chrome also demoted
    the tiny canvas to the CPU, turning every downsample into a full-screen
    readback. **Never read pixels back in the intro.** The 2D path survives
    only as a no-WebGL fallback. Worst intro frame is now ~1.7ms of JS. The
    downsample canvas must still not be `willReadFrequently`.
  - **The intro's opening draws every vsync** (the chained phase + the first
    7 frames after the snap, up to `SMOOTH`): smooth S-curves on a 24fps clock read as lag (his note). From
    the fan slam on, frames render only on a new 24fps frame, on 2s; that
    stepped look is deliberate and stays.
  - Transitions: one at a time (`TransFX.active()`), timers owned per run,
    canvas swallows input while up. A second transition used to get killed
    mid-retract by the first one's cleanup timer. The transition canvas is
    only reallocated when the window size changes.
  - Loading: Plex Mono is a non-blocking preload (a blocking third-party
    stylesheet held the page blank); the logo-font wait is capped at 250ms;
    the ABOUT portrait is stored grayscale+alpha (-21%, visually identical),
    `fetchpriority=low`, and sits on its own layer (`.cutWrap` will-change).
  - **The ABOUT sticker is baked** (`bakeCutout`): outline, red/cyan ghosts
    and drop shadow are drawn once into a canvas from the plain cutout, and
    the canvas replaces the `<img>`. As 11 stacked CSS drop-shadows it was
    rasterised at the moment ABOUT appeared — the transition's swap — and the
    transition froze for about a second (he reported this). Runs 560ms after
    `settle()`, with `openSection` forcing it as a backstop. The CSS filter on
    `#cutout` is only a fallback if the bake fails.
  - Return/Enter goes back from a section (with Esc and Backspace). It used
    to be ignored there, which looked like the page had frozen.
  - **History:** each open section is a history entry (`#about` etc.), so the
    browser Back/Forward buttons move between menu and section. UI back (BACK
    button, Esc, Return) goes through `goBack()`, which walks history so the
    two never disagree; `popstate` drives the screens. A reload on a hash
    starts clean on the intro.
  - **Timing runs on the frame clock** (`later(fn,ms)`: rAF poll + setTimeout
    fallback, first one wins) for the transition swap/cleanup and the menu
    cascade. Browsers ration setTimeout in background-treated tabs while rAF
    keeps running. A menu click during the cascade is queued (`pendingOpen`),
    not dropped.
  - **The Claude preview pane is not a valid playback surface.** It runs the
    page as a background tab and was measured at 1–2 fps at times, which looks
    exactly like stuck transitions. Judge motion in a real Chrome/Safari tab.
  - `?frame=N` scrub mode resumes on any click/key and strips itself from the
    URL — he once landed on a stale `?frame=16` via the Back button and was
    stuck on a frozen frame.
- **Older glitch:** clip-path slices and skew jumps live in the intro hit
  ONLY. The settled logo does a smooth 6s breathing glow (`logoBreathe`).

## The motion — this is the part that matters most

He is a motion person. Timing is the deliverable.

**The intro was rebuilt (Oct 2026) from his second reference set** — two
pop-art explosion title intros (an emblem burst and a "CRUMPLE" title card).
His brief: explosive composition, electric colour, pop-art comic textures
(halftone, print stripes, ASCII dithering), chromatic aberration, glitching,
background shapes expanding/shattering/morphing frame by frame, motion
aggressive and rhythmic. The earlier beat-for-beat recreation of his own logo
video is retired.

It is **one canvas** (`IntroFX`, `#introCv`), not DOM/SVG — per-frame shape
regeneration, real RGB channel splitting, slice glitches and ASCII dither
aren't practical any other way. Each frame: scene → RGB split (red and
green+blue channel buffers offset and added back) → horizontal glitch slices
→ ASCII bands.

**The cadence is the look:** a 24fps clock, and every shape re-rolls **on 2s**
(seeded RNG per 2-frame step, so a step holds identical across both frames).
That stepped timing is what reads as hand-drawn impact frames. Don't smooth it
into tweens.

| Frames (24fps) | Beat |
|---|---|
| 0–1 | Black slate |
| 2–27 | **Chained, in real 3D**: JATIN (an extruded slab) and the chains (flat pixel-piece plates) fly in out of depth, sway, and show parallax: each strap runs in front of the face on one side and behind the slab on the other. **Zero-g float to f22**: the chains hang slack in drifting S-curves (pinned at the word and at the frame corner) and the word turns lazily. **The yank, f22–23**: slack gone in a frame, then the thud, the word jolts square, RGB split spike, sparks where the anchors bite. **Strain f25.4–27**: squeeze, tremble, slices. Every vsync |
| 28 | **SNAP = the fan slam's crash frame.** White flash frame, shockwave, speed lines, impact bursts; every link flung in 3D (out of the centre, toward the lens, tumbling, with a dithered smear). **The name stays**: it takes the hit (punch scale, big split) while the slam crashes in around it. Camera jolt. Debris gone by ~.6s |
| 28–41 | **Fan slam** (no black gap, no build): the fills, yellow bolt wedge, cyan swoosh and speed streaks, with the name holding centre and re-rolling on 2s |
| 42–43 | Starburst whiteout (the name still drawn over it), then the field ignites |
| 44–65 | **Hold**: logo slammed centre (extrusion + 6 tinted ghosts) over a black crumpled star that re-shatters every step, on a green/magenta field. **Beat every 8 frames (180bpm)** at f48, f56, f64: scale punch + split spike + slices + an ASCII band |
| 66–71 | Crumple-out: logo squashes, star collapses, pixel-block datamosh |
| 72 | `END` → `toMenu()`; tail frames run under the transition, `IntroFX.stop()` removes the canvas behind its slam |

- **The opening is a set-up, not filler** (he rejected a version of random
  sparks on a HUD as "empty and random, no intention"). It is now the chained
  lock-up: the tension is the intention, and the snap is what unleashes the
  rest. The earlier neon-outline "build" that previewed the slam's geometry
  is GONE (his note, Oct 2026: after the break the name must not disappear,
  and it must continue straight into the chaos — the build left a black screen
  with lines). `CH`/`OFF` in `IntroFX`: the snap lands on the slam's original
  crash frame, so every beat keeps its original internal frame number, offset
  by `OFF`.
- **The chained opening is real 3D** (his notes, Oct 2026: "same chain break
  as the computer", then "it feels flat — make the chains and name 3D"). A
  small WebGL scene, no library: `init3` / `makeScene3` / `chain3D` /
  `debris3`, drawn into the scene canvas so the RGB split and slices still
  apply on top. Falls back to the flat 2D chain (`chainFrame`) without WebGL.
  - **World units are CSS px**, screen centre at the origin, +z toward the
    viewer, camera at `Fz = 1.45·H`. At z=0 one unit is one px, so the slab
    at rest lines up with the 2D logo the slam takes over with (face at z=0).
  - **JATIN is a slab**: 22 stacked silhouette layers for the thickness
    (alpha-tested, depth buffer sorts), dark purple → black ramp, three offset
    colour ghost planes behind, the white face on top with a dithered acid
    glint sweeping across. The face/side bitmaps come from `makeLogo`.
  - **The chains are two X straps round the word PLUS four anchors, one per
    corner, all bolted on and taut until the snap.** (He asked for the straps
    to stay: "i do like logo being chained up".) **The straps hug the slab and stay inside its silhouette** (tilt ±.2 rad,
    half-length .44·width: at ±.3 / .5 their turnaround lobes poked out past
    the J and N as horns — "why is there extra chain spiking up around the
    logo"). The anchors leave the word gently (slack ramps in over the first
    ~40% of the run) so there's no kink at the slab. The straps also sit
    just proud of the face and behind the back (`b = depth/2 + .32·pitch`); at
    `fs·.2` they bulged off the logo and he said they should be "closer to the
    logo model as it is stuck to the logo". Each anchor starts INSIDE the slab
    (at ±.3 of the word's width, ±.12·fs), so its first link is hidden in the
    letters, and runs on the straight line through the screen corner and out
    past it; all four mirror each other (the top-left once ended short of its
    corner). Link pitch is constant whatever the length and the chain always
    runs past its far end, so it never opens a gap at the word, even while the
    whole lock-up flies in from depth.
  - **CLICK ANY BUTTON** (his ask, Oct 2026: keep the float going until the
    user starts it, "click any button" blinking under the logo like a game).
    The live intro runs to the yank (f22) and WAITS there: the timeline clock
    stops, a separate float clock (`ffl`) keeps the chains and the word
    drifting. `#pressAny` (a DOM element under the word, in **VT323** — his
    reference was a crisp pixel face, "Click on" — with a hard ink drop, a
    SUBTLE hard-step blink — 1 ↔ .5 opacity every 1.5s, smallish type; at
    full on/off and bigger he asked for it smaller and subtler) appears once the word has landed (f8).
    Any pointer press or key (not bare modifiers / Tab) releases it: the
    timeline resumes AT the yank that instant, so the pull is the response to
    the press. Presses before the prompt shows are ignored. `?frame=N` is
    unaffected (scrub never waits past N≥22). Anything that scripts the live
    intro (snapshots, tests) has to press a key — `snap.mjs` does. There is
    no auto-timeout.
  - **Zero-g, then the yank** (his ask, Oct 2026: "the chains float like
    zero gravity, then suddenly and quickly tighten up, then the break"; the
    chained phase grew from 18 to 26 frames, `CH=28`, so the float can be
    read). Slack is a path, not a pose: each anchor is the taut line plus
    drifting S-curves (`G.slack`, `G.fr` in `links3`), zero at the word and
    at the frame corner, links walked along the curve at constant pitch. The
    slack drops `(1-yk)^1.5` over 1 frame at `Y0 = CH-6`; the word's float
    (yaw/pitch/roll/bob) is cut at the same moment, so the jolt is the beat.
    A softer, slower tighten loses it. His second note: the float was "too
    flowy" and should be SLOW — gentle curves (amplitude .06·length, waves at
    ~.8 rad/s), slow drift — so the contrast with the pull is the beat. **The
    pull has weight**: once fully taut the lock-up rings — a damped THUD
    (`th`, ~10Hz, gone in ~4 frames) on camera jolt, yaw, roll, scale pop and
    a push back in z, with an RGB spike on each swing — then the strain
    tremble builds to the snap.
  - **Link SHAPE is the 2D sprite first** (his order: shape, then texture).
    A flat plate, not a tube: the ring is the stadium 15×7 cells with a 9×3
    hole (`stad(.364,.318)` / `stad(.273,.136)`), the bar is the same plate
    seen edge-on (15×3), pitch 11 cells. Rings are turned to face the lens as
    squarely as the chain's direction allows (`links3`), bars are edge-on
    between them; a diagonal run otherwise shows every ring edge-on and the
    chain reads as rope. The red band on the left of each ring at the snap is
    the intro's own RGB split, not part of the link.
  - **Texture: Bayer dither, not halftone** (same colours). The face
    gradient steps across the link in ordered-Bayer cells; the 2D chains'
    fine ink dots are NOT used here. The chain layer renders into a
    small corner of the canvas, one texel per sprite cell, and is blown up
    unsmoothed (`blitChains`): the stepped pixel-piece silhouette. Faces are
    flat gradients across each link (rings acid→green, bars cyan→deep), a thick
    black ink rule, then the red/cyan fringe laid over it in 2D. No smooth lighting (an earlier toon + Bayer shaded
    version read as a different chain). The slab is drawn depth-only into the
    chain pass so chains pass behind it.
  - **Debris** uses the same meshes: each link keeps its place at the break
    pose and is flung out of the centre + toward the lens, tumbling about its
    own axis, under gravity, fading by dithered discard (not blending), with
    one trailing smear pass. Precomputed at the break pose, so every frame is a
    pure function of time and `?frame=N` scrubs it.
  - Straps wider or a third horizontal band bury the name — keep to the X of two.
- **`?frame=N`** freezes the intro on frame N — scrub it like a timeline.
  Use it to check any beat; the live intro is too fast to judge by eye.
- The clock is rAF with a `setTimeout` watchdog, and frames are derived from
  elapsed time: rAF stalls in a hidden/throttled tab and the menu would never
  arrive. A throttled tab drops frames but still lands on time.
- The wordmark is pre-rendered once in Cyberway Riders (main face + ghost
  tints) so frames only blit. `start()` waits up to 800ms for the font.
- Intro motion stays in the intro. **The menu does NOT re-roll** — he cut idle
  flicker twice. The menu field carries the references' *look* instead:
  stripe/hatch print fills on ~45% of colour shards (never the black wedges),
  wireframe scribbles and pixel stickers (`addFurniture`), all static and
  turning with the slow `bgSpin`.
- Strobing/whiteout content: `prefers-reduced-motion` skips the intro.

## Layout rules

- **The wordmark holds center through the whole intro** and slams there. It
  only relocates at the intro→menu handoff, and only *behind the transition slam*
  as an instant cut — never a visible tween, never drift. (This supersedes the
  older "never moves" rule: he asked for a dedicated menu screen, so the name
  docks to the top-left as a corner mark once the menu owns the screen. Do not
  animate that move; the transition must cover it.)
- **The menu is a Persona-5-Royal system menu** (his explicit ask, with his
  palette as the twist — accents instead of P5's red):
  - **Four plates in a diagonal staircase** (his sketch, Oct 2026): each
    plate bleeds off the left screen edge, each one down is `--step` shorter,
    and its right end is cut on a `--slant` matched to the step, so the cuts
    line up into ONE continuous diagonal down the stack. Solid near-black,
    white display type, small accent number. The step is capped by CONTACT —
    the longest label sits on the narrowest plate — so it's shallower than
    his sketch; steepen it only if the bottom word still fits
    (`scrollWidth - clientWidth` on each plate must stay 0). The old
    lightning-notched left edge is gone (it would be off-screen). **No sub-label inside the
    plate** — it was redundant with the wedge tag and its right-alignment was
    forcing the plates wide; removing it is what freed room for the heading.
  - **Selected plate floods with its accent color**, type flips to ink, and it
    scales up 1.09 from its LEFT edge (transform-origin left — it pushes out
    to the right, never pulls the off-screen edge into view) with a black
    drop. Hard `steps(1)` colour cuts, no fades.
  - **Chromatic aberration burst on every selection change** (`chromaBurst`):
    red/cyan channels rip ~13px apart and collapse back in 0.4s, on both the
    plate silhouette and the giant wedge word. It's a one-shot per change —
    `filter` must land on the resting drop-shadow so nothing lingers split.
    This is the *only* sanctioned glitch motion; it fires on input, never idle.
  - **The giant wedge is the signature.** A huge left-pointing triangle
    (`#wedgeTri`) in the selected item's accent + halftone fills the right of
    the screen, with that item's name slammed across it in enormous type
    (`#wedgeWord`), a sub-tag, and a one-line **description** per item
    (`data-desc` on each `.mItem`) — heading, tag and copy live together in
    `#wedgeText` so the block scales as one. It **re-slams on every selection
    change** (smear → overshoot → settle).
  - **The heading clears only the plates level with it** (a 25–67% height
    band) — with the staircase, the long top plate sits above the heading,
    so clearing the widest plate would waste the wedge. A selected plate's
    right edge is `left + 1.105 × width` (1.09 scale + 1.5% shift).
  - **The heading is measured and fitted, not guessed** (`fitWedge()`). It
    measures the word at a 100px reference and solves for the size that fills
    the gap between the selected plate and the screen edge, then does a
    corrective pass on the real painted box. Per-glyph divisors were tried and
    binned — they can't adapt to viewport or word length, and they left half
    the wedge empty on wide screens. He asked twice for this to fill the
    space; keep it measured.
  - **Never call `getBoundingClientRect()` inside `fitWedge()`.** `wordSlam`
    starts at `scaleX(1.7)`, so a rect read while any slam is in flight comes
    back ~70% too wide and collapses the heading to the floor size — rapid
    arrow-key navigation reproduced it every time. The fit uses `scrollWidth`
    and `offsetHeight` only (layout metrics, transform-independent) and
    predicts the painted width as `textWidth + WEDGE_SKEW × height`. Keep it
    that way. (This also applies to any debugging you do: finish the
    animations first or your measurements will lie.)
  - `scrollWidth` on a full-width block returns the **container** width, not
    the text — `#wedgeWord` needs `width:max-content` or the fit under-sizes.
  - **Paint the wedge before it is ever shown.** `paintWedge(item)` sets
    accent + heading + tag + copy + size with no slam, and `cascadeMenu()`
    runs it for item 0 up front. `select(0)` is ~670ms behind the reveal, so
    without this the wedge sits on the CSS accent fallback for most of a
    second — it showed as acid yellow before flipping to cyan, on both first
    load and back-from-section. The CSS fallbacks are also pointed at item
    0's cyan, not acid; if the first menu item ever changes, move them too.
  - **`#wedgeText` is hidden until `fitWedge()` has run** (`.fitted`), and
    the handoff sizes it on adding `body.menu`, behind the transition slam. Without both, the heading paints at the CSS fallback size and
    visibly pops a moment later — he reported exactly that. There's also a
    re-fit on `document.fonts.ready`, because measuring before Cyberway
    Riders lands uses fallback metrics.
  - Long labels come out smaller than short ones — that's filling the same
    box, and it's what P5R does too. `fitWedge()` no-ops below 760px; mobile
    keeps its own CSS sizing.
  - **The wedge narrows to a point at mid-height on its left edge**, so
    anything below centre needs to sit further right or it falls off the
    accent onto raw shards. That's why `#wedgeText` rides above centre
    (`--wtop:46%`).
  - **Tag and description are one block, offset right** — both at
    `margin-left:34%` so their left edges line up, sitting together under the
    right of the heading and filling the ground that was empty there. Keep
    them matched; he asked for the tag to move over to join the copy. They go
    flush-left again on mobile. `#wedgeText` uses `right:0` (not a fixed
    width) so those percentages resolve against the real available space.
  - P5 stars pop on each selection change; everything recolors to the accent.
- Per-item accent: ABOUT cyan, PROJECTS pink, SKILLS green, CONTACT acid.
  Order is the section order, top to bottom. **EXPERIENCE was removed** (his
  call, Oct 2026) — menu item, section, accent and world entry all gone;
  numbering is 01–04.
- **Class handoff (`.in` → `.done`) is driven by a timer, not `animationend`.**
  The event doesn't fire reliably when the tab is throttled, and a stuck `.in`
  pins the selected plate's transform. Same rule as the old opacity bug:
  visibility lives on classes, never inline.
- Sections open **over** the landing, with a slammed-in wonky header and
  staggered cards.
- **Every section wears its menu item's colour and the menu's layout** (his
  ask: continuity and balance). `#sec-*` set `--acc` to the item's accent
  (ABOUT cyan, PROJECTS pink, SKILLS green, CONTACT acid), and everything
  "accent" inside reads `var(--acc)`: card titles, bullets, meta tags, chips,
  scrollbar, BACK, and the ABOUT poster details (title's small word, bubble
  highlight, name letters, banner glow, stars, the baked sticker rim). The
  old two clashing colour bands per section are gone: `.secWedge > .secBand`
  is the menu's triangle, the same geometry as `#wedge` (right-anchored 64vw,
  polygon 0,45 / 100,-22 / 100,162), the same accent and the same dither. It
  sits exactly where the menu's triangle was, so it carries straight through
  the transition. The wrapper carries the red/cyan edge, because a filter on
  the clipped element would be clipped away.
  - Accent text on the accent triangle vanishes. The title's small word drops
    the glitch split (cyan on a cyan fringe smeared), and the copy's
    highlight is an accent marker strip with ink text, not accent text.
  - PROJECTS / SKILLS / CONTACT also carry the menu chain (see Chains).
- **Every screen change is `TransFX`** (`doTransition(mid)`): the intro's
  opening in miniature, on a canvas (`#transCv`, z60). It replaced a sliding
  colour-band wipe ("just a slide"), then a shatter version he rejected in
  favour of **matching outlines, more impact, shorter**. It's symmetric —
  shapes leave the way they came:
  - **0–190ms trace**: neon outlines whip in along their own axis, staggered,
    on the intro's S-curve; the outgoing screen dims behind.
  - **190–214ms flash**: one white impact frame, black plate outlines.
  - **214–240ms slam**: fills land oversized (1.14) and snap to rest with a
    wide RGB split. Fully opaque; `mid` (the swap) fires at **240ms**.
  - **240–520ms retract**: fills drain off downstream (t², moving from frame
    one), reverse stagger; each outline holds a beat behind its fill, then
    un-draws from its tail.
  - Plates are 1.5× the screen diagonal, so the retract must travel ~.95 of
    their length to clear the frame — less, and they pop off instead.
  - Plates tile with 3px overlap (no seams). Draw rides rAF; `mid`/cleanup
    ride `setTimeout`. `TransFX.peek(ms)` freezes it for checking. Reduced
    motion skips it.
- **ABOUT is a "Have you seen this DIRECTOR?" poster** (`.collage`, Oct 2026;
  concept: `docs/concepts/2026-10-26-about-poster/`). Rebuilt from his
  reference ("Have you seen this MAN?"), replacing the earlier KREFTON P5
  collage (stills: `2026-10-26-about-p5-kreften`). His brief: copy the **text
  placement, scale ramp and perspective**, in his language, with his new
  night photo. The composition IS the design; don't reflow it into a grid:
  - **Two banners** frame the portrait: `.cgTop` is a pink wedge (thin at the
    left, tall at the right) and `.cgBot` a purple one rising to the right.
    Kinked edges (a notch each), ink drop, white rule, `DitherFX` inside.
  - **No text on the banners — final** (his call, Oct 27, and he reversed it
    twice: HAVE-YOU-SEEN ramp → name-only ramp in Anton with a printed dot
    screen → cut all text → brought the name back → "Remove text i changed
    mind"). Treat it as settled: the bars are shorter, pushed toward the screen
    edges (top 31vh at `top:-8vh`, bottom 27vh at `bottom:-7vh`; phone 22vh / 15vh at -5vh) and carry only the chains.
    The name-ramp code (per-letter height = bar height at its x, Anton, skewed
    along the edge, slide-right fit) is not in the page; the look is in stills
    `2026-10-27-about-name-*` if he ever wants it back.
  - **The portrait's glow is a dither that flows outward** (`CutGlow`, his ask,
    Oct 27: "a dither animation going outwards for that glow"). `bakeCutout`
    keeps only a crisp cyan/pale rim; the wide glow is a second canvas behind
    the portrait: a chamfer distance field from the silhouette (built once,
    4 baked px per cell), bands travelling away from the figure, 4×4 Bayer
    between a 5-step ramp (deep purple → magenta → hot pink → cyan → pale),
    ink dots thinning to nothing at the far edge. ~30fps on a 333×358 buffer
    scaled up unsmoothed; loop runs only while ABOUT is open (`CutGlow.start`
    from `openSection`), static frame under reduced motion. Cyan is kept to the
    inner third so pink stays the wide colour. It sits in its own `.glowWrap` twin of `.cutWrap` at z3: above the wedge and streaks, under the bubble, tags, sparks and bars (his note: it clashed on top). Soft by his note: 3px cells, alpha 170, slow wide bands. Stills `2026-10-27-about-dither-glow`.
  - **Portrait** (the new photo, `jatin-cutout.png`: `docs/tools/cutout.swift`
    → `docs/tools/grade.swift`, B&W with lifted shadows, γ.78) sits right of
    centre (`--ph:min(88vh,74vw)`, head ≈56% across, bottom −5vh). **His right
    arm is cut by the photo's edge, so the cut must stay hidden behind the
    bottom banner** — if you move/scale the portrait, check that. Accent rim
    is baked by `bakeCutout` in `--acc`.
  - Speech bubble left (`.cgBubble`) with the studio paragraph, behind the
    portrait (z4 < z5); tags JATIN and DIRECT · SHOOT · CUT; three acid
    sparkles (`.spark-a/b/c` — a sits BELOW the bubble, never over its copy);
    credit bottom-left, BACK bottom-right (z10). ABOUT chains still slam in
    (`ChainFX.slam`) but run behind the portrait into the bottom banner.
  - Small type (`.hey`, `.sm`) uses a 1px glitch split — the 4px split
    doubled the letterforms.
  - Phone (<760px): headline stacks (lead-in / HAVE YOU SEEN THIS / big
    DIRECTOR?), bubble above the portrait, BACK shrinks so the punchline
    clears it (punchline 8vw).
  - Audited at 1440×900, 1440×700, 1280×800, 375×812. `snap.mjs` takes
    `SNAP_W`/`SNAP_H` for odd sizes; the label must be lower-case-with-dashes
    (no `1440x700`).
- **Pixel-piece chains** (`ChainFX`, his ask from the same poster): chains
  built from the site's own pixel "puzzle pieces" (the stepped stickers on the
  background field) instead of real chain links. Each link is a stepped pixel
  ring/bar sprite: gradient face (acid→green rings, cyan→deep bars — the two
  gradients from his logo video), a tonal ink screen at the halftone angle,
  black ink rule, red/cyan split fringe. **The screen is printed INTO the face
  and tonal**: clipped to the link's own cells (never on the rule or the
  fringe), pitch .42 cell, dots swelling toward the shaded end and nearly gone
  in the highlight. His note: the old uniform 50% dots at .85 cell, laid over
  the fringe too, "look too much like an overlay rather than a texture, and
  a bit too big". Face-on rings alternate with edge-on bars,
  drawn in chain order so every bar crosses over one ring wall and under the
  next — a real interlock without masking. Sprites are built once per size.
  - **Menu: one endless chain on HIS drawn path** (`ChainFX.menu`, from his
    second red-line sketch, Oct 2026). Origin: tucked under the accent
    triangle, low on its LOWER-left edge. It comes out heading left, loops up
    behind the plates, over the top of the wedge, round the right side and
    down under the description box, crosses in front of its own start, and
    sweeps toward the viewer off the bottom-left. **It grows from small/far
    to huge/near the whole way.** That perspective is the point. Links scroll
    along it endlessly (~1.15 links/s, surging on a menu move); link spacing
    grows with link size so it stays locked.
    - History: a slow inward spiral that faded links in and out was rejected
      ("slowly come out transparency"). A flat ring round the wedge came
      next. Then a traced-point version of his first sketch, which he called
      **crooked**: wobbles and corners from tracing, and it started on the
      wrong (upper) edge.
    - **The curve is a Hermite spline through six key points with explicit
      tangents** (`MKEYS`, in his sketch's 1674×1952 pixels), so every joint
      is smooth. Don't go back to traced points.
    - **Nothing fades.** The triangle hides the start: the origin is snapped
      just inside its lower edge, and links near the start are clipped to
      outside it. The frame edge takes the end: the path runs one screen
      past it.
    - y scales with height. x hangs off the RIGHT edge and stretches by the
      geometric mean of the two ratios, so on 16:10 the loop stays round
      instead of flattening into an oval, and still reaches behind the plates.
    - Own canvas `#chainCv` at z19: above the black plate panel (z18, which
      would swallow the near end), below wedge copy (z20), plates (z22) and
      hint (z24). Drawn from the DepthFX loop, menu only.
    - Sprites are built at 8px cells and scaled down, so the near links stay
      crisp at ~3× size.
    - **It recolours with the selection, on the same hard cut as the
      triangle** (`ChainFX.accent`, called from `paintWedge`). Rings run
      highlight→accent and bars run accent→deep shade, the triangle's own
      ramp. The ink rule and red/cyan fringe keep it separate from the
      same-coloured wedge. Sprites are cached per palette.
    - **The chain follows into PROJECTS / SKILLS / CONTACT**: same path, same
      triangle, that section's accent. `#chainCv` is moved into the open
      section (`.inSection`, z4, right after `.secWedge`, so the heading,
      cards and BACK paint over it) and back to the body for the menu. ABOUT
      has its poster chains instead, drawn in its accent.
  - **ABOUT: appears aggressively, then static.** `.cgChains` canvas (z7,
    under the banner) draws two chains running from off-frame into the
    banner. On entry (`ChainFX.slam`, 480ms in, landing with the banner) they
    whip in along their own length in three hard steps on 2s (83ms): whip,
    overshoot, lock, each with a wide RGB split collapsing to none. Then they
    **keep scrolling** (his ask: passive scrolling throughout, same
    position) — links run in from the frame edge and vanish under the
    banner, ~0.9 links/s. The scroll offset wraps at two links so ring/bar
    parity never flips. The loop stops itself when ABOUT closes. Reduced
    motion draws them static.
- **PROJECTS has a 3D retro computer** (`MonitorFX`, `.pcCv`). He gave a
  rendered reference: a stylised vintage monitor with a soft rounded beige
  plastic shell and a deep bezel, resting on a flat desktop base station
  with two knobs. This is step 1. **Step 2 (next):** it zooms into the
  screen, which becomes a small custom OS with folders Flux Magazine 1, 2
  and 3, Outstation, and BTN.
  - **No library.** One WebGL fragment shader raymarches a signed-distance
    model; three.js would break the one-file, no-dependency rule. SDF rounded
    boxes ARE moulded plastic, and it gives real soft shadows + AO.
  - Model (object units, y up, +z to the viewer), after his first notes
    ("edges too rounded", "sides should align with the base", "knobs are
    pointy — the reference's are flat-topped cylinders, like buttons"):
    - shell = **two mouldings** (his side-profile reference): a front
      frame (z .08–.5, half .62×.52, r .06, flush with the base's sides) and
      a slightly narrower rear housing (half-width .59) whose **top slopes
      down toward the back**. It now reads as a computer, not a box.
    - **hooded bezel**: the front face leans back toward the bottom (about
      .07 over the height), so the top border overhangs the glass like a
      hood and the bottom border sits further in. Borders thin (≈.04 sides,
      ≈.05 top/bottom). The **glass sits forward** at z .37 (it used to sit
      deep at .33 behind a thick border). Glass half-size .575×.465; the
      screen maps 1.15 × .93 units.
      **The glass bulges out .08** (a domed tube; .045 read too flat to
      him), and the image's barrel bend (.14) matches it. Keep it
      moderate. He asked for "a little curved, not too heavy".
    - the panel seam is gone (the frame/housing step does that job); the
      bolts sit on the frame at z .27;
    - stickers moved onto the rear housing's flat side (FLUX above, BTN
      below, z −.45 … .05) so they never straddle the step;
    - recess: shallow (glass forward), r .045, crisp .012 lip; vent slots on the frame's left side;
    - glass: bulged, at the bottom of the recess;
    - base: **same .62 half-width as the monitor and flush with its back**,
      juts out only at the front, r .02, with grooved front panels and NO
      label (he cut "Beyond the Noise Studio");
    - knobs: two short flat-faced cylinders (r .052, softened rim), barely
      proud of the panel;
    - **base detail, from his "too plain" reference** (a beige PC front):
      a grid of vertical vent slots in two rows at the left of the front; a
      green power LED beside them (material 7, emissive); a recessed drive
      bay in the middle with two charcoal floppy-drive fronts (material 6),
      each with a disk slot and a beige eject; the knobs at right; and a row
      of vertical vent slots along both sides of the base. The old flat
      panel-divider grooves are gone; the top seam stays.
    - stickers on the outer left side only (`q.x<-.5`; without that check
      they printed onto the bezel's inner wall too): **FLUX in cyan** (high
      and back) and **BTN + pink star** (low and forward). He likes both;
      keep them.
    - **Decals: sample unconditionally, mask after.** Sampling the atlas only
      inside each sticker's rect made the UVs jump at the rect border. The
      mip selection blew up there and drew a faint dashed box around the
      stickers (he spotted it). Smooth UVs everywhere on the side, then
      multiply by the rect mask. The atlas also keeps a clear gutter
      (screen ends at y=736) so coarse mips can't bleed the screen's black
      into the sticker regions. Same rule for any future decal.
      That alone did NOT fix it on his machine. The real fix: **stickers
      have their own texture (`uStk`, linear, NO mipmaps)**, cut from the
      atlas's bottom quarter. No mip levels means nothing can smear the
      region edges. Keep decals off the mipmapped screen texture.
  - **Look: his cinematic lighting reference** (a close-up of a pale monitor
    under cool light), which supersedes the print-styled first pass:
    - beige `(.86,.78,.64)` albedo kept, so it stays beige, under a cool
      key from the upper left;
    - a blue-teal sky fill, so shadows go cool and deep, with a
      harder-than-wrap terminator for contrast;
    - a glossy spec plus a broad sheen, and a strong cool fresnel rim so
      every bevel catches a bright edge (that's the reference's signature);
    - the screen's glow spilling onto the bezel;
    - dull-metal side bolts;
    - an ACES-style filmic tone curve and a fine static grain.
    - The halftone dots and ink silhouette are REMOVED from the model. Its
      edge fringe is now a CSS red/cyan drop-shadow pair on `.pcCv`, the
      same treatment as the wedge.
    - Two bolts per side near the front (on the frame). The glass carries a
      faint pixel mesh (210×160) that shows in the dark, as in the
      reference.
    - Contact shadow on a transparent canvas, as before.
  - **CRT glass, balanced** (his ask: not too heavy, not too subtle). All
    static, no flicker:
    - barrel-bent image (.14, matched to the .08 glass bulge);
    - red/blue fringing that grows toward the edges;
    - a 4-tap phosphor bloom (.35);
    - soft scanlines (140 across, 30% depth);
    - a faint aperture-grille mask;
    - a corner vignette and a lifted, centre-weighted black (a lit tube is
      never pure black);
    - one soft diagonal glare;
    - fresnel and a key-light spec on top.
  - Screen and stickers come from ONE 2D-canvas atlas uploaded as a
    mipmapped texture: the screen is the top 3/4, FLUX bottom-left and BTN
    bottom-right.
    Redrawn on `document.fonts.ready`. The OS UI goes in here for step 2.
    Keep screen content inside the bezel's safe area (≈90px inset); the
    texture's edges sit under the lip.
  - Motion: on entry it rises out of the floor with ONE fast decelerating
    turn (950ms, ease-out quart), landing at the reference's three-quarter
    view onto its LEFT side (yaw +.5). After that it moves only with the
    pointer (parallax ±.5 yaw / ±.18 pitch, eased). It redraws only when
    something moved, and the loop stops itself when PROJECTS closes.
  - **Framing is in JS, not CSS**: `.pcCv` covers the whole section, and the
    shader takes `uCtr` (where the computer sits), `uS` (how big) and
    `uRo/uTa` (camera). `rest()` places it right of the heading: the box
    starts at `6vw + 5 × heading font-size`, the model fits the shorter side
    (`min(w×1.08, h×1.15)`), and on phones it takes the band below the
    heading. That's what lets the click dolly carry it to page centre.
- **PROJECTS step 2: screen intro → CLICK ME!! → dolly → JATIN OS.**
  - **Screen intro** (`drawScreen`), in **JATINSPACE's own UI language**
    (his ask: the screen should match the OS, and the first monochrome
    version was too slow). 30fps, about 0.7s, starting the moment the
    computer lands. Frame map:
    - 0 black;
    - 1–4 palette outlines (pink / acid / cyan / magenta) draw on;
    - 5–8 shards slam in with Bayer-dithered palette fills (canvas patterns
      from `ditherCanvas`) and a black star;
    - 9 white flash; 10 pink negative;
    - 11–17 the JATINSPACE wordmark slams (JATIN paper, SPACE pink, pink and
      cyan ghosts) with a punch and slice glitch at 15;
    - 18–20 crumple into palette pixel blocks;
    - 21+ the **idle screen = the OS chrome**: LAST UPDATED strip, the
      JATINSPACE header, the link row, the HOW TO USE bar, and a BIG,
      heavy pink old-web **CLICK ME!!** button (660×196 on the 1024 screen;
      the type is stroked in its own ink to read bolder) with a paper drop
      shadow, the pixel hand cursor, and "▸ enter JATINSPACE" with a
      blinking caret. The teaser folders under it were cut (his note).
    - **Loading**: the same chrome with a chunky pink dithered bar that
      fills step by step WITH the dolly.
    - Canvas text never triggers a webfont load, so `init` asks for VT323
      and Cyberway explicitly, then repaints.
    `MonitorFX.peek(n)` freezes frame n (21+ = the click screen).
  - **PERF rules (he reported the loading and animations as laggy).** The
    canvas covers the whole section, so:
    - rays that miss the computer's bounding box never march (most pixels
      are empty);
    - the floor contact shadow is only shadow-marched near the base (it
      used to run a 40-step march on every lower-half pixel);
    - loops: 90 main steps, 26 shadow, 4 AO taps;
    - the entrance spin and the dolly render at 55% resolution (`heavy`);
      the settled frame re-renders crisp;
    - the CSS edge fringe on `.pcCv` applies only `.still`, never while
      it's moving;
    - the OS animates **only transform and opacity**: no animated `filter`
      (it re-rasterised the folder every frame), and the power-on uses a
      flash layer instead of `filter:brightness` on the whole OS. The hero
      has `will-change` so browse and dive run on the compositor.
  - **It arrives CHAINED UP, then breaks out** (his ask). Three loops of
    our pixel-piece chain in PROJECTS' accent wrap the computer: a band round
    the body and two diagonals crossing in an X over the screen and under
    the base.
    - The loops are rounded superellipses defined in the MODEL's space
      (`LOOPS`), so they spin and rise with it.
    - Each link is projected with the shader's own camera (`project`); links
      nearer than the model's centre draw on a canvas in front of the 3D
      canvas, the rest on one behind (`.pcChain`), so it reads as wrapped,
      not pasted on.
    - On landing: a 70ms strain (the loops squeeze to 90% with a jitter),
      then SNAP. He asked for it "more aggressive, with motion and a flash":
      - a full-page white flash frame (~70ms) burning off;
      - a shockwave ring blasting out of the computer (white core,
        pink/cyan edges, ~280ms) and 28 speed lines tearing outward;
      - white impact bursts at the break points;
      - links flying at 1700–4100 px/s, spinning hard, growing as they rush
        the camera, with 3-ghost motion smears and a red/cyan split;
      - a 240ms shake on the computer and chain canvases with a 6% scale
        punch from the computer's own centre.
      All gone by ~600ms.
      The screen intro boots right after (t0 + 1.21s); clicks unlock at 1.1s.
    - Links are drawn with `ChainFX.drawLink` (sprites at 8px cells); the
      pitch is .13 model units.
    - `MonitorFX.hold(ms)` freezes the whole entrance ms after it starts
      (e.g. 600 = wrapped mid-spin, 1060 = the snap, 1300 = mid-explosion);
      `hold(null)` releases it.
    - Reduced motion skips the chains.
  - **Click = the computer.** The canvas takes clicks; the hit test redraws
    the current pose and reads the one pixel under the pointer (alpha > 200),
    so only the model is clickable (cursor turns to a pointer over it).
    Return also opens it on PROJECTS.
  - **Dolly** (620ms, in-out cubic): the camera eases in, yaw/pitch/lift go
    to zero (it squares up to you), and the framing centre moves to page
    centre.
  - **JATIN OS fills the glass, and the glass fills the page, with the
    bezel kept.** He wanted it immersive AND still to feel like a computer.
    `zoomPose` sizes the glass to about 96% of the page (contain, not
    cover), so the hood, the borders and the base stay in frame around it.
    The OS (`.pcOS`) is a real DOM layer placed exactly on the glass:
    `placeOS` projects the glass corners with the shader's camera maths,
    radius ≈ the glass corners. It powers on like a tube (a line opening
    into the picture plus a white flash layer). While it's up, BACK hides
    (`#sec-projects.osOpen`) and the header's **[X] EXIT** takes over. Type
    scales with the glass (2.4% of its height).
    - **Chrome he kept** from the old-web pass: pink LAST UPDATED strip +
      clock, black JATINSPACE header (DAILY CUT, colour squares, EXIT), grey
      link row (FLUX | BTN | OUTSTATION, current one inverted) with a
      breadcrumb path and a search box (typing jumps to the first match),
      and the grey [ HOW TO USE ] bar at the bottom (its text follows the
      view).
    - **The folder system, from his reference video, re-cut digital**:
      - ONE hero folder centre stage, seen at an angle: a back panel with a
        tab, two ruled paper pages peeking, a front flap, and a dark spine
        down the right. A square label sticker sits above it
        (FLUX / MAGAZINE, BTN / STUDIO, OUTSTATION / FIELD WORK) and a
        "01 / 03" count below.
      - The other folders are scattered behind at three depths. **Depth is
        pixelation, not blur**: far ones are tiny dithered bitmaps scaled up
        with `image-rendering: pixelated`.
      - Browse with ← / →, the side arrows, the wheel or a swipe. The hero
        slides out quickly and the next one slams in with a little
        overshoot; the background shifts and the stage re-tints to the
        folder's colour. **Smooth eases, not `steps()`**: he read the
        stepped motion as lag.
      - Open (click, Return, or a nav link): the flap swings, the pages
        rise, then the camera **dives** into the folder (scale 2.6 + fade,
        240ms) and the contents arrive as a grid of tiles that pop in one by
        one.
        FLUX holds Flux Magazine 01/02/03 as numbered dithered covers; BTN
        and Outstation show a grey [ EMPTY ] box. Esc surfaces back out.
      - **Every gradient is the site's 4×4 Bayer dither**, generated on a
        canvas once per colour and size (`dither()`, cached data URLs)
        instead of the reference's film grain. Hero ≈ 3px cells like the
        site; distant folders deliberately coarser.
      - Folder ramps: FLUX pale pink → pink → purple, OUTSTATION pale cyan →
        cyan → blue (swapped Oct 30), BTN (off) pale acid → acid → green.
    - Keys: on the stage ← / → browse, Return opens, Esc exits the OS;
      inside a folder the arrows move between tiles and Esc goes back;
      typing in search never triggers OS keys (Esc blurs it).
  - **Fullscreen (Oct 30, his ask: "easier for people to view my work"):**
    the tube powers on on the glass, then grows off it to fill the page
    (`full()`, a FLIP: transform only). EXIT shrinks it back onto the glass
    before the power-off. This supersedes "glass ≈96% with the bezel kept"
    for the OS itself; the dolly is unchanged.
  - **His photos** (concept `docs/concepts/2026-10-30-os-gallery/`):
    - FLUX → three magazine covers → photo grid; OUTSTATION → photo grid.
      BTN is switched off (`off:true` in `FOLDERS`, his call Oct 30) until he
      has material; the CRT intro's nav row lists only FLUX | OUTSTATION.
      Colours swapped by his call: FLUX is the pink ramp, OUTSTATION the cyan
      (the monitor's FLUX side sticker stays cyan). A cover is chosen per magazine with
      `cover:N` in `FOLDERS`, numbered as the viewer counts. He picked photo
      03 (the sunglasses close-up) for Magazine 02. Covers are tall 2:3
      posters (his sketch): container-unit sized, as tall as the stage allows
      and as wide as `--n` fit; two a row on phones.
    - Files are `site/work/<set>/NN.jpg` (2000px), `NN-t.jpg` (640w thumb)
      and `NN-z.jpg` (3000px, fetched on first zoom).
    - All of it comes from `node docs/tools/photos.mjs "<his BEST folder>"`:
      sRGB conversion, no EXIF/GPS, lower-case names. It also rewrites the
      `PHOTOS` block in the page. Never hand-edit that block or drop files in
      by hand.
    - In the grid, landscapes span two columns. Rows are a fixed 2:3 of the
      column width (`grid-auto-rows` from container units, `--n` columns per
      container query) and tiles fill their cell absolutely. **Never size a
      tile with `height:100%` / `aspect-ratio` against a content-sized row:**
      Chrome forgives it, Safari collapses every tile to its 2px border
      (his friend saw "dots" on the live site, Oct 30). Check layout changes
      in Safari, not only in Chrome.
    - The viewer:
      - shows the thumb instantly, fades the full photo over it, and prefetches
        the neighbours;
      - zooms with wheel or pinch at the pointer, pans by drag, and flips
        fit ↔ 250% on a double-click or double-tap;
      - drops the tube's scanlines so the work shows clean.
    - Esc goes up one level at a time.
    - **BACK** (`.osBack`, top-left of the stage — his marked spot) does the
      same as Esc, one level per press; dimmed on the folder stage. The header's
      **[X] EXIT** leaves the computer from any depth.
  - **Tests:** `tests/check.mjs` covers every photo file (case, EXIF, budgets,
    live copy current). `tests/load.mjs` runs real Chrome throttled to 4G and
    slow 4G over every grid and photo, plus zoom/drag, fullscreen and phone.
    `tests/browsers/run.mjs` (Playwright, dev-only) walks it on Chromium,
    WebKit and Firefox across 14 desktop/phone/tablet configs; run it before
    any deploy that touches layout. Focus tiles with `focusTile()`, never a
    bare `focus()`: that scrolls the section under the fullscreen OS.
- Full keyboard nav, like a game: arrows to move, Enter to select, Esc to back.

## Apply mode + REVERT MAIN (2026-10-30)

For a Vogue application he asked for the intro to go **straight to PROJECTS**,
without deleting the menu site. `const APPLY=true` (just above `toMenu()`)
routes the handoff to `landOnProjects()`. In apply mode the menu, BACK and
back-navigation are off. Set it to `false` and the full site is back as built.

**"REVERT MAIN"** — his words: "When i Say "REVERT MAIN" i want you to reset
the website to it's current stage so i can continue my work in the future".
Restore `site/` from `.local/revert-main/` or local tag
`revert-main-2026-10-30`. Diff first if `site/` changed after 10-30.

## Technical state

Single self-contained `site/index.html` (shipped with `site/jatin-cutout.png` — `site/` is the deploy folder, nothing else goes live). No build step, no dependencies, no
framework. Vanilla HTML/CSS/JS; shards are procedurally generated SVG
(regenerate randomly on every load); Cyberway Riders is embedded as base64,
IBM Plex Mono comes from Google Fonts. Just open it in a browser.

Keep it dependency-free unless he asks otherwise — he should be able to hand
this one file to any host and have it work. That's why the display font is
inlined rather than linked; if the font ever changes, re-embed it the same way
(`base64 -i file.ttf`) instead of adding an asset the HTML depends on.

### Known bug already fixed — don't reintroduce

Menu items were disappearing after animating in. Cause: an inline `opacity:0`
set before the entrance animation, which reasserted itself when the animation
completed. **Visibility must be driven entirely by animation classes**
(`.in` → `.done`), never by inline opacity that outlives the animation.

## Open work

- **Real logo.** The wordmark is currently a font approximation. When he exports
  his actual logo (SVG or transparent PNG), swap it in — that's the single
  biggest fidelity win available. See `docs/site/reference/06-logo-still.jpeg` for target.
- **Content.** ABOUT / SKILLS are drafted from real details. CONTACT is a
  placeholder marked `[Replace me]` — needs his real links, email, and
  handles. PROJECTS: FLUX 1/2/3 and OUTSTATION hold his photos (Oct 30); BTN
  still needs material.
- **Project media.** No thumbnails or video embeds yet. Projects section will
  need a treatment that survives this aesthetic (shard-framed thumbnails,
  hover-scrub previews).
- **Mobile.** Menu relayouts: wedge word up top, plates stacked along the
  bottom, backing panel dropped so the accent wedge stays bright. Verified at
  375×812 in a browser; still needs a real-device pass.
- **Strobe intensity.** The per-frame background reroll is faithful to the
  video but is real flashing imagery — if he ever wants a public-facing
  softer mode, gate it, don't remove it. `prefers-reduced-motion` already
  skips the intro and strobe entirely.
- **Sound.** Not implemented. A menu blip and an impact hit would suit the game
  framing — his call.
- **Deploy.** Not set up. Static single file, so any static host works.
