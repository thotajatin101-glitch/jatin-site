# Skill card (SKILLS section)

**Brief (his words, Oct 28):** "inside skills section i wanted to make a card themed skills where each card has a skill that i honed and worked on with a description of the skill. [...] i dont want the card to be from my design language not exactly like that [the reference]. So before we make the card let's work on one card first. and i want the intro to the card to be similar to how the Computer model in projects (chained up and an aggressive break out)."

**Reference:** a screen recording of a neon trading card ("ACCELERATOR"): tall card, thick hot-pink border, notch tab ("PROGRAM"), illustration, slashed title, description plate; it flips in 3D and the back is a pattern with a logo. Frames kept in `.local/ref-card/` (gitignored).

## Round 1 — one card, "VIDEO EDITING"
Built: `SkillFX` + `.skSlot/.skCard` in `#sec-skills`.
- Front: black plate, 6px accent border with the red/cyan fringe, notch tab "SKILL 01", dithered art (radiating shards in the palette, a timeline of clips, a white playhead with the colour split, viewfinder corners + REC), glitch-split title tilted -3.5deg, description plate in mono, tool tags.
- Back: accent/purple shard rays under the halftone, JATIN wordmark, BEYOND THE NOISE.
- Intro = the computer's: rises and turns once (the back shows halfway), lands, 70ms strain, SNAP (flash, shockwave, speed lines, bursts, links flung at the lens, 240ms jolt with scale punch). Loops: a belt round the card and an X of two straps, drawn on a canvas behind and one in front by which side of the card's plane faces the viewer.
- After the break: pointer parallax; click / Return / Space flips it (650ms, ease in-out).

Stills: `docs/process/stills/2026-10-28-skills-card-v1` ... `v3` (v3 is current), `-short`, `-phone`.
Copy on the card is a placeholder in his vocabulary; his real words replace it.

## Open
- His notes on the first card (art, title, flip speed, chain size).
- Then the other skills as more cards (layout for several: TBD).
- Old "What I Do / What I Use" cards still sit left; phone hides them for now.

## Round 2 — holographic foil, centred
- His notes: remove the side boxes and paragraphs, centre the card; then, with a reference screenshot (iridescent pastel foil, silver glitter, topographic lines): "i want the background to be something like the screenshot i want the cards to feel special."
- Built: foil behind the art (iridescent gradient on a 260% field, two glitter tiles at different depths, topographic contour canvas, a sheen spot), all shifted by the pointer plus a slow breathe. Shards thinned to 9, gaps open so the foil shows; ink halftone dots over it; the text sits on a black plate with a slanted top edge.
- Stills: `2026-10-28-skills-card-center*`, `2026-10-28-skills-card-holo2`.

## Round 3 — weight, and a pixel-art scene
- His notes: "the card feels flat even if it's 3d because it has no weight to it" and a pixel-art sunset reference: "for a video editor the scene is him sitting at his desk working on his computer. now i really like that foil parallax in current version so try to integrate that into what i just described".
- Weight: the card is a real slab now (1.3em thick, four green edge faces); a soft drop shadow that swings with the tilt; the tilt and the flip are damped springs (lag, a little overshoot, settle); it swings toward the lens while it turns; it lands with a dip-and-bounce (thud) before the strain.
- Scene: 108×96 pixel grid, Bayer-stepped like the reference. Far: sunset sky, clouds, moon, sea. Mid: ridge and skyline with lit windows. Near: the room, him from behind in headphones, the monitor facing us with a timeline, keyboard, lamp, mug. Three layers shift at different rates with the pointer.
- Foil sits BETWEEN mid and near layers (so he stays crisp), overlay-blended on the sky; glitter on top. Soft-light was tried first and lifted all the darks.
- Stills: `2026-10-28-skills-card-pixel`, `-pixel2`, `-weight`.

## Round 4 — the whole card is foil (secret-rare)
- His notes: dust → "i dont like the dusty look [...] add the shiny iridescent gradient theme back" (glitter removed). Then, with a Blue-Eyes secret-rare as the reference: "right now it looks like a shine overlay over the picture but i want it to be integrated into the design itself and can be applied to the card as whole [...] inspect the edges [...] the card has metal look to with a slight metallic shine".
- Built: one foil material (`--holo` + `--brush`) on the frame, tab, text plate, edges and the whole back; picture in a window cut out of it with only a light wash; a card-wide shine band travelling against the base foil; edges are brushed chrome (light/dark stripes) with the rainbow riding on them.
- Stills: `2026-10-28-skills-card-secret-rare3`, `-iridescent`.

## Round 5 — edges: frosted chrome, no plastic strips
- His notes: "i dont like the way these edges look [...] make the card edges into frosted chrome look with some bevel and remove that blank black red and blue colours from the edges the look like plastic sticking out right now".
- Built: removed the face's red/cyan fringe and the black drop strip; `.skRim` (frosted-chrome bevel ring on both faces); slab edges are pale brushed chrome with a faint rainbow tint and a bevel line each side.
- Stills: `2026-10-28-skills-card-chrome`.

## Round 6 — slab gap, tilt clamp
- His notes: a second gradient line at extreme tilts (fixed: foil position soft-clamped with tanh); "why is there empty space in the card" while rotating (front/back were pushed out a full thickness, the edges only span half: both now `T/2`).
- Stills: `2026-10-28-skills-card-slab`.

## Round 7 — liquid metal frame, chains for rays
- His notes: "I want the edges of the card to have more liquid metal look [...] change black stripes to our chain design instead."
- Built: the face frame is a mirror-chrome conic (`--liq`: hard black-to-white bands, two cycles round the card) with a pooled highlight that follows the pointer, a travelling white sweep, and the rainbow (`--holoT`, plain alpha — blend modes were tried and dropped, they are heavy on a 3D card). The foil sits on `.skFace::before` for the content area, the chrome is the face's own background so it shows only in the 0.8em border. Slab edges run the same bands along their length (`--liqE`). `.skRim` is now just the bevel lip.
- Back: the 15°-spaced black rays are gone; 20 chain rays out of the centre (`buildRays`, pixel-link sprites, logo-video palette) growing with distance like the menu chain; the dark centre disc stays under the wordmark. Drawn once, still.
- Stills: `2026-10-28-skills-liquid-chain7`.

## Round 8 — metal chains, no tagline
- His notes: "remove beyond the noise [...] change the chains colour theme to black silver metal with a lil bit of gold accents and make them connect at the center of card [...] the chains colours are overshadowing the logo".
- Built: tagline removed from the back; rays are silver rings / gunmetal bars with gold on every 4th ring (`pal.mono` skips the red/cyan fringe in `ChainFX.sprite`); every chain starts at the card centre (links grow from a 1.5px floor), so all twenty meet behind the wordmark. Stills: `2026-10-28-skills-metal-chains3`.

