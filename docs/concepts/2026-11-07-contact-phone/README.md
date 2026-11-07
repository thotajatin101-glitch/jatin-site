# CONTACT — the 3D flip phone

Two references from him (in this folder): `ref-silver-clamshell.webp` (a silver clamshell lying open: the shape) and
`ref-chrome-lcd.webp` (a chrome phone whose backlit LCD reads like a message: the screen's language).

## Round 1 — the model and its entrance (2026-11-07)

**His note:**
> "alright now it's time work on the contact page. Similar to what we did to 3d computer i want to make 3d flip phone and here are the refrence for it."

**Direction (mine, to defend):** the body is the silver clamshell; the screen is the chrome reference's LCD. The LCD
is backlit in CONTACT's acid, the yellow-green of real phones from that era, so the page's colour lives inside the
object instead of being painted on it. No glow around the phone and no spikes yet (the spiky chrome shell is the
SKILLS case's language; I kept it off so the two pages don't blur together).

**Built** (`PhoneFX`, the same way as the computer: no library, one raymarching shader, a canvas over the section):
- **Shape:** rounded crown on the lid and on the bottom of the base, square at the hinge; a three-knuckle hinge
  barrel; earpiece slot; a dark gloss face round a window-set LCD; a small outer display on the lid's back.
- **Keys:** the nav ring with a lit acid centre key, two softkeys and MENU / END, C, and a 4×3 keypad with printed
  digits and letters. All raised, so the light catches them.
- **Look:** satin silver in a cool studio (softbox up-left, a chrome horizon streak, a blue rim from behind like the
  chrome reference, a big front fill, the acid wedge bouncing in from the right), filmic tone curve, fine grain,
  the site's red/cyan edge fringe at rest.
- **LCD:** VT323 pixel type: 11:11, bars, battery, "Got a vision? / LET'S MAKE IT.", softkeys Options / Contacts.
  Wide LCD lines (a finer pitch aliased into diagonal bands). Placeholder copy until he gives his.
- **Entrance:** it rises closed on one fast turn (0.9s); a breath of anticipation; at 1.06s the lid SNAPS open, a touch
  past open, and settles with a kick through the whole phone. A white flash on the LCD at 1.24s, then it's lit.
  After that it floats very gently. It never follows the cursor.
- **Phone width:** the 3D phone takes the page under the heading. The placeholder contact card is hidden there
  (still readable to screen readers) until its lines move onto the LCD.

Stills: `process/stills/2026-11-07-contact-phone` (+ `-1440`, `-375`); before: `2026-11-07-contact-before-phone`.
Entrance: `round1-entrance-sheet.jpg` (200, 500, 800, 1040, 1100, 1180, 1260, 1320ms, rest).

**Next (step 2, proposed):** the phone is the contact page. The keypad works: arrows press the D-pad, the LCD becomes
a contacts list (EMAIL / INSTAGRAM / …) and the lit centre key "calls" the selected one (opens the link). The card
goes away on every size. Needs his real email and handles.

## Round 2 — 2026-11-07: decorated chrome, our palette

**His note:**
> "ok right now the flip phone looks poorly modeled here are some reference that fits our theme. i want your to analyze every detail of the refrence and understand and pay attention to them. the model right now is plain has no textures and feels bland and flat try to incorporte this design style while also adding in out design style and theme. u can remove the text boc in page as well"

Two new references (`ref-r2-pearl-deco.webp`, `ref-r2-pink-keypad.webp`).

**What I read in them:**
- Pearl / decorated clamshell: puffy, inflated chrome, never a flat slab. A raised rolled rim on every face with the
  face sunk inside it. A thin-film shift (pink, lilac, blue) at the edges. The outer display sits in a fat double
  chrome bezel. A camera boss. Stones everywhere: faceted crystal hearts, an iridescent star, rhinestones, a rhinestone
  flower, chrome outline charms (four-point sparkle, moon), and glossy jelly charms (butterfly, bone). A bead strap:
  chrome balls, pastel glass beads, a star bead. Hard four-point sparkle flares.
- Pink chrome keypad: black gloss keys framed in chrome, white print, call and end handsets, a chrome nav ring with a
  faceted pink stone, chrome four-point star studs at the bottom corners, a pill mic slot, a pink chrome hinge.

**Direction (mine, to defend):** it is still our object, not a copy. The chrome reflects a studio built from the
site's palette (hot pink panel, cyan rim, the acid wedge, white softboxes), so the colour comes from the world, not
from paint. The pearl's thin film runs through pink, lilac, cyan and acid. Both screens are 4×4 Bayer-dithered like
every gradient on the site. The red/cyan edge fringe stays. Sparkles are hard four-point shapes, no soft glow.

**Built:**
- **Body:** pearl chrome mirror with the palette thin film; each half bows out on both faces (a pillow), with a
  rolled rim and a sunk tray on every face. The bow is what makes flat chrome sweep through the studio instead of
  reading as one flat colour (round 1's problem).
- **Hinge:** hot pink chrome, three knuckles.
- **Keypad:** black gloss keys with a slight wave on top, chrome frames, white print; green call and pink end
  handsets; a fat chrome donut nav ring with a faceted pink stone; chrome four-point star studs; mic slot.
- **Lid inside:** the acid LCD (now Bayer-dithered) in a puffy chrome bezel; a crystal heart and an iridescent star
  either side of the earpiece (which has its own chrome ring); under the screen a chrome sparkle charm, a rhinestone
  flower, rhinestones, a big blush crystal heart and a pink jelly bone.
- **Lid outside** (seen on the closed turn in): camera boss, a second display in a chrome bezel (a Bayer pastel ramp,
  JATIN in Cyberway Riders, pink with a cyan ghost), its own stones.
- **Strap:** a cord out of the hinge's right end into a loop of 18 beads: chrome balls between glass beads in pink,
  cyan, acid and lilac, a star bead at the bottom.
- **Glints:** hard four-point sparkles on the hearts and the pink stone, appearing when the screen boots.
- **Page:** the text box is gone on every screen (kept for screen readers until step 2 puts the links on the LCD).
  The phone moved toward the middle of the page.

**Cut / changed:** the satin silver and the cool blue-rim studio (read flat and bland); the lit acid centre key (now
the pink stone, as in the reference); the dark gloss face round the LCD (now pearl with stones).

Stills: `process/stills/2026-11-07-contact-phone-round2` (+ `-short` at 1440×700, `-375`). Round 1 is kept in
`2026-11-07-contact-phone`. Entrance: `round2-entrance-sheet.jpg` (300, 600, 900, 1080, 1200ms, rest).

**Not checked yet:** frame cost in a real tab. The shader does much more work per pixel now (stones, strap, glints).

## Round 3 — 2026-11-07: posture, a sunk hinge, a real keypad compartment, the site's look

**His note** (with his crop of the hinge, `r3-note-hinge.png`, and two references: `ref-r3-pink-posture.webp`,
`ref-r3-hinge-keypad.png`):
> "kinda better but still needs work. first of the phone is bending outwards too much look at the position from the refrence to understand the phones posture. and the and the middle compartment is buldging out like a sore thumb. and next look closely at the last refrence the refrences keypad that design is darker with a proper compartment type not just buttons coming out of the model. finally make the screen a bit bigger as well. i need the phone to have more of the website design theme it doesnt feel like that right now."

**Built:**
- **Posture, from the reference:** open just short of flat, so the lid tips slightly toward you (it used to lean back
  past flat). The phone lies on a diagonal, top to the left, nearly face-on. The faces barely bow now (0.07 instead
  of 0.2).
- **Hinge:** set back into the joint, barely proud of the faces. The middle barrel is the body's pink and the end
  knuckles are gunmetal chrome, as in his close-up reference. It no longer sticks out.
- **Keypad:** a black gloss compartment sunk into the face, with a pink rim round it. Keys sit inside it, nearly flush,
  in rows that wave like the reference's. They are black with chrome edges, and the edges read as the bright
  dividers. The softkeys and the chrome nav ring with the pink stone sit inside it too. The C key is gone (the
  reference has none). The chrome star studs sit on the rim below.
- **Screen:** bigger (0.40 × 0.51, was 0.33 × 0.40) in a slimmer bezel. The stones were re-laid round it.
- **The site's theme:**
  - Both screens are black, like the reference's screen. Behind the words is the site's shatter: a fan of palette
    shards out of a vanishing point, Bayer-dithered, with a dark hold behind the words like the one behind JATIN.
  - The LCD reads SAY HI in Cyberway Riders with the glitch split (cyan left, pink right, black drop), with cyan and
    acid VT323 lines. The outer display reads JATIN.
  - The body is pink chrome (the reference's colour, and the site's pink). It carries the site's print screen:
    small ink dots at 23° that swell into its shadows.
  - A hard ink rule runs round the silhouette, like every sticker on the site, under the red/cyan fringe.
- **Strap:** moved to the hinge's left end, and it hangs with gravity whatever the phone's tilt.

**Cut:** the acid backlit LCD and the pastel outer display (off-theme); the C key; the pearl body (pink chrome now,
with a little pearl at the edges); the pillow bow.

Stills: `process/stills/2026-11-07-contact-phone-round3` (+ `-short`, `-375`). Round 2 kept in `-round2`, and its
page in `.local/snapshots/2026-11-07-phone-round2-index.html`. Entrance: `round3-entrance-sheet.jpg`.
**Not checked yet:** frame cost in a real tab.

## Round 4 — 2026-11-07: the SKILLS card's pose, lime, a chain strap

**His note** (with his round-3 still `r4-note-tilt.webp`, a crop of the reference's lid top `ref-r4-lid-top.png`, and
the beads `r4-note-beads.png`):
> "it's too tilted to the left. ok take inspiration from our skill cards angle and how it's facing. revert the screen ui for now. change the beads to our chains concept instead and i want the phone colour to not be pink instead a yellow lime colour"

**Built:**
- **Pose:** the SKILLS card's resting pose (tilt .15, turned .3 toward the top-right, pitch .16) instead of round 3's
  diagonal.
- **Colour:** lime chrome (`vec3(1,1.08,.5)` base), a little pearl at the edges, the halftone ink in its shadows.
- **Screens:** back to round 2's (the acid Bayer LCD, the pastel JATIN outer display), sized to the bigger window.
- **Strap:** the beads are gone. It is now a loop of the site's pixel-piece chain (ChainFX links, the section's acid)
  off the hinge's left knuckle. It hangs in world space, so it always drops straight down. Each link is projected with
  the shader's camera onto a canvas behind or in front of the phone (`.phChain`), and the snap sets it swinging.
- **Lid top** (my read of his crop): a round crystal in a chrome ring at the top centre, chrome four-point star studs
  in the top corners. This replaces the earpiece slot, the heart and the star.

**Watch:** the lime goes a little olive where it reflects the dark lilac sky; the LCD and the body are now both
yellow-green, so the screen reads mostly by its bezel.

Stills: `process/stills/2026-11-07-contact-phone-round4` (+ `-short`, `-375`). Round 3's page is saved in
`.local/snapshots/2026-11-07-phone-round3-index.html`.

## Round 5 — 2026-11-07: his sketched angle

**His note** (with his outline drawn over round 4, `r5-note-angle-sketch.webp`):
> "i have outlined how i want the phone to be angled the way it's facing right is right but it's needs tilted back a bit and facing that way."

**Read from his outline:** the lid leans about 9° further to the left than round 4, and the lid draws shorter than the
base: it recedes, so the phone is tipped back about the hinge. The turn to the right stays.

**Built:** REST yaw .3 (kept), roll .15 → .3, pitch .16 → .34. A side-by-side at pitch .16 and .42 was checked first
(the lid foreshortens as he drew it). Tipped back, the lid reflects more of the sky, so the sky was lightened.

**Watch:** the lid face still runs darker olive than the base, with heavier halftone.

Stills: `process/stills/2026-11-07-contact-phone-round5` (+ `-short`, `-375`).

## Round 5b — 2026-11-07: rolled back a bit

**His note:**
> "i want you to roll it back a bit"

The lean and the tip-back are each eased halfway back toward round 4: roll .3 → .22, pitch .34 → .25. Yaw .3 is kept.
Stills: `process/stills/2026-11-07-contact-phone-round5b` (+ `-375`).

## Round 6 — 2026-11-07: a sitting angle

**His note** (with round 5b's still, `r6-note-head-in-front.webp`):
> "u havent rolled back enough at all. it feels like the head of phone is in front and bottom in the back. just angled it in a sitting angle."

**What went wrong:** in rounds 5 and 5b the pitch had the wrong sign. Positive pitch brings the lid's head TOWARD the
viewer, so "tipped back" came out as tipped forward, and easing it halfway only softened the wrong direction. The lid
folding toward the viewer (`TH` .24) added to it.

**Built:** pitch −.38 (the top goes away, the bottom comes near: a phone sitting back), fold `TH` .24 → .12, roll .22,
yaw .3. I compared −.2 and −.38 side by side and took the stronger, since he said it hadn't gone back enough. The
lime is a touch more saturated (`.95,1.08,.36`), because the new angle reflects more of the bright front fill.

Stills: `process/stills/2026-11-07-contact-phone-round6` (+ `-short`, `-375`).

## Round 7 — 2026-11-07: the tone comes back, the lid bends forward

**His note** (with a crop of round 5b's dotted lid, `r7-note-dither.png`):
> "why is the gradient dither tone on the phone gone ? and bend the top part of the phone to the front a bit."

**Why it went:** the halftone only printed below mid-grey. At round 6's angle the lime caught the bright front fill
and went almost white, so no dots were left.

**Built:**
- The front fill is down to .8 (from 1.3), so the faces keep a tonal gradient.
- The dots now run across the whole tonal range (`tone=smoothstep(1.,.12,lu)`): small in the light, swelling into the
  shade.
- The lid folds toward the viewer a little more (`TH` .12 → .3) while the body keeps its sitting angle.

Stills: `process/stills/2026-11-07-contact-phone-round7` (+ `-375`).

## Round 8 — 2026-11-08: more contrast, a hanging chain, a JATIN tag

**His note:**
> "i want the light to create more contrast on the model. and chain link i dont want it looped just a chain hanging and make it have realistic movement. and all add a JATIN title tag to the end of the chain"

**Built:**
- **Light:** a darker room in `env()` (sky base .03 → .42), the bounce card halved, the key softbox up to 4.2, the
  front fill down to .5 and falling off toward the lower right. Metal multiplies by `mix(.38,1.2,dk*sh)`, so the key
  side reads lit and the far side drops. The halftone still shows (check it after any light change).
- **Chain:** the loop is gone. A verlet rope in world space (`ropeStep`): 4 links of .072, gravity 11, fixed 120Hz
  substeps, 14 constraint passes, the tag end heavier. Pinned to the hinge's left knuckle (`SA`, z .035 so it sits on
  the near side of the knuckle) with the phone's lift included, so the rise, the turn and the lid's snap all move it.
  A slow two-sine breeze after the snap keeps it from hanging dead. `hold()` re-simulates from zero, so stills are
  exact; reduced motion hangs it still.
- **Tag:** a tall black hang-tag (`tag()`): punched hole, acid rule, red/cyan offset, a Bayer sheen, JATIN up its
  length in Cyberway Riders with the glitch split. It hangs off the last link, turned along it, and twists on the
  chain (narrowing as it turns). Tall, not wide: the left side of the phone leans away, so the strand hangs just
  behind the body's edge, and a wide plate disappeared behind it (round 8a).

Stills: `process/stills/2026-11-08-contact-phone-round8` (+ `-short`, `-375`). Round 7's page:
`.local/snapshots/2026-11-07-phone-round7-index.html`.

## Round 9 — 2026-11-08: the dots on the surface, an electric-blue screen

**His note:**
> "the dither effect on the phone looks like an overlay but i want it integrated into the model itself properly. also could change the screen to electric blue that we use ?"

**Why it read as an overlay:** the dots were a screen-space grid (`gl_FragCoord`), so they stayed put while the phone
moved under them and never followed a curve.

**Built:**
- The halftone is printed in the half's own coordinates (the lid's via `lid()` when `p.y>.05`), projected on three
  planes and blended by the normal (`w=|n|^4`), at 23°, pitch `5·uDpr/(.717·uS)` (~5px on the face at rest),
  antialiased by `ndv`. Dots wrap the rims, foreshorten on the turned faces and ride with the model.
- The ink is a deep, purple-shifted shade of the colour under it (`c·(.2,.13,.3)+(.035,0,.06)`), not a flat stamp.
- The LCD is OUTSTATION's blue ramp (`#0a1670 → #1b3fd0 → #2a66f0 → #1fb4f0 → #00f0d8`) with pale type; the
  shader's backlight tint is neutral now.

Close-up: `r9-dots-before-after.png` (left round 8, right round 9). Stills:
`process/stills/2026-11-08-contact-phone-round9` (+ `-short`, `-375`). Round 8's page:
`.local/snapshots/2026-11-08-phone-round8-index.html`.

## Round 10 — 2026-11-08: no dither on the screen or its frame

**His note** (crop of the LCD, `r10-note-lcd.png`):
> "i dont want the dither to on the lcd screen and the frame around it tho i like to keep it for the rest phone tho"

**Built:** `lcd()` paints the blue ramp with `smooth()` (the same stops and falloff as `bayer()`, linearly blended) instead
of Bayer cells. The halftone skips the chrome bezel round the LCD (material 13 on the lid inside |x|<.27, |y−.52|<.32);
the earpiece ring, studs and every other surface keep their dots. The LCD's pixel lines stay (they are the panel, not
dither). Close-up: `r10-clean-lcd.png`. Stills: `process/stills/2026-11-08-contact-phone-round10` (+ `-375`). Round 9's
page: `.local/snapshots/2026-11-08-phone-round9-index.html`.

