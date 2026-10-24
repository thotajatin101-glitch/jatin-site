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

The concept is a deliberate merge of two references (see `reference/`):

1. **His own JATIN intro logo animation** — supplies the entire visual language.
2. **A Persona-style game menu** — supplies the interaction and layout model.

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
- **Background motion is one slow rotation.** The whole shard field turns as
  a single pinwheel (`bgSpin`, 180s linear, SVG oversized to 172% so corners
  never sweep into frame). Per-shard drift and the random flicker are gone —
  competing micro-motions read as noise. One continuous linear rotation is
  the most fluid option and it's what he asked for.
- **Chromatic aberration is everywhere and it is PERMANENT** (his ask: harder,
  more cyberpunk, Spider-Verse dimensional-glitch). Three mechanisms:
  1. **Background + wedge + section bands** use a real channel-split SVG
     filter (`#chromaSplit`, softer `#chromaSplitSoft`): red offset one way,
     green+blue the other, screened back together. Flat interiors reconstruct
     the original colour, only edges fringe — that's why it reads as depth
     rather than a coloured shadow pasted on. Do NOT fake this with a plain
     two-tone drop-shadow on big shapes.
  2. **Menu plates** carry `--plate-fx` on the silhouette (drop-shadow, which
     follows the clip-path where box-shadow would be clipped away), and
     `chromaBurst` settles ON `--plate-fx-sel` instead of zero.
  3. **Type** uses the layered `--glitch-*` shadows (tight inner fringe +
     wider outer one).
  Resting values were doubled, then trimmed ~25% — first pass too subtle,
  second too hot. If it needs changing, scale `--plate-fx`, `--glitch-*` and
  the `dx` in `#chromaSplit` together; moving only one breaks the consistency.
  4. **The intro carries it too**: `#impact svg` (chaos + outline frames) takes
     `#chromaSplitSoft`, the wordmark's smear beats get chromatic drop-shadows,
     and the `rgbHit*` ghosts settle at ±8px instead of 0 so the slam leaves a
     permanent fringe. The impact SVGs are built once and only shown/hidden, so
     filtering them costs nothing per frame — unlike the strobing background.
- **Navigation surge (`navPulse`).** Every menu move separates the WHOLE
  plate stack, not just the landing item — a filter on `#menuList` itself,
  ~34px of separation easing back to zero over 0.5s. He asked for the
  aberration to be part of the menu-scrolling animation, so this fires on
  every select, restarts cleanly on rapid navigation (class removed + reflow
  before re-adding), and always returns to the resting design.
- **The 5-second glitch beat** (`startGlitchBeat`, gated behind `.split` so it
  only runs once the background settles): swaps the background filter to
  `#chromaGlitchA` for 90ms, `#chromaGlitchB` for 100ms, then back — a ~190ms
  chromatic tear every 5s, with vertical offset so it reads as a signal tear
  rather than just a wider blur. This is the **one** deliberate hard-cut
  effect. It survives his no-stutter rule precisely because it is rare and
  brief; do not make it more frequent, and do not add other idle glitches.
  Swapping the filter (rather than animating a value) also keeps the cached
  filtered texture for the other 4.8s of every cycle.
- Everything else is **static except the input surges** — he wants intensity,
  not motion. `chromaBurst`, `navPulse` and `wordSlam` fire on input only and
  ease smoothly.
- **Performance guardrails for the split** (he asked explicitly for smooth):
  - The filter sits on `#shardbg svg`, the same element that carries the
    rotation, so the compositor caches one filtered texture and rotates it
    instead of re-filtering per frame. Don't move the filter to the parent.
  - It's gated behind `.split`, added in `settle()`. During the intro the
    shards regenerate ~21 times; filtering a fullscreen layer that often
    would stutter over the slam. Keep the intro unfiltered.
- **Older glitch:** clip-path slices and skew jumps live in the intro hit
  ONLY. The settled logo does a smooth 6s breathing glow (`logoBreathe`).

## The motion — this is the part that matters most

He is a motion person. Timing is the deliverable. The intro was rebuilt
**beat-for-beat from his reference video** (`reference/*10.50*.mov`, 24fps —
frames were extracted and matched one by one). Do not re-invent it:

| Time | Beat (source frame) |
|---|---|
| 0ms | Chaos frame A — white bg, blue/red/green shatter (f1) |
| 42ms | Chaos frame B — dark, noisy version (f2) |
| 83ms | Yellow neon shard outlines on black (f3) |
| 125ms | Red neon outlines (f4) |
| 167/208ms | Red outlines decaying dimmer (f5–f6) |
| 250ms | **COLOR ON** — full shatter snaps in (no scale-up, it just IS there), black blob on, white brush streak starts sweeping down, per-frame background strobe starts (f7) |
| 292/333ms | Streak sweeps down, shatter re-rolls every frame (f8–f9) |
| 375/417ms | Logo materializes as a horizontal glitch smear (f10–f11) |
| 458/500ms | Blows out into a huge white smear bar (f12–f13) |
| 542ms | **Blackout** — logo gone, shards raging (f14–f15) |
| 625ms | **SLAM** — logo hits clean with heavy glitch (f16) |
| 1560ms | Landed — sub fades in, name holds center |
| 1700ms | **HANDOFF** — band wipe sweeps; behind it the name cuts to the corner, the black panel and accent wedge take the screen, plates cascade in from the left 70ms apart, then `select(0)` slams the first wedge word |