## Round 9 — chrome-gradient chains
- His note: "instead of making each chain link one colour could u make the whole thing have the same metal gradient effect similar to how the edges of the card has".
- Built: metal links take multi-stop mirror bands across the face (`pal.ringStops` / `pal.barStops`, silver and gold sets, same black-to-white rhythm as the card's `--bands`); the tonal ink dots are off on metal. Stills: `2026-10-28-skills-chrome-chains`.

## Round 10 — one metal, chrome logo, back parallax
- His notes: "just change the gold links to the same as rest [...] give the logo a metal finish as well but more subtler and lighter [...] a parallax effect to whole thing now".
- Built: gold removed (all links silver). `.skMark::after` lays light chrome bands (clipped text, slides with `--fy`) exactly over the white wordmark; the base keeps the pink/cyan glitch split (text-shadow shows through clipped text, hence the copy). Back parallax: chains canvas oversized to 112% and shifts against the pointer (±8px), the wordmark shifts the other way (±10px) — two depths, same `--ax/--ay` as the front's picture layers. Stills: `2026-10-28-skills-metal-logo`.

## Round 11 — one tunnel, gold logo
- His notes: parallax "feels like it only affects the logo [...] I want the logo to move with chains as well [...] more depth"; "gold metal finish on the logo, remove the chromatic aberration, instead add a metal drop shadow [...] not too far".
- Built: chains are redrawn per frame (`drawRays`) with the vanishing point sliding with the pointer and links sliding further the nearer they are (a tunnel, not a flat sheet); the logo moves the same direction as the vanishing point (a bit more, it's nearest) instead of against it. Logo: gold bands clipped to the letters (`.skMark::after`), pink/cyan split removed, a short stepped steel drop shadow (.1em) in its place. Stills: `2026-10-28-skills-gold-logo`.

## Round 12 — gold heading
- His note: "give the same video editing heading the same gold accent finish with drop shadow like the logo, no parallax tho".
- Built: `--gold` is now one token shared by the back wordmark and the front heading; each heading line gets the clipped-gold `::after` over a base carrying the steel step shadow; chroma split removed. The front's bands are static (the back's slide with the tilt). Stills: `2026-10-28-skills-gold-title`.

## Round 13 — the wrap is metal too
- His note: change the intro chains round the card to the same black-silver metal as the back.
- Built: `METAL` is one palette inside `SkillFX`, used by both the intro wrap/break (`wrapFrame`) and the back's rays. The break keeps its brief pink/cyan RGB-split ghosts (the impact language) around the metal links. Stills: `2026-10-28-skills-metal-wrap`.

## Round 14 — thicker wrap
- His note: the chains round the card are too thin. `LINKPX` 36 → 50 (links ~40% bigger, same loops, fewer links; the flung debris grows with it). Stills: `2026-10-28-skills-thick-wrap`.

## Round 15 — chrome casing (outer frame, thorn crests)
- His note + reference (a chrome "SAVAGE" wordmark: sharp, curling liquid-chrome thorns): "a chrome liquid metal casing for the card that acts as an outer frame, same as the reference for the top and bottom of the card".
- Built: `.skCase`, an inline SVG (`SkillFX.caseSVG`) in the card's 3D space at the slab's mid-plane, so it turns with the card and shows from both sides. A chamfered chrome ring hugs the card; top and bottom carry the crests, each a central blade plus wings, barbs and a thorn curling down the side, with small hooks on the side rails. Shapes are generated, not hand-pathed: each is a cubic spine with a tapering, swelling width (`blade`), mirrored to the four corners. Fill = the card's chrome bands (black-to-white) plus a second overlay, dark outline, white ridge along every spine. The bands slide with the tilt (`slideCase`). The card is a touch smaller (54vh, centred 64vh) so the crests clear the heading and BACK.
- Stills: `2026-10-29-skills-chrome-case2`, `-case-short`, `-case-phone`. Prototype look and why: first pass was too thin and grey, so widths ×1.5 and darker bands.

## Round 16 — the casing becomes real relief (liquid chrome, 3D)
- His notes (with two new references: a chrome memory-card holder with melted horns, and a chrome tribal cuff wrapping an object): the SVG version "looks flat and vector [...] make them 3D and work metal textures and bevel, emboss etc".
- What the references do: thick, soft-bodied tubes (round cross-section, never flat bands); every join is a liquid fillet; horns taper to needle tips; holes are rounded; the metal wraps the object's edge and hooks over its face; the look is the environment, not the colour — a hard dark horizon band, bright softboxes and a dark flag reflected in curved surfaces, with a faint cyan/magenta thin-film at the grazing bevels.
- Built (replacing the SVG): the plan (ring that straddles the card edge, thorn crests, side hooks, a hook over each corner) is rasterised → blurred and re-cut (fillets) → distance field → rounded-tube height (`CS.R`) → normal map, all in a worker (`caseWork`; the 500ms main-thread build hitched the chained intro). A WebGL shader lights it from the card's real orientation against a procedural studio, with parallax so thick parts stand off the plane. Front sheet sits on the front face, back sheet on the back; seven masked dark-steel layers fill the slab so it has a side edge-on. The ring overlaps the card's frame by a few px, so the metal reads as wrapping the card.
- Tuning: first shading was black on every face-on part (the dark flag sat behind the viewer); moved the horizon under the view axis so flat metal facing you is bright and bevels that tip down go dark; R 30 → 44 with a stronger height blur so the wide blobs dome instead of plateau.
- Stills: `2026-10-29-skills-relief-case3`, `-relief-short`, `-relief-phone`.

## Round 17 — sharper, thinner, more shine (2026-10-29)

**His notes:** "the side of the metal case is too wide, i need it sharper and overall the case looks blunt and requires a lot more shine… make the sharp ends look more intentional, they are a bit too liquidy and blobby but they are also supposed to look sharp." Reference: mirror chrome, hard black/white pools, thin crisp highlight lines on every edge, needle horns, lipped elliptical holes.

**Built:** ring 46→42px (was 32 in the first pass, which went too thin/dark against the black field — mass put back in the thick parts only); horns are concave needle tapers (power 1.6–1.9) with fatter roots so they stay solid and end sharp; fillets are unioned with the unblurred shapes so tips keep their points; height field gets a thin edge lip + groove (the hairline highlight); slab thickness halved (±.25·T). Shader: hard horizon, two band frequencies, harder spec, brighter ground reflection so the black bands aren't dead.

**Dropped:** the 32px ring (too thin, read as wire, went black on the black wedge); the ±.45 slab (the "side too wide").

**Still open:** top crest sits tight under THE TOOLKIT at 1440×700; motion (spring, reflection slide) not yet judged in a real tab. Stills: `2026-10-29-skills-sharp-case3` (+ `-short`, `-phone`).

## Round 18 — sides cleared (2026-10-29)
**His note:** remove the side ornaments (the long curved horns and the eyelet loop on the left/right edges), keep the rest of the case the same. **Built:** deleted the corner horn + its tail and the `SIDE` eyelet from `casePlan`; top/bottom crests, hook and ring untouched. Stills `2026-10-29-skills-no-sides`.

## Round 19 — corner horns back, only (2026-10-29)
**His note:** "i do like the corner edge part of the case tho so keep that only." **Built:** restored the corner horn in `casePlan`, but shortened its run down the side (ends at y290, was 396) so it reads as the corner swoop, not a side ornament. Tail and eyelet stay gone. Stills `2026-10-29-skills-corner-only`.

## Round 20 — smooth the edges (2026-10-29)
**His note:** some edges look jagged, "small pixel folds", need to be smooth. **Cause:** the distance field of a binary mask steps up to half a pixel on every diagonal; the lip's steep slope turned that into folds in the high-contrast reflections (and a stepped silhouette). **Built:** four 3-tap blurs on the distance field before height/alpha are derived; alpha ramp re-fitted to the smoothed field. `snap.mjs` takes `SNAP_DPR=2` now so retina density can be checked. Stills `2026-10-29-skills-smooth-edges` (2x).

## Round 21 — the art becomes his recording's world (2026-10-29)
**His note** (with `Screen Recording 2026-10-29 at 1.43.08 PM.mov`): "this is exactly what I expect for the card design. Right now we have a normal person sitting editing, which is a bit lacking, but have computer that's floating in a gradient themed background floating looks amazing, go for that."
**The reference:** an Apple II-style computer on a floating rainbow slab (pink-red top, blue/cyan edge), black starfield with a galaxy smear, iridescent cubes / prisms / spheres / cylinders tumbling slowly round it, the screen scrolling pastel stripes and glowing.
**Built:** the pixel-art room is gone (`scene()`, the three `.skL` layers, the topo foil). `Space` in `SkillFX` is one WebGL raymarch on `.skGL`: computer (base with key grid, drive box with two slots, CRT with a recessed glass), slab, eight tumbling shapes with a gradient that slides across their faces, soft shadow + AO, procedural stars/galaxy, screen glow spilling into the room. Camera drifts and follows the pointer; 30fps, DPR ≤1.5, drawn only while the front faces you; `hold()` freezes it for stills; reduced motion draws one frame.
**Tuning:** first pass hid the screen behind the bezel (grey glass) → recess deepened; slab too big and washed → smaller, thicker side, hotter top; shapes were off-frame → pulled in.
Stills `2026-10-29-skills-space-1…4` (+ `-short`). Not yet judged: motion in a real tab, phone.

## Round 22 — gloss trial (2026-10-29)
**His note:** the card has a matte-shine finish, "not bad", but he wants to see the glossy finish; he'll keep or revert and say. **Built (reversible):** `.skCard.gloss` — brushed grain off the foil, a new `.skGloss` clear-coat layer (window reflection with a hard horizon at 36%, one sharp glare band riding the pointer), a 1px top-edge highlight. **Revert:** delete `gloss` from the `.skCard` class list (the matte rules are untouched). First pass milked the art (blacks lifted); halved the window reflection. Stills `2026-10-29-skills-gloss`, `-gloss-2`; matte reference `-space-4`.

**Round 22 outcome:** he saw the gloss and said "no, revert to the before version". Gloss code removed entirely; the matte-shine card stays. Stills kept for reference.

## Round 23 — deep space is OLED black (2026-10-29)
**His note:** the dark colours are too greyish; the space behind the computer should look like an OLED screen with stars, maybe more contrast. **Diagnosis:** three things lifted the black: the card's `screen`-blend sheen (`.skShine`) ran over the picture and turned black to lavender-grey; the shader's own nebula glows + a base tint + grain that clamps at zero + a gamma lift; the text plate let 16% of the foil through. **Built:** sheen clipped off the picture; base sky is exactly 0, purple nebula gone, warm glow halved, grain scaled by the light (black stays black), gamma lift removed; stars fewer, brighter, crisper; text plate .84→.94 dark. Stills `2026-10-29-skills-oled`.

## Round 24 — a real keyboard, and a mouse (2026-10-29)
**His note:** "That does not look like a keyboard and there is no mouse as well." **Cause:** the keys were one uniform square grid across the whole case top. **Built:** the keyboard is a dark well with five staggered rows of keycaps (each row offset like a real board), gaps, a bevelled cap shade, and a long space bar on the front row. A beige one-button mouse (rounded, with the button groove and centre split) sits on the slab at right, with a dark cable that runs back and tucks into the case. Stills `2026-10-29-skills-keys`.

## Round 25 — SKILL 01 tab to centre top (2026-10-29)
**His note:** the tab is getting blocked (the top-left chrome horn covered the "S"); move it to centre top. **Built:** tab centred, symmetric trapezoid cut. First try at the very top still lost half of it under the centre crest's dip, so it sits `.85em` down, just below the crest. Stills `2026-10-29-skills-tab-2`.

## Round 26 — darker text plate (2026-10-29)
**His note:** "make the dark background here a bit darker" (the plate under the description). **Cause:** the plate's own dark (.94) let 6% of the foil through, and the screen-blend sheen on top lifted it to green-teal. **Built:** plate .975; the sheen is now masked off the picture and runs at ~quarter strength over the plate (was a clip that only cut the picture). It now matches the OLED sky. Stills `2026-10-29-skills-plate`.

## Round 27 — the stage: card left, banner right, plate menu (2026-10-29)
**His note** (with `Screen Recording 2026-10-28 at 9.00.21 PM.mov`, the Persona 5 Confidant intro): "the animation placements in the video are exactly how I want them… how the card shows the first card 1, and I would also want it for any new cards I add later. To scroll through the cards I want a similar menu theme like in the website, but for skill cards."
**What the recording does (12fps read):** the tarot card tumbles in big and sideways, slams to a tilt (about −9°) left of centre; chains whip in; an accent slash cuts across; a black slanted info banner slams in on the card's right (tag strip, big name, huge yellow numeral, star pips).
**Built:** `CARDS` in `SkillFX` is the one source — push an object `{title:[..],desc,tags}` and the card face, the info banner, the pager stars and the plate menu all pick it up (`SkillFX.refresh()` for runtime adds).
- Placement: card at 34vw / 61.5vh, resting tilt −.15rad (chain loops turn with it: `proj` takes the tilt); banner at card+14vw, rotated −4°, big acid numeral outside the clip so it isn't cut; SKILL tag strip; pager stars.
- Menu: the main menu's plates mirrored — bleed off the RIGHT edge, staircase narrowing, acid flood on the selected plate (green on the green wedge would vanish), chroma burst + nav pulse, hover/click/arrow keys. Same dither as every solid shape. Phone: a row of numbered chips above BACK.
- Deal (the recording's slam, ~570ms): old card spins away (150ms), swap, new card tumbles in from big and sideways with overshoot (420ms), banner re-slams, acid slash sweeps behind. Frame-drop safe (the swap can't be skipped). Always arrives face up.
- First entry keeps the chained wrap + snap he liked; the banner, slash and plate cascade fire on the snap.
**Not yet:** other cards need their own art (they share the computer scene) and real copy; the recording's chain whip on every deal isn't in (the slash carries it). Tested with three temp cards; shipped list = Video Editing only. Stills `2026-10-29-skills-stage-3`, `-deal-70/200/330`, `-stage-4-short`, `-stage-5-phone`.

## Round 51 — the art takes the whole card; the words move to the banner (2026-11-07)

**His note** (with a sketch: a box from under the banner heading, down the right of the card):
> "alright now here is what we are gonna do let's shift the description and title to the side under heading space on the right like shown in screenshot. and completely cover the whole card with design itself that's gives more importance. and new heading will be on the side ofc."

**Built:**
- **The card face is all picture**: the art window runs the full face (only the SKILL tab stays). The gold title, the description plate, the tags and the face sheen are gone from the card.
  - The eye fills the card's width in the taller window; the computer and the camera already filled it.
- **The banner is the heading**, and under it hangs a black plate (same dither as every plate) with the description in mono and the tags.
  - It sits on its own layer above the front chain, which used to cross the copy. The banner itself stays under the card.
  - JS gives it the banner's own pivot, so the two turn as one. It slides out 70ms after the banner.
- **Phone:** no banner, so the plate lies flat under the card and carries the name. The card sits a little higher and smaller (36vh).
- Audited at 1440×900, 1440×700, 1280×800 and 375×812. At 1440×700 the big numeral tucks under the PHOTOGRAPHY plate; that was already there before this round.

Stills: `2026-11-07-skills-fullart` (+ `-c1`, `-c2`, `-short`, `-laptop`, `-phone`). Before: `2026-11-07-skills-order`.

## Round 50 — the deal is one flip through the back (2026-11-07)

**His note:**
> "ok so right now the transition/switch between the card is basically rotation switch but let's make the semless by simply fliping card which shows the back of the card and goes to next card in that way it feel seemless."

**Built:** the old deal (the card spins away, then the next tumbles in) is gone. Changing cards now sends the card's own flip spring, the same one a click uses, a full turn:
- The front turns away and the JATIN back comes round.
- The face swaps while the back is toward you, about 84ms in, so the new card arrives on the way round.
- It lands face up with a small settle (about 10°), done by about 0.77s.
- Next turns one way and previous the other.
- A deal is damped a little harder than a click flip; a full turn on the click spring overshot about 45°.
- Under reduced motion, the card swaps with no turn.
- `SkillFX.dealHold(ms)` scrubs the flip (it replays the spring).

Stills: `docs/process/stills/2026-11-07-skills-deal-flip` (0–800ms).

## Round 49 — pupils that read, and real depth in the same print (2026-11-07)

**His note:**
> "great. ok love it but right the eye pupils are arent exactly visible due to overwhelming amount stuff going is it possible to make it bit brighter. and could give this design more depth? maybe by making it 3d but i dont want a poorly modeled version i want the same design and textures but i want it to feel more immersive"

**Direction:** no 3D model. A modelled eye would lose the print, so the illustration itself gets real form, lit and posterised into the same Bayer steps, ink dots and split.

**Built:**
- **The eyeball is a sphere** behind the lids.
  - The iris is a cap on it, turned by the gaze, so it foreshortens into an ellipse as the eye glances.
  - The catchlights and the reflection stay fixed to the light while the iris slides under them: the strongest cue that it's round.
  - The sclera is lit as a sphere in three printed tones.
  - The upper lid casts its shadow on the ball, and the lower lid occludes it.
  - A thin wet rim along the lower lid gives the lid its thickness.
- **The reflection is mapped off the surface normal**, so it squeezes toward the rim like a real cornea.
- **The pupil and iris read through it:**
  - the reflection drops to 55% over the iris and 22% over the pupil (it was full strength);
  - the iris is brighter, hot pink at the collar falling to deep at a black limbal ring;
  - a pale collar ring frames a solid black pupil.
- **The face has form:** a height field (brow ridge, cheekbone, the socket sinking round the eye) lights the skin. Same five Bayer steps, now shaped.
- **Parallax, not the cursor:** a slow camera drift and push (about 30s cycles). The brow's shadow moves most, the skin and lids next, the ball least, so the ball slides behind the lids.

Stills: `docs/process/stills/2026-11-07-skills-eye-depth`. Film: `round49-eye-depth.mp4` (12.8s) + sheet. Before: round 48's film and stills.

## Round 48 — the eye goes through a lot of references (2026-11-07)

**His note:**
> "ok love this but can the reflection be something like going through alot of refrences?"

**Built:** the reflection now flicks through **his own photos**: all 46 FLUX and OUTSTATION thumbnails from `PHOTOS`, the same list JATIN OS uses. The eye, the datamosh and the glance from round 47 are unchanged. One 6.4s loop (77 steps on a 12fps clock):
- **Browse:** a new reference every 3 steps, each easing in slightly. A green HUD over it reads `REF 0xx` and what he's reading it for (LIGHT, FRAME, COLOUR, SKIN, SHADOW, GRAIN, POSE…).
- **Accelerate:** every 2 steps, then every step: the flick speeds up.
- **Hit:** a white frame, datamosh, the pupil snaps small.
- **Lock:** it stops on one. The image pushes in, `> LOCKED` blinks, and its palette is pulled out as five swatches, sampled from the photo itself.
- **Board:** a 2×2 moodboard of four, then back to browsing.
- Each loop picks different photos.

**Loading:** the thumbs (640w, 3.2MB in all) load the first time the card draws, three at a time. Bokeh lights stand in until the first one arrives. The `PHOTOS` block moved to the top of the script, so PROJECTS and the eye share one list; `photos.mjs` finds it by its markers, so the move is safe. `tests/check.mjs` passes.

Stills: `docs/process/stills/2026-11-07-skills-eye-references`. Film: `round48-eye-references.mp4` + sheet. The round 47 feed (lights / spec / JATIN / palette) is in `round47-eye-reflection.mp4`.

## Round 47 — the eye that sees: one held eye, the look reflected in it (2026-11-07)

**His note** (with `Screen Recording 2026-11-07 at 8.12.00 PM.mov`, a 2.7s red close-up of one eye):
> "Ok let's switch it up check this refrence out this a better idea for representing it"

**Frame read** (sheet `ref-eye-reflection-sheet.jpg`): the camera never moves. A single stylised eye, red duotone on black, heavy shadow above, grain. All the motion is in the REFLECTION on the eyeball: soft lights and screen bars, then green terminal code, then datamosh blocks (magenta, green) tearing across it, cut hard every half-second or so.

**Built** (`EyeFX` rewritten; the round 46 flight is kept in round46-eye-flight.mp4 and stills `2026-11-07-skills-eye-flight`):
- **One eye, held.** Pink duotone face, posterised in 4×4 Bayer steps, the 23° ink dots, a red/cyan split, light static grain. Heavy black above (brow, socket), the soft black blob hugging the eye. Hard ink liner, heavy on top, thin below. Lid skin and crease. No lashes (his last note).
- **The reflection is a feed**: a small canvas redrawn on 2s at 12fps and bent over the eyeball like a convex mirror, screened over the dark iris, a sheen on the white. A 6.4s loop:
  1. lights: screen bars and bokeh drifting;
  2. **his direction spec typing in green** (the reference's code, but it's his rules: palette hexes, CYBERWAY RIDERS +.14EM, 24FPS ON 2s, cyan left / pink right, ink dots @ 23°, VIGNETTE NONE. EVER.);
  3. a white hit frame, then the site's shatter with JATIN slammed in Cyberway, the pupil snapping small;
  4. the six palette swatches slamming in one per step;
  5. the spec signs off: `> look locked_`.
- **Every cut lands with a datamosh** for ~3 frames: block shifts tinted magenta/green, row tears.
- **The eye glances** on its own in quick hops every 1.6s. Not the cursor.
- Fitted to the art window's width, so both corners always show.

Stills: `docs/process/stills/2026-11-07-skills-eye-reflection`. Film: `round47-eye-reflection.mp4` + sheet.

## Round 46 — a flight through layers, with 3D objects; no lashes (2026-11-07)

**His note:**
> "ok so there is a huge difference between this and the reference here is why. in reference u can tell by like that it feels like the camera is moving through multiple layers and there are some 3d objects here and there as well the current one is not like so work on that. and can u remove the eye lashes as well"

**Why the old one read flat:** a Droste zoom scales everything by the same amount, so nothing moves against anything else. The reference reads as depth because its layers move at different speeds.

**Rebuilt as a flight:**
- **The camera moves forward through layers spaced one unit apart, 0.42s a layer.** Each layer is drawn at 1/z, so near layers rush past and far ones creep: real parallax. The camera drifts and rolls slightly so the layers slide against each other. Drawn front to back; the first solid layer wins.
- **The layers, in a cycle of six:**
  - **The eye.** Lids with the plates' ink drop, paper, a shatter iris and a star catchlight. The pupil is a hole you fly through, and the next eye is already waiting further in. One eye every 2.5s.
  - **Shatter frames.** 10–16 shards with straight sides come in from the edges and point at the centre, each with a thick black stroke. A fifth of them are missing, so you see through the gaps to the layers behind (the site's sparse shards, with air between). Some carry the yellow→green and cyan→dark gradients.
  - **3D objects, on two layers in six.** Toon-shaded spheres with a star highlight, and tumbling cubes (exact ray–box hits, three tones, black ink on every edge). They sit off-centre so they sail past.
- **Behind everything:** a far wall of the shatter at 22%. Far layers step down into black, so new ones appear without a pop.
- **No lashes.**
- **Kept:** the palette, ink dots, red/cyan split and centring in the art window.

Stills: `docs/process/stills/2026-11-07-skills-eye-flight`. Film: `round46-eye-flight.mp4` + sheet.

**Not measured yet:** frame cost on his machine. That's 11 layers × 3 colour passes.

## Round 45 — the eye, centred, in the site's language (2026-11-07)

**His note:**
> "it's not exactly centered on the screen and design requires some work as well try to embody our website design into" (screenshot of the card)

**Centring.** The card's picture window is only the top 64% of the card, and it is wider than tall. I had placed the eye as if the picture filled the whole card, which put it too high. The eye now sits at the window's centre (+.05 for the SKILL tab). The films now render at the window's shape (600×560), so what I check is what he sees.

**The site's language, in place of the cartoon:**
- **The world is the logo's shatter fanning out of the pupil.** The eye is the vanishing point. The shards carry thick black strokes, yellow→green and cyan→dark gradients, pink, magenta and purple, and a few black wedges (16%, so the lashes still read). The field turns slowly.
- **Lashes are long black spikes**, the shards' cousins.
- **The lids get the plates' hard black ink drop**, then pink above and magenta below with a black rule.
- **The eye is flat paper.**
- **The iris is the shatter again in miniature**, turning the other way, with a cyan and black rim.
- **The catchlight is the site's four-point star.**
- **The whole eye tilts 4°**, like every heading.
- **The frame stands back 1.25×**, so the shatter shows round the eye. The zoom is now ×10 per 3.2s, so the pupil still covers the frame at the loop point.
- **Cut:** the rainbow, the clouds, the drapes and the trunks.

Stills: `docs/process/stills/2026-11-07-skills-eye-site`. The rejected cartoon version is kept in `…-skills-eye` and round 44. Film: `round45-eye-site.mp4`.

## Round 44 — VISUAL DIRECTION is an eye you fall into (2026-11-07)

**His note:**
> "Here is my what i want for visual direction. visual direction has everything to do with having eye for things that's why i wanted to go with something like but ofc in our theme but heavily inspired by this style" (reference: a 16s psychedelic cartoon eye, an endless zoom into its pupil)

**Reference read** (`round44-ref-eye.jpg`):
- One cartoon eye with an endless zoom into the pupil. Each pupil holds the whole picture again, about 2s a level.
- A rainbow arc over the eye with cyan clouds along it, thick pink lids with black spike lashes, a blue banded iris and a white catchlight.
- Pink and purple drapes hanging below, with yellow trunks.
- A small red figure at the bottom, flat cartoon colour, heavy chromatic split.

**Built: `EyeFX`**, the card's own 2D shader. It replaces the director's chair (`art:3`; the chair is retired).
- **A Droste dive:** the frame zooms ×8 into the pupil every 3.2s, and the scene restarts inside the pupil at 8× scale. The loop is constant and smooth, with no seam or cut.
- **In our language:**
  - logo palette only, on a flat purple sky with acid sparkles;
  - a rainbow of six palette bands that drifts round the loop, with black rules and a scalloped cyan cloud;
  - pink and magenta lids with folds, and lashes as curling black spikes;
  - the iris rings flowing round the palette, with black rules, radial streaks and a paper catchlight;
  - swaying pink, magenta and purple drapes, and two acid→green trunks;
  - thick black outlines everywhere;
  - the 23° ink dots on the colour, vanishing in the blacks;
  - a red/cyan split on every edge (each channel sampled 0.007 apart).
- **The red figure is left out.** The card's text panel covers the bottom of the art.

Fixed on the way:
- the drapes began on a hard horizontal line, so their top now dips away from the eye's corners;
- the rainbow was cut flat at eye level, so it is now a full ring that the drapes hide below.

Stills: `docs/process/stills/2026-11-07-skills-eye`, `round44-eye-dive.jpg`. Film: `round44-eye-dive.mp4`.

The chair's SDF still sits in the Space shader, unused. Remove it once he signs off on the eye.

## Round 43 — the camera stays whole (2026-11-07)

**His note:**
> "actually could u just keep the camera itself without the camera detach animation i think i would prefer that"

- **The detach is cut.** The camera stays whole and turns gently: yaw ±.08 on an 8s sway, with a slight pitch breath. The palette shards keep flowing behind it.
- **The framing** is the closer rest shot from round 42 (distance 5.9), with no pull-back.
- **The exploded parts** are still in the model behind `uE` (always 0 now). The detach films (rounds 37, 39, 42) stay in this folder in case he wants it back.

Still: `docs/process/stills/2026-11-07-skills-camera-whole`.

## Round 42 — shards to the centre, flowing gradients, no platform (2026-11-07)

**His note:**
> "ok but i also do want that space extend stripes to fill it and remove the platform for the camera and make camera a bit bigger and for the background strips make sure to add a gradient effect the shifts colours smoothly"

- **The shards fill the centre.** They run all the way into the vanishing point, so the black hole is gone. The strokes meet there as a small black point.
- **Smooth colour gradients.** Every colour shard is a gradient flowing round the logo's palette as one smooth loop (`pcyc`: acid → green → cyan → purple → magenta → pink → acid). It moves outward from the point and shifts over time on page time, so there is no seam when the film loops. A quarter of the shards stay black wedges, and the ink dots and hard strokes stay.
- **The platform is gone.** The camera floats over the grid floor.
- **The camera is bigger.** At rest the shot sits at 5.9 instead of 8.4. The open pose is unchanged at 12.2, so every part still fits.

Stills: `docs/process/stills/2026-11-07-skills-camera-gradient`. Film: `round42-camera-gradient-shards.mp4` + sheet.

## Round 41 — no backlight (2026-11-07)

**His note:**
> "i dont want the weird purple gradient backliht" (with a frame of the purple glow behind the open camera)

What changed:
- **The glow is gone.** The sky behind the shards is plain black.
- **The shards' tips are cut clean** instead of fading into the point. The soft fade left a blurry dark halo once the purple went.
- **The black strokes are pixel-sharp.**
- **The smear in the top right is gone.** It came from the angle warp that gives the shards uneven widths: it was folding back on itself, which smeared a stroke into a soft diagonal shadow. The warp is calmer now (.13 / .035), and the stroke is measured against its slope, so it keeps one width.

**Lesson:** no soft glows or gradient backlights in the card worlds. Hard edges only, like the rest of the site.

`round41-camera-no-glow.jpg` / `.mp4`.

## Round 40 — the camera in the site's world, not space (2026-11-07)

**His note:**
> "ok when i said our desing theme for camera i meant our website theme u see the one made video editing is soley for video editing so every card will have it's own theme. right now u are using the space theme bg which is only for video editing"

**Rule from this note:** every card has its own world. The space sky, the rainbow slab and the foil belong to VIDEO EDITING alone.

PHOTOGRAPHY now stands in the site's own world, drawn in the film's shader (`siteWorld`):
- **Shards** radiate from a vanishing point behind the camera, in the logo's palette: yellow→green, cyan→dark, magenta, pink and purple, plus black wedges.
- **Thick black strokes** between the shards. The shards are sparse and dissolve into a glow pooled at the point.
- **The 23° ink-dot screen** sits on the colour and vanishes in the blacks.
- **A cyan perspective floor** flows toward the viewer.
- **No vignette.**

The rainbow slab is now a black plate with neon edges: cyan on the top rim and a pink line round the side, the transition's outline language. The small parts that fly out are glossy acid, cyan, pink and green instead of rainbow foil.

The background is composited after the tone curve, so the palette lands at full strength. The speed-line and flash code is gone.

Not done: the chair card (VISUAL DIRECTION) still shares the space scene. By the same rule it needs its own world, which is his to brief.

Stills: `round40-camera-site-world-open.jpg`, `docs/process/stills/2026-11-07-skills-camera-site-world`. Video: `round40-camera-site-world.mp4`.

## Round 39 — the detach glides, no snap (2026-11-07)

**His note:**
> "ok the camera animation is too cluncky like make it quick and smooth motion i don't want the camera opening up in a snap."

The snap is gone. The loop is still 4.2s:
- **0–1.0s:** it sits.
- **1.0s, glide apart:** 0.6s on an in-out cubic.
- **1.6–2.9s:** it floats, the parts easing apart another 4% and back.
- **2.9s, glide back together:** 0.6s on the same ease.
- **Then:** it sits, and loops.

What came out: the white impact frames, the speed lines, the camera shake, the catchlight pop and the quint-out burst.

The shot now eases back further while the camera is open (distance 14, target shifted left and up), because the slower open showed the lens and the top parts cropping off the frame edge.

The rejected snap version is kept as `round37-camera-detach.mp4`. New: `round39-camera-glide.mp4` and its sheet.

## Round 38 — the deck: three cards, each with its own art (2026-11-07)

**His note:**
> "Looks good, wire cards"

The deck is three cards now, in this order:
- **01 VIDEO EDITING:** the computer. Tags RESOLVE · FUSION · COLOUR. Colour and Fusion macros live here, as he set out.
- **02 VISUAL DIRECTION:** the director's chair. "One look, decided before the first frame. Palette, light, type and motion all answer to it." Tags CONCEPT · ART DIRECTION.
- **03 PHOTOGRAPHY:** the camera's detach film. "Editorial shoots, built on set. Light, frame and moment are made before the shutter, not saved after." Tags EDITORIAL · LIGHTING.

How it works:
- Each `CARDS` entry carries `art` (0 computer, 1 camera film, 2 chair).
- `fill()` sets `Space.kind` from it, so the art swaps on the deal's hidden frame, along with the copy.
- VIDEO EDITING stays first because the chained entrance is built around it.

Fixed on the way:
- **The card title fits the card.** DIRECTION touched the frame and PHOTOGRAPHY was cut off, so the title now shrinks to the widest word. It measures layout widths, never the tilted box.
- **A one-word title sits on the second line**, so it lands where a two-line title's last line would.
- **Card 01's tags were shortened**, because a third tag wrapped onto the copy.

Stills: `2026-11-07-skills-deck-card1/2/3` and `skills-deck-phone` (375×812). The copy is a first draft, his to rewrite.

## Round 37 — only the detach, in our world (2026-11-07)

**His note:**
> "ok so just keep the camera detaching part and don't need anything else and making the animation themed around are design and background as well"

The film is cut to the detach alone, 4.2s a loop:
- **0–1.0s:** it sits.
- **1.0s BURST:** a one-frame white impact, then speed lines out of the camera in white, pink and cyan. The parts blow apart in .12s (quint out) and the shot dollies back with the blast, with a short jolt.
- **1.0–2.9s:** it hangs and drifts.
- **2.9s SNAP back:** together in .18s (cubic in), a second white hit, the catchlight pops, lines and a jolt.
- **Then:** hold, and loop.

Cut: the orbit, the macro push, the front-on hold and the whip.

**Themed to our world, not a studio:**
- the card's own sky (the computer card's warm galaxy band and starfield) and the same rainbow slab the computer stands on;
- the insides that fly out wear the palette: a green board, a violet sensor, and discs and beads in the card's rainbow foil;
- the camera itself stays real black, with the pink rim calmed so it doesn't go magenta.

Fixed on the way: the slab never drew, because the body overwrote it in the model. Stills `round37-camera-detach-sheet.jpg`; video `round37-camera-detach.mp4` (3 loops, not committed).

**Not judged yet:** in a real tab.

## Round 36 — the camera, modelled and lit for real, and its product film (2026-11-07)

**His note:**
> "ok u dont need to keep a name on it. and the model is poorly modeled and i want you to analyze the textures the look very realistic. and i wanted you to go for that type of animation from the refrence as well ."

**Texture read** (close frames of his reference): what makes it look real is
- matte black with a fine scatter of light flecks;
- tight chamfers, so every edge catches a crisp line of light;
- pebbled leather on the grip that throws tiny highlights (a real bump, not a printed pattern);
- diamond-knurled dials that sparkle;
- matte ribbed rubber rings and a glossy barrel on the lens, with white print;
- deep green-tinted glass with two hard softbox reflections;
- everything bathed in the backdrop's colour: a warm key, a hot rim on the edges, big soft reflections on the planes.

**Built:** the camera left the toy-scene shader and got its own renderer, `CamFilm`, inside the card art (`Space.kind=1`).
- **Model:** proportions measured off his front-on frame:
  - body 1.9 × 1.15 with a lower right shoulder, and a deep grip with a finger groove;
  - a viewfinder hump with sloped sides, a leaning front and a hot shoe;
  - a knurled mode dial with a lock button, an exposure dial, C buttons, and a shutter with an on/off collar and a front wheel;
  - strap-lug rings;
  - on the back, a screen and an eyecup;
  - a 1.2-wide lens hanging below the body: mount, hairline copper ring, a ribbed zoom ring, a printed mid section, a focus ring, a glossy front barrel with print, and domed glass.
- **No name on it** (his note).
- **Materials:**
  - flecked satin;
  - a Voronoi-bumped leather grip;
  - knurled metal with engraved rim marks;
  - ribbed rubber (normal ribs);
  - gloss black with print;
  - copper and bright metal;
  - coated glass;
  - for the burst only: a green board with gold traces and a violet sensor.
- **Lighting:** a white softbox up-left, a pink rim behind-right, a purple fill from below, and a studio environment in the reflections. ACES tone curve, display gamma (without it every dark tone crushed to black) and grain. The backdrop is the reference's glow in the site's pink → purple.
- **The film, 8.9s a loop** (his reference's beats, cut for a card):
  - 0–1.8s hero orbit in 3/4;
  - 1.8–3.5s macro push along the top plate;
  - 3.5s BURST, then a hang to 6.2s: the lens spreads along its own axis toward you with air between every ring (looking down a stacked column fused the rings into a tube), the top plate rises, the grip and screen pull away, the sensor, board and small parts float out;
  - 6.2s SNAP together (cubic in) to a front-on, with the softbox catchlight popping and a jolt;
  - hold to 8.4s;
  - whip spin into the loop.
- **Cost:** ~3–7ms a frame at full card resolution, measured in the throttled preview. Dev harness: `.local/menu-preview/cam.html?s=0.9,2.6,5,7.4` (gitignored) renders any moment.
- **Stills:** `round36-camera-film-strip.png`, `round36-camera-on-card.jpg`.

**Not judged yet:** in a real tab.

## Round 35 — the camera, from his product-film reference (2026-11-07)

**His note:**
> "i want something like this for camea and use this as refrence for camera model analyze the video first"

**Reference read** (`Screen Recording 2026-11-07 at 3.20.44 PM.mov`, 13s, vertical): a product film of a black full-frame mirrorless camera on an orange → deep-red gradient, with a glow behind the object. Sheets: `round35-ref-macro.jpg`, `round35-ref-explode.jpg` (4fps).
- **0–1s, hero orbit:** a 3/4 view turning, with the lens swinging toward the lens of the shot.
- **1–3s, macro push-ins** along the top plate in shallow focus: the knurled mode dial, the exposure dial, the buttons, the viewfinder hump with its brand, the print round the lens.
- **~3s, mechanics:** the SD card slides out of the side door, then the body splits as a cutaway.
- **~3.5–6s, exploded view:** the camera blows apart into a vertical column of parts (lens elements, rings, green boards, a violet sensor, the top plate) that hang and drift slowly for about 2.5s.
- **~6s, snap back:** the parts slam together into a dead-front hero; catchlights pop in the glass; it holds about 1.5s.
- **~12s, whip spin** to the back (the LCD), with motion blur and a chroma fringe, then it loops.
- **What makes it work:** the speed contrast. Slow drifting holds are cut by hard snaps (explode, assemble, whip). It's the same S-curve "BAAM" language as the SKILLS break.
- **Look:** black satin with a fine speckle, a pebbled grip, knurled metal dials, a thin copper ring at the lens mount, rim light on every bevel, a warm key from low right.

The camera model is rebuilt from it: a wide flat black body, a deep grip jutting forward on the left, a viewfinder hump with sloped sides, a leaning front and a hot shoe, a knurled mode dial, an exposure dial, a shutter, strap lugs, a big lens hanging below the body with a hairline copper mount ring, a knurled zoom ring, white printed markings round the front, deep glass with a green/violet coating sheen and two catchlights. The reference's brand plate says **JATIN in a 4×5 pixel font** (the site's pixel-piece language), never a camera maker's name. It sits on the card's rainbow slab in its starfield, like the computer; the orange backdrop is the reference's, not ours. Dev harness: `.local/menu-preview/art.html?k=1` renders the art big (gitignored). Stills: `round35-camera-closeup.png`, `round35-camera-on-card.jpg`.

**Proposed next (motion):** the reference's signature is the explode → hang → snap back. On the PHOTOGRAPHY card the camera would burst into its parts, hang them for a beat, then slam them together with the catchlights popping, on the same S-curve ramp as the break.

**Waiting on:** his read of the model; a go on the explode motion.

## Round 34 — the deck, and art for the new cards (2026-11-07)

Deck agreed (his notes): three cards, VISUAL DIRECTION, PHOTOGRAPHY, VIDEO EDITING. "not creative directon but visual direction", editorial shoots sit under photography, and colour + Fusion macros sit under video editing. Order: DIRECT · SHOOT · CUT, the same as the ABOUT tagline.

**His note:**
> "well keep visual direction and photography we dont need to show video editing cuz it's already there."

Art stills for the two new cards, in the same raymarched scene as the computer (`Space`, new uniform `uK`: 0 computer, 1 camera, 2 chair; `SkillFX.art(k)` switches it for checking):
- **PHOTOGRAPHY — a toy SLR**: beige top and bottom plates, a black leather band with a fine grain, a dark grip and shutter, a dial, strap lugs, a big knurled lens facing you, and deep glass with a rainbow coating sheen and a white catchlight. Scaled 1.25× and sat on the slab.
- **VISUAL DIRECTION — a director's chair**: beige crossed-leg frame, black canvas seat and back, and a foil megaphone (same rainbow as the tumbling shapes) lying on the slab. I picked it over a viewfinder because at card size a viewfinder reads as a telescope; the chair says "director" at a glance. Scaled .9× so it clears the SKILL tab.
Not wired to the deck yet: the cards still have one entry, with VIDEO EDITING copy. Stills `round34-art-*.jpg`, full frames in `2026-11-07-skills-art-camera` / `-chair`.

**Waiting on:** his read of the two stills.

## Round 33 — the menu's SKILLS goes chrome too (2026-11-07)

**His note:**
> "ok now in main menu as well switch the skils theme"

The menu's SKILLS item is chrome too (`#m-skills --acc:#c3cadf`). The living wedge blends its ramp toward the card's mirror ramp the greyer the accent is (`cr` in `livingWedge`), so SKILLS' triangle dithers black → steel → white and the coloured items are untouched. The selected SKILLS plate uses the light chrome ramp. Stars and the menu chain follow the steel accent. Before: `2026-11-07-menu-skills-green-before`. After: `2026-11-07-menu-skills-chrome` (+ `-phone`).

## Round 32 — the whole page in the card's chrome (2026-11-07)

**His note:**
> "can we give the whole skills page the same chrome theme that the card has ? right now it's green but i feel like there is so much going on that the card isnt getting that much attention"

The whole page goes monochrome steel, so the card's rainbow foil is the only colour on screen. `#sec-skills --acc` is now steel `#c3cadf`, and the world tint (sky, grid, streaks) is a darker steel `#8d96b2`. The bolt stripe dithers through the card's mirror ramp (near-black → steel → white, `CHROME` in DitherFX), so it reads as a chrome blade. The small plates (the selected skill plate, BACK) use a lighter chrome ramp with no black step, because the full ramp swallowed their ink type. The plate numbers, the banner's SKILL tag, the big 01 and the stars follow the accent instead of acid. The chains' red/cyan fringe and the heading's split stay: that's the site's print language, not the theme. The main menu's SKILLS plate is still green. Stills `2026-11-07-skills-chrome-page` (+ `-phone`); the before set is `2026-11-07-skills-menu-chain-design`.

**Not judged yet:** in a real tab.

## Round 31 — menu chain design, thicker near V (2026-11-07)

**His note:**
> "ok now i want the two front chains to be thicker. and could change chains design to what in main menu ? colours should be the same as now but design i want that"

The SKILLS links now use the menu chain's design, in the same chrome colours: the red/cyan offset fringe round every link, and the fine ink-dot screen printed into the face, which thickens toward the shaded end. Before this, the chrome palette switched both off (`mono`). Now `mono` only means "no fringe, no dots", and any palette can carry its own colour bands. The debris's dark sides and the grey hanging chunks stay mono, so the extrusion doesn't read as stripes. The near V that stays after the break went from 1.55 to 2.15× (×.55 on phones, as before). The card back's chain rays share the metal, so they picked up the design too. Stills `2026-11-07-skills-menu-chain-design`; the before set is `2026-11-07-skills-bolt-shake`.

**Not judged yet:** in a real tab.

## Round 30 — the bolt breaks the chains (2026-11-07)

**His note:**
> "ok the card design is in order but now it's time to work on the motion and animation of the thing. i need you to analyze the video for motion timing and animation of the chains coming and breaking. and how it feels impactful, right now the animation feels flat no real impact. especially when the chains breaks you can notice how the just break out of nowhere but in the refrence u can see that the chains breaks because of the red stripe comes and breaks the chain. we could change the background for this page in way that instead of the back green triangle we can use green stripe similar to how it is in refrence video."

**Frame read** (30fps; sheets `round30-ref-f00-17.png`, `-f18-35`, `-f36-51`):

| Frames | Beat |
|---|---|
| 0–5 | card tumbles in |
| 6–9 | card alone |
| 10–17 | chains GROW in from the edges, thin far ones first; the fat near one slams across last and shoves the card |
| 18–32 | dead-still hold (~0.5s): the tension |
| 33 | red tip at the top-right corner |
| 34–35 | a long wedge stabs down-left at the card |
| 36 | the full Z band; it stays as the background |
| 37–38 | the chains break two frames after the stripe lands, where it crosses them: it is the cause |
| 39–51 | **speed ramp**: chunks blow at the lens for ~3 frames, then turn dull grey and hang in slow motion, drifting off; banner lands at f40 |

What made ours flat: the break came from nowhere (the acid slash was decoration and passed before), the hold trembled instead of holding still, and the generic flash / shockwave / speed lines filled the moment with noise instead of a speed ramp.

**Built:**
- **The bolt.** SKILLS' triangle is gone. Its band is now a green Z bolt cut on the whole screen (`BOLT` in SkillFX, `#sec-skills .secBand`), hidden in the corner until STRIKE (1100ms), then on 2s: tip, wedge, full band (1167ms). It keeps the dither and the red/cyan edge, and stays as the background. The menu chain loop no longer follows into SKILLS (it lived on the triangle). The acid slash is deleted.
- **Chains** grow in thin-first (330ms+), fat last; WHIP 110ms. The last fat one locking shoves the card (`kicks`).
- **Hold** is dead still. The strain (tremble) starts when the bolt lands.
- **The bolt landing shoves the card** harder, down-left along the bolt.
- **Break at 1260ms**, two frames after the full bolt. A speed ramp: 130ms at full speed, then 12% speed. Chunks grow at the lens, turn dull grey (`GREY`) after 100ms and fade by 1.7s. No flash, shockwave, speed lines or bursts. The banner lands 60ms after the break.
- The rig chains (round 29) still survive the break.

**Stills:** before `2026-11-07-skills-before-bolt`; after `2026-11-07-skills-bolt` (+ `-phone`). `snap.mjs` SKILLS holds re-timed to the new beats.

**His note on it:**
> "ok so the impact should be just for a second right now the slow motion is too long and the cards shakes too much and too long. it should go like BAAM! in editing terms like an s graph in speed ramping."

So the break is now an S-curve speed ramp (`speed`/`ramp` in SkillFX): full speed for 70ms, eased down to 15% by 170ms, hangs to 320ms, then eased back UP to 2.2× by 500ms so the chunks clear the frame. Faded by 950ms, done at 1s. Card shake cut to under half (14/10px, 3% punch, 100ms), the bolt and chain-lock shoves halved and gone in ~100ms, strain tremble halved. Stills `2026-11-07-skills-bolt-ramp`; the long-slow-mo version is `2026-11-07-skills-bolt`.


**His next note:**
> "ok the card shak should only there when impact came from the stripe it shouldnt be that long still. a very hard shake for just like 0.5 secs"

The card now shakes once, and only from the bolt: a very hard shake (up to 46×34px, ±.06rad, 5% punch) starting the moment the bolt lands. It steps to a new offset every 33ms and decays to nothing in exactly 0.5s, covering the break. Gone: the nudge when the chains lock, the strain tremble on the card, and the separate break shake. The chains still tremble under the bolt. Stills `2026-11-07-skills-bolt-shake`.

**Not judged yet:** the shake and the ramp in a real tab.

## Round 29 — the chains that stay, and the banner out of the card (2026-11-06)

**His note** (on round 28, with a marked-up screenshot `round29-his-sketch.webp`):
> "Hmm looks better still needs work. so after the animation the screenshots show how i want the page to look like white line indicate chains thickness thinner mean a bit far thickers means closer and red outline is the video editing box that comes out of the card so it looks attached."

**Read:** the entrance stays; his white lines are chains that are still on the page *after* the break. Two of them:
- a thin, far run behind the card, from high on the left edge to low on the right;
- a fat, near chain sagging in a V whose point sits on the bottom edge just under the card, one arm to the left edge, one to the right.

The red box: the info banner should come out of the card's right edge at mid-height, angled up to the right, so it reads as attached.

**Built:**
- `RIG` in `SkillFX`: those chains, defined in card half-sizes like `CHAINS`, plus a `half` flag (the V's arms start at its point). They whip in with the binding chains, tremble in the strain, don't break, jolt on the break (damped kick plus a split), then scroll slowly (0.9 links/s) for as long as SKILLS is open, redrawn at 30fps. The thin one is behind the card; the V is in front. Only the six binding chains shatter.
- The V's point is pinned to the frame's bottom edge on every screen. On a phone the V is drawn at 55% so it doesn't bury BACK and the plates. BACK sits over the chains in SKILLS (z9).
- Banner: z5, under the card. Its left end is tucked behind the card's right edge at mid-height (`top:56vh`), turned -9°. It slides out along its own angle while a clip holds its left edge at the card, so it is pulled out from behind the card, never flown in. The SKILL tag moves right so it clears the card.

**His second note, same round:**
> "i dont want the card models to reacting to the curser but i only want the art/photo on card to react to my curser and keep card model in the same position like in screenshot"

So the card no longer tilts, and its foil and drop shadow no longer move, with the pointer. It holds its resting tilt. Only the art inside the window (the 3D scene's parallax) and the back's JATIN mark still follow the pointer; the foil keeps its slow idle breathing.

**His third note, same round:**
> "looks better but i want the card to be tilted towards the top right corner. looks too flat right now"

The card now rests turned in 3D to face the top-right (`RYAW=.55`, `RPITCH=.3` on top of its -.15 roll): its top and right edges fall away from you. A first pass at .34 / .2 still read flat in stills. When flipped, the back shows the mirror turn. Stills `2026-11-06-skills-card-turn`.
Then: "it's bit much i wanted it to be subtle". Settled at `RYAW=.3`, `RPITCH=.16`: a light lean you feel more than see. Stills `2026-11-06-skills-card-turn-subtle`; the too-strong version is `2026-11-06-skills-card-turn`.

**Stills:** `docs/process/stills/2026-11-06-skills-rig-banner/` (+ `-phone`). The before is round 28's `2026-11-06-skills-confidant-entrance`.

**Not judged yet:** the jolt and the banner slide in a real tab.

## Round 28 — the entrance, re-read from the Confidant recording (2026-11-06)
**His note** (same `Screen Recording 2026-10-28 at 9.00.21 PM.mov`): "right now the card is just floating up but angle i want you to analyze the refrence video. and you will notice that there is similar chain theme to it as well where the chains come in and break and skill card shows. analyze the video and replicate it using our design language."
**Frame read (30fps, 52 frames, 1.73s)** — key frames in `ref-confidant-keys.png`:
- f1–6 (0–.2s) **tumble-in at its spot**: the card appears already where it will rest, big and turned ~45° (diamond), and spins/shrinks onto its −9° tilt in five frames. It never travels up from below.
- f7–11 (.2–.37s) **hold**: card alone, still.
- f12–17 (.37–.57s) **chains shoot in** from off-frame along straight diagonals, staggered (bottom-right, bottom-left, then down from the top), two depths: thin far chains behind, fat near chains in front, crossing over the card. They arrive, not wrapped round it.
- f18–39 (.6–1.3s) **hold, chained**: the tension beat. Nothing moves much.
- f40–43 **slash**: a red Z-bolt wedge rips across from top-right.
- f44–47 **break**: links turn into chunky extruded pieces (dark sides), flung outward and at the lens, silhouetted on the slash.
- f45–48 **banner slams** on the card's right; the big numeral pops; stars.
- f48–52 debris drifts out; settled.
**Ours today:** the card rises from 62% down the section, spins one full turn already wrapped in chains, snaps on landing. Wrong order: the chains should come after the card lands, and the card shouldn't rise.
**Built (his "Yes, build it"):** `SkillFX` entrance rewritten — `ENTRY=200` tumble-in on the spot (ease-out spin from +.85rad, scale 1.75→1, yaw −1.1→0, tiny overshoot), `CHAINS` table (anchor in card half-sizes, travel angle, depth scale, front/back, delay) fired at `CHAIN=370`, `WHIP=160`, `STRAIN=260` tremble + pull-taut, `SLASH=1330` (`fireSlash`), `SNAP=1470` break with extruded chunks (`DARK`/`SIDE` flat mono palettes, no fringe) and banner + plates (`restage`). Deals unchanged. `hold(ms)` stills are deterministic now (break seeded, `brokeAt=t0+SNAP`). Stills `2026-11-06-skills-entrance-before`, `-confidant-entrance`, `-confidant-entrance-phone`.
**Not yet judged:** motion in a real tab (the preview pane was hidden; timing checked by stills and code). Hold stills show the banner early — it's left over from the live entrance before `hold()`; live, it lands on the break.