## Round 11 — 2026-11-08: the keypad tiled to his drawing, the screen panel clean

**His note** (his drawing over the keypad, `r11-note-keypad.webp`; the frame, `r11-note-frame.webp`):
> "this is a drawn overlay over the current keypad to show u how i want the button to be shapped like. and the frame around the lcd screen i meant outside the chrome ring area as well"

**Built:**
- `keys()` rewritten as a tiling. The 3×4 grid fills the well below `YT` (−.305) on the wavy rows (`RH` .134, `CW`
  .15), and the outer columns and bottom row run to the well's walls. Above it: a nav oval (half .074×.092 at
  (0,−.2)) with a chrome ring and the pink stone, plus four corner keys split at y −.2 that wrap round the oval. Each
  cap is the cell minus a .0045 groove, clipped to the well; the chrome sides read as the dividers. Label ids are
  unchanged (1–12 grid, 12–15 corners).
- Halftone off on the lid's inner panel round the screen (`sdR2(...,(.242,.295),.06)`, out to the rim), as well as
  on the chrome bezel. The stones below keep their dots.

Close-up: `r11-keypad-tiled.png`. Stills: `process/stills/2026-11-08-contact-phone-round11` (+ `-short`, `-375`).
Round 10's page: `.local/snapshots/2026-11-08-phone-round10-index.html`.

