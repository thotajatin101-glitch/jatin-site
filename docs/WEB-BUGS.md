# Web bugs — check before every hand-over

Tick through this for anything you touched. Where this project already has a
rule in `CLAUDE.md`, that rule wins.

## Layout
- [ ] Images and video have width/height or `aspect-ratio` — nothing shifts.
- [ ] No sideways scroll at 375/390 wide (`scrollWidth > clientWidth`, incl.
      every `.mItem`). Watch `100vw` and long words.
- [ ] Prefer `svh`/`dvh` over `100vh` for anything that must fit a phone
      screen. *(The page uses `vh` throughout today — a known gap, see
      BUILD-ORDER.)*
- [ ] `z-index` vs stacking contexts: transforms, filters, `isolation` and
      `will-change` all create one. The dither canvases rely on this.
- [ ] Every width has a real layout — run the CLAUDE.md layout audit
      (1440×900, 1280×800, 1440×700, 375×812).
- [ ] Text never sits over busy imagery where it can't be read.

## Motion and performance
- [ ] rAF loops stop when their screen closes and in hidden tabs.
- [ ] `prefers-reduced-motion` shows a settled still, never a blank.
- [ ] Canvas: DPR capped at 2, redraw on resize, cache still parts, redraw only
      what moves, never repaint a full-screen canvas every frame without reason.
- [ ] No `shadowBlur`, canvas `filter`, SVG `url()` filter, or animated
      `clip-path`/masks on big layers every frame.
- [ ] Clocks run on real elapsed time, not "one step per frame".
- [ ] A second click/replay never restarts or doubles a running animation
      (`TransFX.active()` pattern).
- [ ] Autoplay video: paused off screen, `muted` + `playsinline`.

## Safari / iPhone
- [ ] `requestIdleCallback` guarded (Safari lacks it).
- [ ] Canvas `filter` is silently ignored in Safari — don't depend on it.
- [ ] Newer CSS (`@property`, blend modes, `color-mix`) checked against Safari.
- [ ] WebGL paths (intro 3D, ASCII, computer) have their fallbacks working.

## Input and access
- [ ] Touch targets ≈44px+, nothing hover-only.
- [ ] Real buttons, focus rings kept, full keyboard nav (arrows / Enter / Esc).
- [ ] No scroll-jacking; Back/Forward and direct `#hash` links work.

## Loading and runtime
- [ ] Fonts have `font-display`; any path works once deployed (case-sensitive
      filenames — `jatin-cutout.png` is lowercase, keep it).
- [ ] `localStorage` wrapped in try/catch (throws in private mode).
- [ ] No oversized images; no `loading="lazy"` above the fold.
- [ ] Zero console errors, zero failed requests.
