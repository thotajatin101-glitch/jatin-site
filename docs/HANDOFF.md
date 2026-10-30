# Hand-off log

Newest on top. Each entry: date · did · in flight · next · watch out.

---



## 2026-10-31 (later) — EDITS: his videos in the OS. NOT deployed
- Did: `docs/tools/videos.mjs` (8 edits → site/work/flux-edits, outstation-edits; VIDEOS block), FLUX › EDITS + OUTSTATION › EDITS, poster grid + video player in the viewer. Shared range-aware `tests/serve.mjs` for check/load/browsers + .claude/serve.js. check.mjs checks edits (faststart, ≤95MB, posters, 206 on Range); site budget 100→500MB. Browser walk plays the first edit: 14/14 pass.
- Next: he says "deploy" → push (adds ~233MB; GitHub Pages limit 1GB site / 100MB file).
- Watch out: Playwright Firefox has no H.264 (real Firefox does) — the walk only checks the player opens there. Re-encode by re-running videos.mjs, never by hand.

## 2026-10-31 — OS buttons as menu plates. NOT deployed
- Did: FOLDERS/BACK + PHOTOS/EDITS restyled as menu plates (`.osPlate` wrapper carries drop + fringe; `osBurst`; `.osBack`/`.osTab` added to DitherFX SEL; its registry is a WeakMap now since tabs are rebuilt per folder). Grid top padding up. Browser walk reads tab names without the numbers. 6 configs pass.
- Next: he says "deploy" → ship 2d2725f, 4bef897, d8557f7 and this.
- Watch out: clip-path clips a button's own filter — keep the drop on the wrapper.

## 2026-10-31 — FLUX opens straight onto photos, PHOTOS / EDITS tabs. NOT deployed
- **His ask** (screenshot, two boxes beside BACK): inside FLUX drop the magazine folders, show the photos directly, tabs on top: PHOTOS and EDITS. He'll upload the edits later.
- **Did:** `FOLDERS[].tabs` replaces `items`/`set`/`cover`. `shots()` flattens a tab's sets; grid + viewer + zoom work on that list. `.osTabs` sits beside BACK (centred desktop, right on phones), hidden with 1 tab or while a photo is up. Crumbs JATINSPACE / FLUX / PHOTOS; viewer BACK = ◀ PHOTOS. Cover CSS/code removed. Hints mention tabs; empty tab points back to PHOTOS. Keys 1/2.
- **Tests updated:** `tests/browsers/run.mjs` (FLUX photos, both tabs, viewer) and `tests/load.mjs` (no covers). check, 14/14 browsers, NET=4g load all pass. Stills `2026-10-31-flux-tabs`, before: `2026-10-30-os-covers-before-tabs`.
- **Next:** his edits → `photos.mjs` (add a set, e.g. `flux-edits`) → list it in FLUX's EDITS tab. If "edits" are VIDEO, the viewer needs a video path — ask. Deploy on his word.

## 2026-10-30 (latest) — DEPLOYED ff559b4 (his word: "deploy")
- **Live:** touch-aware hints + navigation (ff559b4). Pages run 41097529232, success.
- **Rollback:** previous live c96fe32 (run 41093113739): `git revert ff559b4 && git push`.
- **Checked live:** `tests/check.mjs <live>` passed; `tests/browsers` on the live URL passed (desktop 1440, iPhone 17 Pro, Pixel 9, iPad Mini).

## 2026-10-30 (latest) — JATIN OS: touch-aware hints + easier navigation. NOT deployed
- **His ask:** hints only make sense on a laptop; change them per device; make getting around the folders and computer easier.
- **Did (`site/index.html`, MonitorFX):** `TOUCH = matchMedia('(hover:none) and (pointer:coarse)')` (live; re-hints on change). `setHow()` has touch + key wording per level; the click-screen canvas hint too. `setPath()` now builds `.osPath` as clickable crumbs (`climb('top'|'folder')`) and labels BACK with its destination (◀ FOLDERS / ◀ FLUX / ◀ MAGAZINE 01). Swipe down (>80px, mostly vertical, at fit) closes the viewer. Phone grid top padding 4.2em so BACK clears the first tile.
- **Checked:** walk on Chromium 1440 + WebKit iPhone 17 Pro (labels, hints, crumbs, swipe-down, EXIT); `tests/check.mjs`; `tests/browsers` 14/14. Stills `2026-10-30-os-touch-nav`.
- **Next:** deploy on his word (pushing main = deploy). Unpushed: 1e429a6 (hand-off) + this.
- **Watch out:** a laptop with a touchscreen reports a fine pointer, so it gets the key wording — intended.