## Round 12 — 2026-11-08: the whole inner panel unprinted

**His note** (crop of the stones under the screen, `r12-note-panel.png`):
> "when i said around the frame then i meant these parts of the phone the panel around the lcd screen."

**Misread in round 11:** I cleared a margin round the screen and kept the dots under the stones. He meant the whole
panel. **Built:** the halftone skips the lid's entire inner tray (the tray's own `sdR2q` shape), and the rim stays
printed. Close-up: `r12-clean-panel.png`. Stills: `process/stills/2026-11-08-contact-phone-round12` (+ `-375`). Round
11's page: `.local/snapshots/2026-11-08-phone-round11-index.html`.

## Round 13 — 2026-11-08: a heavy gloss on the lid's inner panel

**His notes:**
> "yes that's the place now give that space a glossy shine finish as well" … then, on a first faint pass: "i want a heavy glossy finish it should look shiny"

**Dropped:** a plain clear coat (`env(rW)` + fresnel). The panel faces the lens, so it reflects the dim front of the
room, and it barely showed.

**Built** (shading, material 1 on the lid's inner tray):
- The lime goes deeper under the coat (`c·.45`).
- Reflections: `env(rW)·(.2+.9·fr)`.
- Three hard window strips on a diagonal. They are anchored on the panel and offset by `.3·rW.xy`, so they always
  cross it and slide with the reflection as it floats; edges are antialiased by `ndv`.
- A lacquer lip inside the tray edge.
- A pin spec at pow 900.

Close-up: `r13-gloss.png`. Stills: `process/stills/2026-11-08-contact-phone-round13` (+ `-375`). Round 12's page:
`.local/snapshots/2026-11-08-phone-round12-index.html`.

## Round 14 — 2026-11-08: the hinge barrel unprinted

**His note** (crop of the hinge, `r14-note-hinge.png`):
> "i want this extra dither over here to be removed as well"

**Built:** the halftone skips the hinge's middle barrel (material 1, |x|<.172, within .058 of the hinge axis). The
knuckles, the lid's rim and the body keep their dots. Before/after: `r14-hinge-before-after.png`. Stills:
`process/stills/2026-11-08-contact-phone-round14`. Round 13's page: `.local/snapshots/2026-11-08-phone-round13-index.html`.

## Round 15 — 2026-11-08: no dotted outline round the panel

**His note** (crop of the panel's bottom edge, `r15-note-outline.png`):
> "there is still and outline of that dither u can see want the removed as well"

**Built:** the inner-panel rule no longer requires a face-on normal and reaches .014 past the tray's edge, so the
tray's walls are unprinted too. Before/after: `r15-outline-before-after.png`. Stills:
`process/stills/2026-11-08-contact-phone-round15`. Round 14's page: `.local/snapshots/2026-11-08-phone-round14-index.html`.

## Round 16 — 2026-11-08: the dotted line by the hinge, actually gone

**His note** (`r16-note-dots.png`):
> "this outline of dots on the phone i dont want them" (arrows on the dotted line along the panel's bottom edge)

**Why round 15 missed it:** the halftone and the gloss tested "on the lid" as `p.y>.05` in body space. With the lid
folded toward the viewer, the bottom of its panel sits below that, so a strip next to the hinge was printed as body.
**Built:** both tests are now `p.y>.05 || (lid(p).y>.02 && p.y>-.03)`. Before/after: `r16-dots-before-after.png`.
Stills: `process/stills/2026-11-08-contact-phone-round16` (+ `-375`). Round 15's page:
`.local/snapshots/2026-11-08-phone-round15-index.html`.

## Round 17 — 2026-11-08: it follows the cursor, like the computer

**His note:**
> "can u make the phone react to the curser similar to how the 3d computer reacts"

This reverses the earlier "it never follows the cursor" rule, at his request.

**Built:**
- MonitorFX's parallax: yaw `+par.x·.5`, pitch `+par.y·.18`, where `par` is the pointer over the window, −.5….5.
- It is eased time-based (`1−e^(−5dt)`, about the computer's .08/frame at 60fps) and faded in with the float after
  the snap.
- It lives inside `angles()`, so the chain's pin follows it and the strap swings off the turns.
- `hold()` zeroes it, so stills stay exact.

Sheet (pointer left, right, up, down): `r17-cursor-left-right-up-down.png`. Round 16's page:
`.local/snapshots/2026-11-08-phone-round16-index.html`.

## Round 18 — 2026-11-08: a chrome case, like the SKILLS card

**His note** (reference `r18-ref-chrome-case.webp`, a phone in a spiked chrome bumper):
> "alright i want the phone to have metal chrome casing like how we did for skill cards as well. the refrence gives a better ideas on how it could wrap aroud the phone"

**Built (`caseD` in the shader, material 16):**
- **Two C-shaped bumpers, one per half.** Each is an oval-section tube round the half's own outline, centred .012
  outside the edge: .046 wide in plane, .1 (body) and .085 (lid) deep. It wraps the rim front and back and is cut
  open at the hinge (`smax` at |y| .075), so the lid still folds.
- **Ten horns, five per half,** on the sides, the crown and the bottom: straight tapered cones (`thorn`) to a .004
  needle point, blended into the rim (`smin` .02).
- **Shading:** the card's liquid chrome. A hard band palette, nearly half black, indexed by the reflection direction
  so the bands slide as it turns; a thin white edge at grazing angles, a pin spec, and a light thin-film tint.
- The march's bounding box grew to fit the horns.

**Dropped:** curled horns. Bending the cone's axis broke the distance field: only the tips drew, as floating ink
specks (`r18` first passes). Straight horns render cleanly; a real curve needs a proper bezier distance, not an
offset axis.

**Still to check:** the frame cost in a real tab. Every map call now also evaluates the case and ten cones, and the
bounding box is larger.

Entrance sheet: `r18-case-entrance.png`. Stills: `process/stills/2026-11-08-contact-phone-round18` (+ `-short`,
`-375`). Round 17's page: `.local/snapshots/2026-11-08-phone-round17-index.html`.

## Round 19 — 2026-11-08: tribal chrome clips on the corners, plain mirror finish

**His note** (two references of tribal chrome clips on a handheld, `r19-note-33/34.png`; round 18's banding,
`r19-note-35.png`):
> "you can see that chrome is too thick and shine to overlayed cause this layered look on it. my refrence provide the right thickens and look that i want for the chrome to look like. basically right the texture looks wrapped. but i want them to have simple chrome metal finish like the refrence and dont the case itself to be so thick. it's not a case per say but clip like case around the edges of the phone the refrences explains that well visually"

**Dropped (round 18):**
- The full bumper: too thick, a case, not a clip.
- The card's hard band palette: it read as a texture wrapped over the metal.

**Built:**
- **Four corner clips** (`caseD`): the body's two bottom corners and the lid's two top corners, on the front faces.
- **Each clip** (`clip2`, in the corner's own frame: x along the edge, y outward) is a round boss sitting on the rim,
  with four tapered arc blades (`blade`, exact 2D arcs):
  - a long sweep along the edge flicking out;
  - a shorter sweep the other way;
  - a horn curling back;
  - a small barb hooking onto the face.

  They are blended with `smin` fillets.
- **Domed, not slabbed:** `.003 + .013·(1−(1−k)²)` off the 2D distance, so it is thick down each spine and knife-thin
  at the edge.
- **Finish:** plain mirror chrome. It reflects the studio, shows only the bright parts (`smoothstep(.3,1.1,lum)`),
  goes half-desaturated, darkens where it faces the lens (the camera side), and has a white rim at grazing angles plus
  a pin spec. No bands, no film.
- The lid's clips sit on the inner face, so they appear as the lid snaps open.

Close-ups: `r19-clips-close.png`. Entrance: `r19-clips-entrance.png`. Stills:
`process/stills/2026-11-08-contact-phone-round19` (+ `-short`, `-375`). Round 18's page:
`.local/snapshots/2026-11-08-phone-round18-index.html`.

## Round 20 — 2026-11-08: the clips wrap over the edge

**His note** (`r20-note-wrap.png`):
> "i want them coming in wrapped from over the phone as well." (crop of the shut phone from behind, the clips only underneath)

**Built (`clipAt`):**
- The ornament is mirrored through the half's mid-plane (`abs(z−zm)`), so it sits on both faces.
- The back copy is smaller (.6 vs .82): the front is the ornament, the back is its grip.
- A rounded chrome spine (`sdR2` box through the full thickness) crosses the rim and joins the two, blended in.

**Watch:** shut, both halves' clips meet at the same corners (the lid's top corners land on the body's bottom
corners), so the rise shows a busy chrome cluster there. If he flags it, stagger the lid clips along the edge.
Close-ups: `r20-wrap-close.png`. Entrance: `r20-wrap-entrance.png`. Stills:
`process/stills/2026-11-08-contact-phone-round20` (+ `-375`). Round 19's page:
`.local/snapshots/2026-11-08-phone-round19-index.html`.

## Round 21 — 2026-11-08: smooth, rounded clips with a stone

**His note** (`r21-note-black.png`):
> "it looks blacked out and weird need it to look smoother and the chrome needs to shaped better take a look at the refrence again" (crop of the shut phone's corner: a black mass with specks)

**Cause:** round 19/20's domed profile (`max(d2, |z|−h(d2))·.6`) is not a distance field. On the stacked blades
the march ran out of steps, and the ink rule (`dm`) painted those pixels black, with specks.

**Built:**
- `clipAt` returns (distance, material). The ornament is a true rounded extrusion, `ext(clip2+.003, zz, .002,
  .0095)`, round in section.
- Blade roots are fatter (w0 .032/.027/.028/.018), with `smin` fillets of .016.
- Scale is 1.05 on the front and .72 on the back grip, plus the spine over the edge.
- A pink stone (material 7) sits in the front boss.
- The chrome is brighter: the camera-side darkening eases to .62, and reflections show from luminance .12.
- **The lid's clips moved off the corners, up its sides** (u.y .74, outward (±1,.3)), so shut they no longer stack
  on the body's bottom corners.

Close-ups: `r21-clips-close.png`. Entrance: `r21-clips-entrance.png`. Stills:
`process/stills/2026-11-08-contact-phone-round21` (+ `-short`, `-375`). Round 20's page:
`.local/snapshots/2026-11-08-phone-round20-index.html`.

## Round 22 — 2026-11-08: chrome that follows the contour

**His note:**
> "ok the it just looks like it broken and stuck into the pins of the phone right now. the case needs to look more intentin wrapped around the edges of the phone not like this"

**Dropped:** round 21's separate clips with stones (a boss plus blades placed at a point). However they are shaped,
a piece placed at a point reads as pinned on.

**Built (`cornerChrome`):** at each outer corner (the body's bottom two, the lid's top two):
- **A band driven by the half's own outline distance `o`.** Its section is a rounded box in (`o`, z): it sits on the
  edge with a lip over each face.
- **The band's size runs off the angle round the corner's arc** (`ang`, ±1.5 rad). It is full at the corner and
  tapers (`k^.75`) to points along both edges, in width and depth, and is cut beyond the range.
- **Tribal flares off the corner point,** in the phone's mid-plane:
  - two hooks curling out back to back;
  - a long sweep and a shorter twin peeling off along the edge.

  They use the exact 2D `blade` arcs and a round-section `ext`, joined with `smin`.
- The finish is the same plain mirror chrome.

Close-ups: `r22-contour-close.png`. Entrance: `r22-contour-entrance.png`. Stills:
`process/stills/2026-11-08-contact-phone-round22` (+ `-short`, `-375`). Round 21's page:
`.local/snapshots/2026-11-08-phone-round21-index.html`.

## Round 23 — 2026-11-08: leaf-pod hinge

**His note** (with green lines drawn on the reference, `r23-note-hinge.webp`):
> "alright now can we get the same shaped hinges from this refrence i drew with a green line so it can be easier for u to follow. i want it to be shaped kinda like this so yea"

**Built:**
- **The halves round into the joint.** The bottom corner radius on the lid and the top corner radius on the body go
  from .05 to .17. The trays follow (.03 → .14), so the rim keeps its width.
- **Knuckles are leaf pods** (`rcone`, an exact round cone). Each runs from a fat end by the barrel (r .07 at x .19)
  to a narrow tip past the side (r .03 at x .272, dropped .05 toward the body).
- The pods are body lime, printed like the body. The middle barrel is set back between them (half .15).

**Dropped:** a first pass with egg pods in the old gunmetal read as two black balls bolted on.

Before/after: `r23-hinge-before.png`, `r23-hinge-pods.png`. Round 22's page: `.local/snapshots/2026-11-08-phone-round22-index.html`.

## Round 24 — 2026-11-08: the site's marks as stickers

**His note** (crop `r24-note-stickers.png`):
> "can the stickers on the phone be something relatable to the website design ?"

**Built:** `deco()` rewritten; the shapes are new 2D SDFs `sdTri` and `sdLink`, plus `badge()`.
- **The marks:** the menu wedge, the pixel chain link (15x7 cells with a 9x3 stepped hole, tilted), the acid
  sparkle, P5 stars and a green sparkle, on both lid faces.
- **The badge:** a flat raised slab (`ext`, .014 thick) with a .004 black ink rule (material 6).
- **The colour:** materials 20–24 (cyan, pink, acid, magenta, green), lit in three Bayer-stepped tones in 3px
  screen cells, with a glossy reflection on top.
- **Kept:** the chrome stud sparkles on the inner corners.

**Dropped:** the crystals and the jelly bone, from the Y2K references; they were not the site's language.
A .0065 rule turned the thin sparkles black.

Close-ups: `r24-stickers-inner.png`, `r24-stickers-outer.png`. Round 23's page: `.local/snapshots/2026-11-08-phone-round23-index.html`.

## Round 25 — 2026-11-08: chained, ringing, two clicks

**His note** (references: a closed phone with a spiky "RING!" balloon, `r25-ref-ring.webp`, and a comic
exclamation burst, `r25-ref-burst.png`):
> "alright now intro animaiton for flip phone i want the phone to be chained up when arriving but it doesnt open automatically it stays chained and has ringing shake animation with comic pop up right outside next to the phone similar to refrence saying Click it but i want the same font like the refrence for this. once the use clicks then the chain break happens and there will be another arrow type of comic pop up that says click again but this time only click it and notification vibration as well."

**Built (`PhoneFX`):**
- **Arrives chained and shut.** Three loops of the section's pixel chain (a band and an X) live in the closed
  phone's own space, so they rise and turn with it, each link in front of or behind by depth.
- **Rings.** Two shake bursts and a breath every 1.7s (roll, yaw and lift at 15–27Hz). The outer display reads
  INCOMING CALL. A comic balloon, **CLICK IT!**, sits on the phone's upper-left edge and punches on every ring.
- **Click 1** (the phone, the balloon or Return): 70ms of strain, then the computer's snap: a flash frame, a
  shockwave, speed lines, impact bursts and links flying with smears, plus a shake punch. It stays SHUT.
- **Then it buzzes like a text coming in:** two short pulses every 2s, a lateral jitter. The outer display reads
  1 NEW MESSAGE. A pink comic arrow, **CLICK AGAIN!**, points in from the right with a white starburst on its tail,
  and jolts on each buzz.
- **Click 2 answers:** the lid snaps open (the old entrance beat, now on the click), the screen comes on, and it
  comes straight up into the chat. The buzz was a message, and the chat opens on "new message:". After EXIT it
  rests open, floating, and a click brings the chat back.

**Lettering:** Permanent Marker (Google Fonts, loaded with the existing non-blocking link), the nearest free face to
the references' brush lettering.

**On phones,** the arrow comes from above, tilted down at the top of the phone, because there's no room beside it.
Reduced motion skips the chains and pop-ups and rests open as before.

**My call:** click 2 goes straight into the chat, instead of only opening the lid and needing a third click.

Stills: `r25-two-clicks-sheet.png` (rise, ring, strain, flash, debris, buzz, open, lit, chat), `r25-pops-close.png`,
`r25-375.png`. Round 24's page with the chat: `.local/snapshots/2026-11-08-phone-round24-chat-index.html`.
