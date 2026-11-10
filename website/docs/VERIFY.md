# Verify — check work like a real visitor

**The Claude preview pane is not a playback surface** (it runs as a background
tab, measured at 1–2 fps). Use it for layout and console checks only. Judge
motion in a real browser.

## Smoothness
- Never judge it only on a fast machine. Film motion:
  - at 2× pixel density on the integrated GPU
    (Chrome `--force_low_power_gpu --disable-accelerated-2d-canvas`);
  - in WebKit (Playwright) — what his Mac's Safari and every iPhone use.
- Film the **first visit on a cold profile**, frame by frame, both into a
  screen and back out. First-visit stalls (font load, the ABOUT sticker bake,
  the computer's shader compile) are the ones people notice.
- Film at his window size and at phone width (390×844, touch emulation).
  We can't run a real phone — say so at hand-over.

## Exact-moment harnesses (already built in)
Use these instead of eyeballing live motion:

| Harness | What it freezes |
|---|---|
| `?frame=N` | intro frame N (24fps timeline) |
| live intro | waits at the yank until any key/click (`#pressAny` shows); `dispatchEvent(new KeyboardEvent('keydown',{key:'x'}))` releases it |
| `TransFX.peek(ms)` | a screen transition at ms |
| `MonitorFX.hold(ms)` | the PROJECTS entrance at ms (600 wrapped, 1060 snap, 1300 explosion) |
| `MonitorFX.peek(n)` | the computer's screen intro frame n (21+ = click screen) |

Film frame by frame, make contact sheets with timestamps, and check:
- loops have no seam (frames one loop apart are identical);
- no sudden jumps between neighbouring frames;
- stepped sections stay stepped (the intro is on 2s **on purpose**).

## Also check
- Reduced motion.
- Dark/light theme: n/a — the site has one look (pure black ground).

## At hand-over, always say
What's verified, what isn't, and what couldn't be tested.
