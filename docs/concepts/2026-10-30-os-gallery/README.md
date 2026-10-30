# JATIN OS gallery — his photos on the computer (2026-10-30)

Context: a Vogue application (apply mode lands straight on PROJECTS), so the
folders needed real work, fast.

## Round 1 — the exit ghost
**His note:** "when return from the folder there is a weird animation" (screen
recording).
**Cause:** the browse slide-in class stayed parked on the hero; when the
surface animation ended, the hero went back to the slide-in and it played
again. **Fix:** `openFolder()` clears it; `goTo(…,true)` waits for the
slide-in to finish.

## Round 2 — the photos
**His ask:** his `BEST` folder (Mag 1/2/3, outstation) into the folders, and
tests that it will hold up when hosted.
**Built:**
- `docs/tools/photos.mjs`: source → sRGB (some were Display P3 / Rec.709) →
  thumb 640w, full 2000px, zoom 3000px, progressive, every tag stripped (no
  EXIF/GPS on a public site). Rewrites the `PHOTOS` block in the page.
  ~200MB of sources → 39MB.
- FLUX → covers (first photo of each magazine, number on it) → photo grid.
  OUTSTATION opens straight to its grid. BTN stays EMPTY (no material yet).
- Grid: portraits 2:3, landscapes span two columns, dense flow; each tile sits
  on a dithered swatch of the folder's ramp while it loads.
- Viewer: thumb shows instantly, the full frame fades over it, neighbours
  prefetched. The tube's scanlines step aside while a photo is up — the
  work is shown clean.
- Esc walks up one level at a time.

## Round 3 — fullscreen + zoom
**His ask:** "make the computer screen fullscreen when it comes close so that
it's easier for people to view my work … zoom into the photos and drag and
stuff to have some freedom."
**Built:**
- After the dolly, the tube powers on on the glass, then grows off it to fill
  the page (FLIP, transform only, 300ms). EXIT shrinks it back onto the glass
  before it powers off — leaves the way it came. (Supersedes "the glass fills
  ~96% with the bezel kept".)
- Zoom: wheel / trackpad pinch / touch pinch at the pointer, drag to pan
  (stops at the picture's edge), double-click or double-tap flips fit ↔ 250%,
  `+ − 0` keys, `− 100% +` in the bar. The 3000px frame loads on first zoom.
  At fit, a sideways swipe still pages.

## Tests
`tests/check.mjs` (photos section) and the new `tests/load.mjs` (real Chrome,
empty cache, throttled). Results in the hand-off.

## Round 4 — covers as posters
**His notes:** Mag 02's cover = the sunglasses close-up (photo 03). Then a
screenshot with green boxes: tall cards filling the page — "my outline is a bit
too long so try to make the size that is appropriately fitting the photo
proportions".
**Built:** `cover:N` per magazine (numbered like the viewer). Covers are 2:3
posters sized by container units: as tall as the stage allows, as wide as n fit
(`--n`, min 3), centred. Phone: two a row. `coverPos` can shift a crop if a
landscape cover needs it. Stills: `os-covers`.
Then: "make these folder names a bit bigger but not out of proportions … easy
to read" → the label sizes off the cover (`--ch × .068`, ~33px at 1440×900,
about 70% of the cover's width) and is printed crisp: hard ink drop, no glow
or RGB split, which had been smearing the VT323 strokes.

## Round 5 — two folders
**His note:** "remove BTN folder for now and switch the colours of flux and
outstation." → BTN `off:true` (one flag to bring it back), FLUX pink ramp,
OUTSTATION cyan; the background folder scatter and the CRT intro's nav row
follow.
