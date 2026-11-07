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