**The background strobe:** in the video the whole shatter re-randomizes every
single frame, the entire time. On the site it runs full-rate (42ms rerolls)
through the intro, then decays (90→140→220→340→520ms) and **stops** — once
settled the shatter holds still with slow 7–15s drift only. He explicitly
cut the idle rerolls/flicker ("looks like a bug"). Do not add idle-state
background rerolls back. Intro strobe stays — that IS the video.

All intro beats are hard cuts driven by a JS timeline (`TL` in the script) —
zero easing, class swaps only.

## Layout rules

- **The wordmark holds center through the whole intro** and slams there. It
  only relocates at the intro→menu handoff, and only *behind the wipe bands*
  as an instant cut — never a visible tween, never drift. (This supersedes the
  older "never moves" rule: he asked for a dedicated menu screen, so the name
  docks to the top-left as a corner mark once the menu owns the screen. Do not
  animate that move; the band wipe must cover it.)
- **The menu is a Persona-5-Royal system menu** (his explicit ask, with his
  palette as the twist — accents instead of P5's red):
  - Vertical stack of five plates down the left, each a skewed bar with a
    lightning-notched left edge (`clip-path` on `.mItem`), solid near-black,
    white display type and a small accent number. **No sub-label inside the
    plate** — it was redundant with the wedge tag and its right-alignment was
    forcing the plates wide; removing it is what freed room for the heading.
  - **Selected plate floods with its accent color**, type flips to ink, and it
    scales up hard (1.17) over its neighbours with a black drop so it reads as
    lifted off the stack. Hard `steps(1)` colour cuts, no fades.
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
    the handoff sizes it on adding `body.menu`, behind the wipe bands. Without both, the heading paints at the CSS fallback size and
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
- Per-item accent: ABOUT cyan, PROJECTS pink, SKILLS green, EXPERIENCE
  magenta, CONTACT acid. Order is the section order, top to bottom.
- **Class handoff (`.in` → `.done`) is driven by a timer, not `animationend`.**
  The event doesn't fire reliably when the tab is throttled, and a stuck `.in`
  pins the selected plate's transform. Same rule as the old opacity bug:
  visibility lives on classes, never inline.
- Sections open **over** the landing via a diagonal color-band wipe, with their
  own band colors, a slammed-in wonky header, and staggered cards.
- **ABOUT is a P5 collage, not a card list** (`.collage`, his ask, built from a
  Persona-5 fan-poster reference). Composition, which IS the design — don't
  reflow it into a grid:
  - **Portrait dead centre**, bottom-anchored, with a sticker outline made of
    stacked `drop-shadow()`s. Those follow the PNG's alpha, so the outline
    traces his hair — a border/box-shadow would just box the image.
  - **Copy plates flank it** left and right (`.cgCard-l` / `.cgCard-r`), tilted
    opposite ways.
  - **The name banner** is the anchor: a long chevron-pointed bar slammed
    across the bottom, split-colour, with angled tabs pinned on both points.
    Built as outer (white) + inner (black) sharing a `clip-path`, because a
    clip-path eats a real border — the outer showing through IS the border.
    `box-shadow` is eaten too, so the hard drop is a `filter`, which follows
    the clipped shape.
  - Furniture (tabs, arrow triangles, stars, quote plate) scatters around the
    edges. **Nothing sits on the face** — that was the first pass and it read
    as damage rather than collage.
  - `BACK` needs `z-index:10` here; the banner spans the whole bottom at z8.
  - The source photo is `jatin-cutout.png`: background removed with Vision's
    foreground-instance mask (see `tools/cutout.swift`), then desaturated and
    contrast-pushed to match the reference's B&W treatment.
  - On mobile the whole thing restacks: portrait becomes a faint backdrop at
    `z-index:1` (at desktop it sits beside the cards; on a phone it overlaps
    them, and on top it made the copy unreadable), cards stack, most furniture
    hides.
- Full keyboard nav, like a game: arrows to move, Enter to select, Esc to back.

## Technical state

Single self-contained `index.html`. No build step, no dependencies, no
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
  biggest fidelity win available. See `reference/06-logo-still.jpeg` for target.
- **Content.** ABOUT / SKILLS / EXPERIENCE are drafted from real details.
  PROJECTS and CONTACT are placeholders marked `[Replace me]` — needs his real
  project list, links, email, and handles.
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
