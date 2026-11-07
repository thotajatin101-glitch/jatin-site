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
