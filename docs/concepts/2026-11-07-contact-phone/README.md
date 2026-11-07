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
