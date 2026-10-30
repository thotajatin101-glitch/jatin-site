# ABOUT — the "Have you seen this MAN?" poster (2026-10-26)

His brief: "I want the about page designed like this, but keeping my design
language. Observe the text placement, how it is scaled, and the perspective
changes. Replace my image with the one I uploaded."
Reference: `reference-poster.webp`. The previous ABOUT (the KREFTON P5 poster)
is kept in `docs/process/stills/2026-10-26-about-p5-kreften/`.

## What the poster does, box by box

1. **Top banner — a wedge, not a bar.** Red slab bleeding off top/left/right.
   Its top edge climbs to the right, its bottom edge drops to the right, so it
   is ~25% of the height at the left and ~100% at the right. That wedge IS the
   perspective: the text inside grows with it.
2. **Headline scale ramp, left → right.** A tiny "Hey! Yes, you…" above; then
   "Have you seen this" at 1×; "MAN" at ~1.7×; "?" at ~2.4× breaking the
   banner's edge; "??" small again, rotated ~25°, trailing off down-right.
   Baseline climbs (~−4°) with the top edge. Reads as a line receding into the
   distance and the punchline coming at you.
3. **Portrait** centre, big (70% of the height), a thick sticker rim in the
   banner's colour with a hard offset shadow in the second colour (down-left),
   arm bleeding off the left edge, hair tucked under the banner, torso
   disappearing behind the bottom banner.
4. **Three four-point sparkle stars** at three sizes: huge in front of the arm
   (lower-left), medium behind the head (upper-left), small on the right.
5. **Two paper sticker tags** pinned on the subject (left on the arm, right on
   the sleeve), tiny type, slightly tilted.
6. **Bottom banner** — blue slab, rising to the right (~−5°), bleeding off
   left/right/bottom. A small lead-in line ("'Cause I think…") then the big
   punchline ("He went to save the city."), the big line growing a little
   toward the right. Credit in the bottom-right corner.
7. **Ground**: warm field with big faint swirls — ours is the cyan wedge, the
   halftone and the depth world.

## Translation into his language

- Banners = the site's P5 slabs: ink hard drop, white rule, inner colour with
  the dither (`DitherFX`), kinked edges (a notch in each), pink top / purple
  bottom against the cyan wedge.
- All type Cyberway Riders at `--track`, white with cyan split on the left and
  an ink drop. The "?" goes acid.
- Copy (his own lines): top "Hey! Yes, you…" / "HAVE YOU SEEN THIS DIRECTOR?";
  bottom "'Cause if it doesn't cut through the noise…" / "IT DOESN'T SHIP." —
  his line "if it doesn't cut through the noise, it doesn't ship" turned into the
  poster's punchline. The studio paragraph moves to the speech bubble (kept
  from the old design, tucked behind the portrait).
- Tags: "JATIN" (display, pinned left) and "DIRECT · SHOOT · CUT" (mono, right).
  Credit: "© BEYOND THE NOISE STUDIO".
- Chains stay (ChainFX.slam) but run BEHIND the portrait into the bottom banner.
- Portrait: the new photo, cut with Vision (`docs/tools/cutout.swift`), graded
  to the site's B&W print look (`docs/tools/grade.swift`). Colour was the other
  option; B&W + the accent rim keeps it in the palette and lets the black
  jacket's folds read (shadows lifted, gamma .78).
- His photo's right arm leaves the frame, so the cut edge there has to sit
  behind the bottom banner — the portrait is sized/placed so it does.

## Rounds
**Round 1** — his words: "I want the about page to be designed like this but
obviously keeping my design language. I want you to also particularly observe
the text placement as well how it is scaled and the perspective changes. And I
want you to replace my image with the one I uploaded."
Built: wedge banners top/bottom, headline ramp, perspective lean, new cutout,
bubble, sparkles, chains behind. Audits fixed: star over bubble copy (short
screens), phone BACK over punchline, ghosted small type. Stills:
`docs/process/stills/2026-10-26-about-poster-v1`, `-short`, `-laptop`.
Awaiting his notes.

