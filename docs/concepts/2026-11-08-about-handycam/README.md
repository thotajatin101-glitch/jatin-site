# ABOUT — the handycam projector

Started 2026-11-08. Replaces the "Have you seen this DIRECTOR?" poster (`2026-10-26-about-poster`).

## Round 1 (2026-11-08)

> "alright now it's to work on the about page. the refrence showcase a camera kind of makes a projection from it's lens and around it u can see the same similar stripes like what have in the about page on top bottom but i want them to be angle like in the refrence with a similar 3d handycam. one is the base screenshot refrence and the other is my drawing. where i drew where my photo is going which is blue outline and chains are the green outline. (yes we are redoing the desing of the about page"

**His references:**
- A collage frame: a lavender 3D camcorder top-left throwing a white projection beam out of its lens, edged by
  cyan/magenta stripes on top and yellow/green underneath, with halftone dots, a purple glitter spike and an acid
  bolt at the lens, and a city in the light.
- His drawing over it: his photo in the beam (head at the tower top, ~69% across, a third of the way down), and two
  chains. One sweeps up across the bottom; one rises from the beam's lower edge behind his neck and off right.

**Built:**
- **One point drives the page: the lens** (`AboutFX.layout`).
  - The beam is ABOUT's own cyan triangle (`.secBand`), clipped between two edges out of the lens.
  - **The pink and purple banners became those two edges.** Thin at the lens, widening out like a projection.
    Same ink drop, paper rule, notch, red/cyan edge and dither as before.
  - At the lens: a white Bayer light fan inside the beam, a halftone burst in the palette, a magenta glitter flare
    and an acid bolt off the top band.
- **`CamFX`, the handycam, raymarched like the phone and the computer.**
  - Lavender pearl metal with our ink dots printed on the model.
  - The body flows into the lens barrel, with a ribbed focus ring, chrome trim, a hood with a black rim and coated
    glass.
  - A closed flip-out screen with a raised pink enamel heart (the reference's heart, done as our badge).
  - Viewfinder and eyecup, zoom rocker, a red REC lamp.
- **He stands in the beam,** his head poking above the top band. His photo's cut arm sits on the frame edge.
- **The chains follow his green lines:** A in front across the bottom, B from under the purple band, rising
  behind his neck.
- **The DepthFX vanishing point is the lens,** so the world's streaks radiate out of the camera.
- **Entrance:**
  1. 0–700ms: the camera swings in from off the top-left.
  2. 0.6s: the projector comes on; the beam, bands and light scale out of the lens.
  3. 0.74s: he lands in the light with a flash.
  4. 0.82s: the chains whip in.
  5. ~0.9–1.1s: the words pop.
- **Phone:** the lens sits higher and the beam opens down the page. The bubble sits above him, the name low.

**My calls:**
- The section's cyan stays as the beam's colour, so ABOUT keeps its menu colour.
- The heart is pink enamel, not plain metal.
- BACK moves to the default bottom-left, because the camera owns the top-left.

**First pass (dropped):** black grip, black hood and darker metal read as a CCTV camera. It was fixed to the pale
body with the black only on the hood's rim.

Stills: `stills/2026-11-08-about-handycam-round1/` (+ `-short`, `-laptop`, `-375`); before:
`stills/2026-11-08-about-before-handycam/` (+ `-375`).


## Round 2 — cover the frame

> "this scree i scribbled over to to tell you that i wanted the whole part to be covered over like."

His notes were scribbles on the round 1 still: purple over the camera side, pink over the top, and green lines
out of the lens along both bands.

**Built:**
- **Two dithered fields** fill everything outside the beam, split on a ray from the lens to the top-left.
- **The fields are a shade deeper than the bands.** At equal strength the bands were lost.
- **Chains B and C** come out of the lens and ride the pink and purple bands. B passes behind his head. Both
  scroll outward.
- **Chain A** still crosses in front of him.

Stills: `stills/2026-11-08-about-cover-round2/` (+ `-short`, `-laptop`, `-375`).


## Round 3 — name up, chains cut, a soft meet

> "ok i want you to move the name to the location i marked and remove the chains i pointed towards. and when purple and pink colors meet i want the area to merged like a gradient smoothly"

**Built:**
- **The JATIN tag moved into his box,** in the pink field top-right, bigger.
- **The two band chains are removed.** Chain A stays.
- **Pink fades into purple** over about 40% of the short side. The pink field is masked by a linear gradient
  across the split ray.

Stills: `stills/2026-11-08-about-round3/` (+ `-short`, `-laptop`, `-375`).


## Round 4 — no chains

> "remove the last chain as well"

Chain A removed; ABOUT now has no chains. Stills: `stills/2026-11-08-about-round4-no-chains/` (+ `-375`).


## Round 5 — one chain on his path

> "now i want you to add a chain in the path i drew. thinner lines mean it looks smaller and gets bigger and get closer like how we did in the main menu area."

**Built:**
- **One chain on his green line,** in perspective like the menu's: small and far in the beam, behind his head,
  round the right over the pink band, then in front of him and huge off the bottom-left.
- **It feeds in from the distance** as the light lands, then scrolls toward the viewer.
- **Phone:** the same idea on a shorter path.

Stills: `stills/2026-11-08-about-round5-chain/` (+ `-short`, `-laptop`, `-375`).


## Round 6 — the camera's entrance

> "ok now for the intro of the camera. basically i want the projection to be part of the camera, in the screenshot u can see that the camera comes from bottom left and it's bit far and comes really close like it was about to hit and and goes back to it's postion and then beam of light it projects turns into the projection we have."

His drawing:
- a far camera bottom-right;
- a huge head-on camera in the middle with the lens circled;
- the camera back at its spot;
- the beam lines out of the lens.

**Built:**
- **The fly-in:** small and far bottom-right, rushing at you (ease-in, turning head-on) until the hood is about
  60% of the short side. A jolt, then it pulls back to rest (ease-out quart), 950ms in all.
- **The projector:** a thin white ray fires out of the lens (140ms), then opens into the cyan projection and the
  stripes (320ms) as the white burns off.
- **Before that, the frame is all pink/purple fields.**
- **Then:** he lands, the chain feeds in, and the words pop.

**My call:** I followed the drawing's bottom-RIGHT start over the message's "bottom left".

Stills: `stills/2026-11-08-about-round6-intro/entrance-sheet.jpg` (and the phone one in `-375`).


## Round 7 — roll in smoothly

> "i want the camera rolling in smoothly like how other 3d models come in."

**Built:** one continuous move instead of rush → jolt → pull-back. It's a single ease-out cubic (1s), as on the
computer and the phone. A full roll settles as it comes. It swings close past you head-on, then glides back to
rest, along one smooth curve.

Stills: `stills/2026-11-08-about-round7-roll-in/`.