## 2026-10-30 (latest) — DEPLOYED c96fe32 (his word: "deploy")
- **Live:** https://thotajatin101-glitch.github.io/jatin-site/ — Pages run 41093113739, success. Carries BACK/EXIT (9753923) and clean photos (c96fe32).
- **Rollback:** previous live is 4bef897 (run 41090788308): `git revert c96fe32 9753923 && git push`, or re-run 41090788308 in Actions.
- **Checked live:** `tests/check.mjs <live>` passed (live copies match); `tests/browsers` on the live URL passed on desktop 1440, iPhone 17 Pro, iPad Mini.
- **Watch out:** pushing to `main` IS a deploy (`pages.yml` on push). Earlier tonight 4bef897 went live by a plain "push" request before that was clear to him — he now knows. Treat "push" as "deploy" and confirm. `docs/RELEASE.md` still says no host chosen; it's GitHub Pages now.

## 2026-10-30 (latest) — JATIN OS: BACK button, EXIT leaves the computer. NOT deployed
- **His ask** (screenshot with the top-left of the stage boxed): a back button there to go folder to folder; top EXIT exits the computer directly.
- **Did:** `.osBack` in `.osStage` (top-left, folder colour, z4 so it sits over grid and viewer). One level per press: viewer → grid → covers → stage, same path as Esc (`closeView`/`up`). Disabled (dimmed) on the stage and while a move is in flight; state is set in `setHow()`. Grid top padding grew so tiles clear it. EXIT unchanged in code (`close()` already hides from any depth) and verified from inside the viewer.
- **Checked:** BACK walk + EXIT-from-viewer on Chromium 1440×900 and WebKit iPhone 17 Pro; `tests/check.mjs` and `tests/browsers` (1440, iPhone 17 Pro, iPad Mini) pass. Stills `2026-10-30-os-back`.
- **Also (his next note):** no scanlines on his photos anywhere: `.pcOS.inside` (set with the stage's `.inside`) drops them on covers + grid, like `.viewing` already did. Folder stage keeps them. Stills `2026-10-30-os-clean-photos`.
- **Next:** deploy on his word.

## 2026-10-30 (late) — cross-browser test (Playwright) + three fixes. NOT deployed
- **His ask:** "a playwright and browser test for each version of a browser modern computers and phones use".
- **Built:** `tests/browsers/run.mjs` (Playwright 1.64.1 pinned in `tests/browsers/package.json`, dev-only, never ships; `node_modules/` gitignored). 14 configs on the three engines every current browser runs on: Chromium (Chrome/Edge/Brave/Opera/Samsung/Android), WebKit (Safari Mac + every iPhone/iPad browser), Firefox. Desktops 1440×900, 1280×800, 1440×700, 1920×1080; iPhone 17 Pro / Pro Max / SE / 17 Pro landscape; Pixel 9; Galaxy S24; iPad Pro 11; iPad Mini. Each walks it like a visitor (taps on touch): intro → PROJECTS → tap the computer → covers → every grid → viewer + zoom → EXIT. It fails on collapsed tiles, broken images, sideways overflow, console errors or failed requests. Stills in `docs/process/stills/2026-10-30-browsers/`. `CPU=6` slows Chromium; `ONLY=` picks configs; a URL arg tests the live site.
- **Fixes it found (in `site/index.html`, uncommitted until his OK / committed with this entry):**
  1. **Photo grid was stuck at 3 columns everywhere.** The covers' inline `--n` leaked onto the photo grid. Now it's set for covers only, so 1440 desktop shows 6 columns again.
  2. **Crash on a busy machine.** If the frame clock skipped past the computer's landing, the chain snap ran before the chains were built and threw on every frame for ~.6s, so the snap went missing. Now it builds them first. Repro: `MonitorFX.hold(1200)` right after enter; the old build threw 18 times, the new one none. The dormant card twin got the same guard.
  3. **Landscape phones: the OS slid up off the screen.** Focusing a tile scrolled `#sec-projects` under the fullscreen OS by 75px. Now `focusTile()` scrolls only the grid, `#sec-projects.osOpen` is `overflow:hidden`, and a scroll guard pins it at 0.
- **Next:** deploy on his word (also carries the Safari dots fix 2d2725f).
- **Watch out:** headless WebGL ran on all three engines here; a real old device without WebGL won't get the computer.

## 2026-10-30 (night) — DEPLOYED (his word: "push it github repo and make it public live")
- **Live:** https://thotajatin101-glitch.github.io/jatin-site/ (GitHub Pages via `.github/workflows/pages.yml` on push to main). Commit 9deb8e6; the previous live version was dedbfb3. **Rollback:** `git revert 9deb8e6 && git push`, or re-run the dedbfb3 deploy in Actions.
- `tests/check.mjs <live url>` and `NET=4g tests/load.mjs <live url>` both passed against the live site.
- Not pushed: ~390MB of process stills (untracked, local only), the `revert-main-2026-10-30` tag.

## 2026-10-30 (evening) — his photos in JATIN OS, fullscreen, zoom, hosting tests
- **Did:** `docs/tools/photos.mjs` built `site/work/`: 46 photos from his `BEST` folder, three sizes each, sRGB, stripped, 39MB. FLUX → Mag 1/2/3 covers → grid; OUTSTATION → grid; viewer with zoom/drag/pinch/double-click. The OS goes fullscreen after the dolly. Favicon added (data-URI wedge; the 404 showed up in the load test). Concept: `docs/concepts/2026-10-30-os-gallery/`.
- **Tests:** `tests/check.mjs` gained a photos section; new `tests/load.mjs` (real Chrome, empty cache, 4G + slow 4G + phone). See the final run in this entry's session report.
- **In flight:** BTN has no material. Not deployed. No snapshot set taken for the gallery yet.
- **Watch out:** the REVERT MAIN save point predates all of today's evening work. A blind restore drops the photos wiring, the exit-ghost fix and the tests; to leave apply mode only, set `APPLY=false`. Re-run `photos.mjs` whenever his folders change; never hand-edit `PHOTOS`. GitHub Pages ships `site/` as is (39MB is fine; 1GB limit).

## 2026-10-30 — APPLY MODE (Vogue application) + REVERT MAIN save point
- **Did:** `const APPLY=true` in `site/index.html`: the intro plays, then `toMenu()` hands to `landOnProjects()` behind the slam. That lands on PROJECTS (accent and wedge painted, `#projects` hash). The menu is skipped; BACK, Esc-back and history-back are off (`goBack`/popstate return early; `body.apply` hides BACK). Reduced motion lands there too. Nothing deleted. check.mjs passes. Stills `2026-10-30-apply-mode(-2)`.
- **REVERT MAIN** (his phrase): restore the pre-apply site. Two copies: `.local/revert-main/` (index.html + png) and local git tag `revert-main-2026-10-30` (stash-create commit 204f17d, not pushed). If only apply needs undoing, `APPLY=false` does it.
- **In flight:** PROJECTS content is still placeholder (FLUX = numbered dithered covers, BTN/OUTSTATION = [ EMPTY ]). He needs to send real work for the application. Not deployed.
- **Watch out:** work done after 10-30 is lost by a blind restore; diff first. Deploy only on "deploy".
- **Fix (same day, his recording):** leaving a folder replayed the browse slide-in (`in-l`/`in-r` stayed parked on `.osHero`; when `surface` ended, the hero went back to that animation and it ran again, as a ghost). `openFolder()` now strips those classes; `goTo(…,true)` waits 440ms so the slide-in finishes first. Verified: only `surface` runs on exit. Also applies to REVERT MAIN: carry this fix across.

## 2026-10-29 (night) — SKILLS stage: card left, banner, plate menu
- **Did:** rebuilt the SKILLS layout from his Persona-5 recording (round 27): data-driven `CARDS`, tilted card left, info banner, mirrored plate menu, deal animation, phone chips. Also this session: keyboard + mouse on the computer, centred SKILL tab, OLED-black sky, darker text plate, gloss tried and reverted.
- **In flight:** his read on the stage. Only one real card exists; other skills (Creative Direction, Editorial Shoots, Motion Graphics, Visual Identity, Color & Look Dev) need copy + art from him. Motion not judged in a real tab.
- **Next:** more cards when he sends content; maybe the chain whip on each deal. JOURNAL + CLAUDE.md SkillFX section still owed.
- **Watch out:** menu plates are acid (the section accent is green and the wedge is green). `SkillFX.dealHold(ms)` freezes a deal for stills. Everything uncommitted, not deployed.

## 2026-10-29 (late) — SKILLS card art = his recording's world
- **Did:** replaced the pixel-art editor scene with a WebGL raymarched computer-on-a-floating-slab in a starfield with tumbling iridescent shapes (`Space` in `SkillFX`, round 21 in the concept README). Corner horns kept, side ornaments removed, 4-tap shader AA for edge shimmer. `tests/check.mjs` passes.
- **Gloss trial:** tried and reverted by his call (code removed; look kept in stills `2026-10-29-skills-gloss-2`).
- **In flight:** awaiting his read. Not judged: motion in a real tab, phone layout, GPU cost on his machine. Everything uncommitted, not deployed.
- **Next:** if the pointer drift/tumble feels wrong, tune in `Space.draw` / `main()`; cards 2+ could swap the computer for another object. JOURNAL, CLAUDE.md SkillFX section still owed.
- **Watch out:** snap.mjs PNG capture (`SNAP_PNG`) hung at DPR 2 on this loaded machine; JPEG is fine. `SNAP_PRE` runs JS before the first skills still.

## 2026-10-29 (later) — chrome casing: sharp + shine pass
- **Did:** thinner ring (42), needle horns with solid roots, edge lip/groove hairline in the height field, slab ±.25·T, higher-contrast mirror env. Round 17 in `docs/concepts/2026-10-28-skill-card/README.md`. check.mjs passes.
- **In flight:** awaiting his read on the case. Everything uncommitted, not deployed.
- **Next:** if he wants it still sharper, tune `SPURS` in `casePlan` / the env in `CFS`. JOURNAL chapters and the CLAUDE.md SkillFX section still owed.
- **Watch out:** a stray `/*` in the GLSL kills the whole case silently. Judge motion in a real tab, not the preview pane. Short screen: crest is tight under the heading.

## 2026-10-29 — chrome casing (relief), metal chains, gold type
- Did: casing round the card as shaded relief (`SkillFX.caseWork/caseSheet/drawCase`, worker-built texture, WebGL studio reflections, 7 masked steel layers for thickness); wrap + back chains share `METAL`; wordmark and heading are gold (`--gold`) with a steel step shadow; back parallax = tunnel (`drawRays`). Concept README rounds 8–16.
- Watch out: the casing needs WebGL, Worker and Blob URLs; without them the card simply has no casing. Texture is 1100×1431 (about 6MB per context ×2). The card was shrunk to 54vh/64vh so the crests clear the heading and BACK; at 1440×700 the tips come close to the last letter of TOOLKIT.
- Next: judge the chrome flow in a real tab (preview pane is not valid for motion); his notes on shape (fatter wings, more curls, holes).

---

## 2026-10-28 (late) — liquid-chrome frame + chain rays on the back
- Did: face frame/edges = liquid chrome (`--liq`, `--bands`, `--holoT`); back rays are chains (`SkillFX.buildRays`); tilt clamp (tanh) and slab gap fix (front/back at T/2). Concept README rounds 6–7. `snap.mjs` now waits for `TransFX` to finish after opening a section.
- Watch out: when editing the `.skCard` custom-property block, keep its closing `}` — losing it silently breaks every rule below it. The machine can be heavily loaded (a game was running, load avg 20): stills caught mid-transition mean slow frames, not a bug.
- Next: judge the chrome flow on tilt in a real tab; if hover repaint is heavy, drop `--liq` size from 130%.

---

## 2026-10-28 (night) — skill card is foil end to end
- Did: glitter removed; foil (`--holo`/`--brush`) is the card's material: frame, tab, plate, chrome edges, back; `.skShine` card-wide band. Concept README round 4.
- Watch out: SKILLS accent green now only shows in the tags and the chains; the frame is rainbow by design.

## 2026-10-28 (evening) — skill card: weight + pixel-art desk scene
- Did: slab thickness + drop shadow + spring tilt/flip + landing thud; pixel scene (`SkillFX.scene`) with 3 parallax layers; foil between mid and near layers. Concept README round 3.
- Next: his notes; judge the spring feel in a real tab (preview pane is not valid for motion).
- Watch out: the front face is translated T/2 in z; chain projection still assumes the plane at z=0 (fine at this thickness).

## 2026-10-28 (later) — skill card: centred, old boxes removed, holographic foil
- Did: removed What I Do/Use cards from SKILLS; card centred (50vw, 61vh); foil layers (.skFoil/.skTopo/.skGlit) driven by pointer via --fx/--fy/--gx/--gy/--sx/--sy. Stills `skills-card-holo2`.
- Watch out: foil breathes slowly on idle (±6%), a deliberate exception to 'no idle texture' — drop `dr` in SkillFX.frame if he objects.

## 2026-10-28 — SKILLS: first skill card (video editing), chained intro
- Did: `SkillFX` card in #sec-skills (front/back, flip on click/Return/Space), arrives chained and breaks out like the computer. Menu fixes earlier today: panel edge softened, wedge diagonals feathered (22 units), dead-centre grid ray removed. `snap.mjs` got SKILLS_HOLDS (`SkillFX.hold(ms)`). Concept: `docs/concepts/2026-10-28-skill-card/`.
- In flight: his notes on card 1. Card copy is a placeholder.
- Next: more cards (layout for several), his real descriptions; update CLAUDE.md with a SkillFX section once he signs off.
- Watch out: phone hides the old "What I Do/Use" cards (card takes the screen). Nothing committed or deployed.

## 2026-10-28 — menu panel edge softened
- Did: `#mBack` (black panel behind the plates) lost its hard diagonal clip; the slant is now a 97deg eased gradient fading to clear. Stills: `2026-10-28-menu-panel-soft`. Tests pass.
- Next: his call on fade length. Uncommitted, not deployed.

## 2026-10-27 — Portrait glow moved under the other assets
- **Did:** his note "layer it below the other assets, keep it above the bg". The glow canvas now lives in its own `.cutWrap.glowWrap` twin (z3: over the wedge and depth streaks, under bubble, tags, sparks, bars, portrait). Twin needs `aspect-ratio:(w+2P)/h` or its `translateX(-50%)` misplaces it. Stills `2026-10-27-about-dither-glow-below`. Not committed/deployed.

## 2026-10-27 — Portrait glow dither softened
- **Did:** his note "too harsh, make it subtle and flow like a gradient animation": dither cells 4→3 baked px, alpha 170, wide slow bands (`n*1.25`, `t*.2`), gentler band contrast. Stills `2026-10-27-about-dither-glow-soft`. Not committed/deployed.

## 2026-10-27 — ABOUT: portrait glow is an outward dither
- **Did:** replaced the smooth pink/cyan halo with `CutGlow` (distance field + travelling Bayer bands, hot pink wide, cyan inner). Motion verified by sampling the canvas at three times (changes each time). Stills `2026-10-27-about-dither-glow`. Tests pass; not committed/deployed.
- **Next:** his notes on speed/band width (`n*2.3`, `t*.42` in `CutGlow.draw`) and colour split (`tone` line). On phones the dither reaches the bubble's last line (portrait is z5 over the bubble) — faint, but watch it.

## 2026-10-27 — ABOUT: bars pushed apart
- **Did:** "push the Hot pink bar up a bit and purple one down a bit": top bar `top:-8vh` (was -4), bottom bar `bottom:-7vh` (was -3); phone -5vh / -5vh (was -2). Heights unchanged. Portrait still tucks behind the bottom bar, no gap. Stills `2026-10-27-about-bars-apart`. Tests pass; not committed/deployed.

## 2026-10-27 — ABOUT: name removed again (final)
- **Did:** he changed his mind: "Remove text i changed mind". Page restored to the no-text state: bars 31vh/27vh (phone 22/15), no name, no bottom line, no Anton link. `tests/check.mjs` passes. Not committed/deployed.
- **Watch out:** if he asks for the name again, the window-aware fit (widen letters, word space, slide right; stills `2026-10-27-about-name-back*`) has to be rebuilt; the design is in those stills.

## 2026-10-27 — ABOUT: name headline back, same look at every window shape
- **Did:** he sent two crops (a tall one he liked, a very wide one he didn't). Restored the name ramp (code recovered from the session log) and made the fit window-aware: widen letters, then word space, then slide right. Top bar back to 40vh so the name is big; bottom bar stays short and bare. Stills `2026-10-27-about-name-back`, `-1802`, `-wide`, `-short`. `tests/check.mjs` passes. Not committed/deployed.
- **Next:** his notes; bottom line still removed (ask if he wants it back); JOURNAL + concept README still owe rounds 6+.
- **Watch out:** letters are placed by JS (`fitName`); Anton is a Google Fonts link, so it needs network like Plex Mono.

## 2026-10-27 — ABOUT: all banner text removed, bars pushed to the edges
- **Latest:** he cut ALL top/bottom text (name ramp tried in Anton + printed dot texture, then removed with `fitName`/Anton link). Bars shortened: top 31vh, bottom 27vh (phone 22/15). Stills `2026-10-27-about-bars-edge`. Not committed/deployed.

## (earlier same day) ABOUT top headline = name ramp
- **Did:** removed all top text except his name; `fitName()` sizes each letter to the pink bar's height at its x (his sketch). Stills `2026-10-27-about-name-ramp`. Reads "THOTA JATIN" from his sketch — one string (`data-name`) to change.
- **In flight:** nothing committed/deployed. Phone name is width-limited (small in a tall bar).
- **Next:** his notes on the ramp; then rewrite remaining ABOUT docs.
- **Watch out:** letters are placed by JS; `.cgChains` PAD=120 must match CSS.

## 2026-10-26 — ABOUT redesign: "Have you seen this DIRECTOR?"

- **Did:** ABOUT rebuilt from his poster reference (headline scale ramp,
  wedge banners, perspective), new graded cutout from his night photo
  (`cutout.swift` + `grade.swift`). Audited 1440×900 / 1440×700 / 1280×800 /
  375×812 and fixed the star-over-bubble and phone BACK/punchline clashes.
  Stills: `2026-10-26-about-poster-v1|short|laptop`; old design kept in
  `about-p5-kreften`. CLAUDE.md ABOUT section rewritten; concept README +
  journal ch. 12. `snap.mjs` gained `SNAP_W`/`SNAP_H`.
- **In flight:** nothing. Everything since the last deploy (intro 3D v2, press
  gate, halftone, ABOUT) is UNCOMMITTED and NOT deployed — live site is the old
  tube-link intro.
- **Round 5:** ABOUT chains now run along the two bars' edges (`.cgChains` inside `.cgTop`/`.cgBot`, `--e0/--e1` must match each clip-path's long edge). `ChainFX.slam/redraw` take a list of canvases. Stills `about-edge-chains*`.
- **Round 4:** new cutout via `docs/tools/matte.swift` + `grade.swift` (rerun both if the photo changes) and a cyan→hot-pink halo in `bakeCutout`. `site/jatin-cutout.png` is now 485KB. Stills `about-glow*`.
- **Round 3:** layout from his marked-up screenshot (top bar flush + descending edge, portrait over top / under bottom bar, big punchline bottom-right). Stills `about-layout*`. CLAUDE.md ABOUT section still needs a rewrite to these numbers once he signs off.
- **Round 2:** banner text removed on his note (copy parked in the concept README), bars flush + thinner, portrait bigger, BACK top-left. CLAUDE.md ABOUT section still describes the text/old sizes — update once he settles the alignment.
- **Next:** his notes on ABOUT (where the text goes back, colour portrait?); judge
  motion of the ABOUT entrance in a real tab. Deploy only on "deploy".
- **Watch out:** the cut edge of the photo's right arm hides behind the bottom
  banner; check on any portrait resize.

---

## 2026-10-26 — 3D chained intro: hug + zero-g

- **Did:** (round 2: float slower and calmer, thud on the pull) straps hug the slab; chains float slack then yank taut (`CH=28`,
  intro now 8 frames longer); ring/bar plate links with Bayer dither. Snaps:
  `3d-chains-bulge` (rejected) and `3d-chains-zero-g`. Journal ch. 11;
  CLAUDE.md frame table re-numbered; `snap.mjs` frame list updated.
- **In flight:** nothing (also: intro now waits for a keypress — PRESS ANY BUTTON). NOT pushed or deployed — live site is still the
  earlier tube-link 3D intro.
- **Next:** his notes on the float/yank timing (judge in a real browser tab).
- **Watch out:** the 2D `chainFrame` no-WebGL fallback is unchanged and does
  not float. Shifted frame numbers: snap at 28, END at 72 (snap→END = 44 frames = 1.83s).

---

## 2026-10-26 — process documentation

- **Did:** `docs/tools/snap.mjs` (zero-dep, drives Comet/Chrome headless over
  DevTools). Shot two sets: `2026-10-24-first-draft` (from `94ab34d`) and
  `2026-10-26-current` (33 stills + intro/transition/projects films).
  Wrote `docs/process/JOURNAL.md` (chapters 0–10 from CLAUDE.md's history)
  and the routine in CLAUDE.md "How we work".
- **In flight:** nothing.
- **Next:** each visual change → `snap.mjs --only` + a journal chapter.
- **Watch out:** a full set with films is ~40MB in git — full sets at
  milestones only. Not pushed.

## 2026-10-26 — folder restructure

- **Did:** moved the shipped files into `site/` (the deploy folder), the
  design references into `docs/site/reference/`, `cutout.swift` into
  `docs/tools/`, and the raw recordings and screenshots into `.local/reference/`
  (gitignored, now untracked). Added `tests/check.mjs` (syntax + route check,
  passes) and `docs/site/README.md`. Preview server now serves `site/`.
- **In flight:** nothing. On his yes, all earlier-session work (`CLAUDE.md`,
  `README.md`, `.claude/*`, `site/index.html`, `site/jatin-cutout.png`) plus
  the path updates were committed in `5807bb6`. Working tree clean.
- **Next:** host choice (recommend Cloudflare Pages), then fill the commands
  in `docs/RELEASE.md`.
- **Watch out:** the two screenshots that used to be in `reference/` exist only
  in `.local/reference/` now — they're still in git history at `94ab34d`.

## 2026-10-26 — working system set up

- **Did:** added `docs/RELEASE.md`, `WEB-BUGS.md`, `VERIFY.md`,
  `BUILD-ORDER.md`, this log, and a "How we work" section in `CLAUDE.md`.
  Committed only the new `docs/` files.
- **In flight:** the folder restructure is proposed, not done — waiting on his
  yes for the moves. `CLAUDE.md` edit is not committed (the file already had
  other uncommitted changes).
- **Next:** his answers on host, moves and key routes; then the `tests/` check
  script.
- **Watch out:** `site/index.html`, `CLAUDE.md`, `README.md`, `site/jatin-cutout.png`
  and `.claude/*` all carry uncommitted work from earlier sessions. Don't
  sweep them into a commit without asking.
