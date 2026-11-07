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