**Round 2** — his words: "My photo feels too small with all the big bars top
and down, and I don't like that gap at the top, so for now just remove all the
text from top and bottom so we can figure out the alignment. And the back
button on the bottom is overlapped with the bottom purple bar clearly."
Built: all banner text removed (headline, lead-ins, punchline, credit) — kept
only as a screen-reader `h2.cgSr`; top banner now bleeds flush to the top edge
(the wedge's black strip above it is gone, slope kept on its lower edge);
bars thinned (top 25vh, bottom 19vh; phone 18/13); portrait up from
`min(88vh,74vw)` to `min(100vh,84vw)` (phone 62vh); BACK moved off the purple
to the top-left of the field. Stills: `2026-10-26-about-notext`, `-short`,
`-laptop`.
**Copy parked for when the text comes back** (CSS for `.cgHead/.cgBotText/
.cgCredit` is still in `index.html`): top "Hey! Yes, you…" / HAVE YOU SEEN THIS
(1×) / DIRECTOR (1.8×) / "?" (2.6×) / "??"; bottom "'Cause if it doesn't cut
through the noise…" / IT DOESN'T SHIP.; credit "© Beyond the Noise Studio".

**Round 3** — his words (annotated screenshot + the poster crop): "In my
reference I drew outlines and what to fix and how to layout including the
words … the first reference shows how my photo should be layered above the top
bar but below the bottom one and how much it should be scaled. Currently you
are leaving a lot of empty space in the boxes, and I want that top part to be
covered as well."
Read of his red lines: top bar runs flush to the top of the screen (the black
strip is gone) and its lower edge descends to the right; bottom bar's top edge
rises to the right; "WORD" drawn huge in the bottom-right = the punchline lives
there, big. Black outline = the head, hair overlapping the top bar's edge.
Built: text back, scaled to fill the bars (headline 2.8vw, punchline ramp
IT 1× / DOESN'T 1.35× / SHIP. 2.1× right-aligned, lead-in small at the bottom
left, two lines); top bar z4 UNDER the portrait, bottom bar z8 OVER it;
portrait `min(106vh,86vw)`, bottom −27vh so the hair just crosses the bar edge;
BACK top-left; credit line dropped (bottom bar is the punchline's now).
Stills: `about-layout`, `-short`, `-laptop`.

**Round 4** — his words: "can u make the quality of the crop better? it looks
very unnatural. and I want the outline around the photo to not look like a
sketch pen, instead could make an effect that fades outwards using cyan and hot
pink?" (with a zoom on the hair: blocky silhouette, a hook, grey sky patches).
Built:
- **Crop**: new `docs/tools/matte.swift` (replaces `cutout.swift` for this
  photo). 2x Lanczos upscale + light unsharp; Vision mask for the body; the
  HAIR re-matted by colour — the night sky is teal, hair is near-black, so
  "blue minus red" is a clean key, limited to a hair window and to within 13px
  of Vision's edge; the lens box is excluded (sky seen through glass is real);
  partial-alpha pixels take the colour of solid neighbours so no teal fringe
  survives the B&W grade. Then `grade.swift` as before. File is 1410×1543
  (485KB, was 707×765 / 157KB). Source photo is only 789×1280, so 2x is a
  smooth upscale, not new detail.
- **Outline → halo**: `bakeCutout` no longer stamps a 16-way outline or red/cyan
  ghosts. It draws silhouette shadows only, tight → wide: pale cyan core (9),
  cyan (30), hot pink (64, 120), at half size and scaled up; baked at ~1150px
  tall with 140px padding. Cyan at the figure, fading out into hot pink.
Stills: `about-glow`, `about-glow-laptop`; before: `about-before-glow`.

**Round 5** — his words (screenshot with green lines drawn along the pink and
purple bars' edges): "I drew green lines along the edges of the hot pink and
purple boxes as the path for 2D chains. Keep 2D chains along the path with
infinite motion like before. The line I drew isn't straight so make sure it's
straight — think of it as replacing those edges."
Built: the two corner chains are gone. One straight chain along the pink bar's
underside (scrolls right) and one along the purple bar's top (scrolls left),
each on its own canvas INSIDE its banner (above the fill, below the type) so the
pink one tucks under his head and the purple one crosses over his torso. Path =
the banner's own long edge (`--e0/--e1` on `.cgTop/.cgBot` mirror the clip-path),
hung 0.3 pitch outside the bar so the headline stays clear. Same whip-in on
entry (second chain whips the opposite way), then endless scroll (~0.9 links/s).
Stills: `about-edge-chains`, `-short`.

