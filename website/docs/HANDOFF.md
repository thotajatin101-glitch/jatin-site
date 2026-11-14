# Hand-off log

Newest on top. Each entry: date · did · in flight · next · watch out.

---
## 2026-11-12 — identity video, round 2: taste, not branding (his note)
- **His note:** shift the context "from branding to building a taste and an identity or style because branding has become something that takes the meaning of stuff".
- **Did:** rewrote `personal-brand/videos/2026-11-12-identity/script.md`. Title "I never designed my style. I built my taste." Three words fixed: taste = input, style = output, identity = others noticing. "Brand" appears once (scene 2, as what swallowed the meaning); scene 5's line is "taste isn't liking more things, it's knowing what to cut". Lesson saved to memory (`taste-not-branding`).
- **Next:** same `[YOU: …]` gaps as round 1.

---
## 2026-11-12 — script for the "identity" video (his ask)
- **His brief:** context = "made my own brand identity without trying … consuming to your heart's content is the key". One combined YouTube video (story + take) and a short, heavily edited gist cut. Him on camera. Influences he named: Persona 5 Royal, Cyberpunk 2077, Edgerunners, plus smaller things.
- **Did:** `personal-brand/videos/2026-11-12-identity/script.md`: hook, 7 scenes (~4:30), the 45–55s short cut as an edit table, and open items. The spine, found in the journal: identity = what he cut (vignette, grunge, scanlines, idle glitch), not what he added.
- **Next:** his answers to the `[YOU: …]` gaps (the Cyberpunk / Edgerunners moment, small influences, mood-board line), then round 2. Optional: I build the short's on-screen graphics (cut list, split screens) in the site's look; he records and edits in Resolve.
- **Watch out:** the site's docs name Persona, Spider-Verse and his logo, not Cyberpunk/Edgerunners; I did not invent that link. No game footage beyond short clips (copyright).

## 2026-11-11 — Site intro video, round 1 (first cut rendered)
- **His brief:** a 3D world-building intro video: JATIN chained, the cursor clicks, the snap; then objects floating with an
  immersive camera like his reference; a black hole; "visit the site" in his tone. Posts are parked ("keep this stuff aside").
- **Did:** `personal-brand/kit/studio/video/` (`render-video.mjs` + `intro-video.js`): renders from the REAL site with
  export hooks patched in at serve time (site files untouched), so the computer, phone, handycam, intro, chain and cursor
  are the site's own. 18s first cut → `personal-brand/videos/2026-11-11-site-intro/site-intro-r1.mp4` (gitignored, 127MB);
  web copy + 9 key frames + README in `personal-brand/kit/concepts/2026-11-11-site-intro-video/`.
- **Round 2 (same day):** the cursor is a 3D slab entering from under the frame and tipping upright (his second reference); `site-intro-r2.mp4`. He is giving notes one beat at a time, cursor first.
- **Round 3 (11-12):** cursor in true perspective; blow-up violent then slow motion (`sim`/`burst`); computer, phone, skill card, handycam enter past the lens one by one into the black hole (`HERO`); the card is photographed from the real site in a pre-pass. `site-intro-r3.mp4`, 17s.
- **Next:** his notes. Known gaps: no sound, camera smoother than his reference, name small in the opening (phone
  layout), skill card not in the world.
- **Watch out:** the hooks find each FX by its `const XFX=(()=>{` line and its first 2-space `return {`; if the site's
  code moves, `render-video.mjs` throws "no …". It needs the real GPU (launches Chromium with ANGLE Metal). Nothing committed.

---
## 2026-11-11 — Content look round 10 (title only on the mixed-media background)
- **His note:** no photo of him; not cluttered; "i just want the title but i love the mixed media background".
- **Did:** p1–p3 stripped to title + background (see concept README round 10). Doc v10, same URL. Round 9 kept as stills and as `p1r9`–`p3r9`.
- **Next:** his notes. Reels still wait on footage and his concept.
- **Watch out:** `render.mjs` timed out once on p2 (180s) and passed on a re-run. Nothing committed.

---
## 2026-11-11 — Content look round 9 (maximalist collage posts)
- **His note:** round 8 "sitting too much in the comfort zone"; wants maximalism, explored from his references (Broken
  Frames above all), and every post's imagery relevant to its topic. Memory: posts-maximal-and-on-topic.
- **Did:** a 2D collage toolkit in `kit/studio/studio.html` (ROUND 9 block) and p1–p3 rebuilt on it. Doc v9, same URL.
  Round 8 stills kept; round 8 code kept as `p1r8`–`p3r8`.
- **Next:** his notes. Photographed objects as stickers would lift it; p2 could take more layers. Reels still wait on footage of him.
- **Watch out:** these posts no longer use three.js or `siteWorld`; the motion test `m1` still does. Nothing committed.

---
## 2026-11-10 — Content look round 8 (subject back, readable type, 3 layouts) + first reel motion test
- **His asks:** improve the posts with his content idea (identity made without trying; consume first; no framework);
  make the reel tests; **he wants me to do the reel execution, he does concept and ideation** (memory: reels-execution-is-mine).
- **Did:** p1–p3 rebuilt (see concept README round 8); `DRAFTS.m1` + `kit/studio/render-reel.mjs` → `m1-motion-test.mp4`
  (7s). Doc v8, same URL. Round 7 stills kept. Also gave him a content plan in chat (FED → MADE format, 2 simple : 1 heavy reel).
- **Next:** his notes on R8 and the test. Reels need footage of him (he is one still now). He is still deciding what he wants from reels.
- **Watch out:** `paintType` marker defaults changed (track .2, rim .1): r1–r7 don't use them. Nothing committed.

---
## 2026-11-10 — Content look round 7 (no props, smooth chain)
- **His note:** remove the 3D props (photos, cursor, CRT); keep the chain on a smooth curved path.
- **Did:** props out of p1–p3; new `chainCurve` (centripetal Catmull-Rom, link size by arc length) replaces the Hermite keys for the posts. Doc v7 (same URL); round 6 stills kept as `p*-round6.jpg`.
- **Next:** his notes on R7; then the reels. The beige-computer swap is moot now (the CRT is gone).
- **Watch out:** the reels' code still uses `chainLinks`/`voxels`; leave them until the reels round.

## 2026-11-10 — project moved to ~/Documents/jatin-site (his ask)
- **Did:** moved the whole folder from ~/Downloads (same disk; Documents is not iCloud-synced). Claude memory copied to the new project key. Site checks pass from the new spot.
- **Watch out:** older Claude sessions still point at ~/Downloads/jatin-site and won't find the files; start new sessions from ~/Documents/jatin-site. `~/Downloads/jatin-site.zip` is an old August copy, not this project.

## 2026-11-10 — folder split: website/ and personal-brand/ (his ask)
- **Did:** `site/ docs/ tests/ worker/` → `website/`. Brand work → `personal-brand/`: `kit/brief` (was docs/brand), `kit/studio` (was docs/studio), `kit/concepts/` (asset-kit, content-look), plus empty `posts/` and `videos/` (one `YYYY-MM-DD-name/` per piece; video masters gitignored). Fixed: Pages workflow (`website/site`, `website/tests/check.mjs`), `.claude/serve.js`, snap `--rev` (reads `website/site/` or the old layouts), studio renderer + its font/photo paths, READMEs. CLAUDE.md has a "Folder layout" section: every path in it is relative to `website/`.
- **Checked:** `node website/tests/check.mjs` all pass; the studio renders all 10 drafts (p1–p3, r1–r7) from the new spot.
- **Not pushed.** The next push is the first deploy from `website/site`; watch that Pages run.
- **Watch out:** this log stays the one hand-off for both halves. Old entries below use the old paths. `.claude/launch.json` is still someone else's uncommitted edit (untouched).

## 2026-11-10 — Content look round 6 (WHO I AM type on the plates)
- **His note:** use the WHO I AM font; the bold didn't look right.
- **Did:** `silverPlate` uses #wedgeSub's type; faux bold removed; doc v6 (same URL), round 5 stills kept.
- **Next:** his notes; the CRT → beige computer; then the reels.

---
## 2026-11-10 — Content look round 5 (silver plates)
- **His notes:** small mono words → the site's silver plate, bold; keep R3's headline colours.
- **Did:** `silverPlate()` / style `plate`; `R3TYPE` on every world; doc v5 (same URL), round 4 stills kept.
- **Next:** his notes; the CRT → his beige computer is still open; then the reels.

---
## 2026-11-10 — Content look round 4 (one colour world per post)
- **His note:** dither the shards, keep them in the post's colour scheme, make the text contrast it.
- **Did:** `SHARD_FAM` dithered shards, `TYPE_ON` contrasting type colours; doc v4 (same URL), round 3 stills kept.
- **Next:** his notes; the CRT → his beige computer is still open; then the reels.

---
## 2026-11-09 — Content look round 3 (posts in his world)
- **His note:** the posts "doesnt feel like it captured my style", with the site's elements but not its look. Keep the
  chain, the cursor and the current type. Two new references (flat bold layers behind one real object).
- **Did:** studio posts rebuilt on the site's world as the ground (`siteWorld`), the site's chain sprites ported,
  straight-down camera with frame-exact layers. Doc republished (v3, same URL), with round 2 and 1 stills kept.
  Memory: posts-feel-like-the-site.
- **Next:** his notes on round 3. Possibly the site's beige computer in place of the voxel CRT; then the reels.
- **Watch out:** `framePlane` layers must stay frame-exact (`fh(L)`); type and chain heights decide what shadows what.

---
## 2026-11-09 — Content look round 2 (posts, electric)
- **His note:** posts "alot better", reels need much more effort; perfect the posts first. Keep the 3D and light, but
  "colours and background washed out", stick to the electric scheme. Use the content-look doc as the preview.
- **Did:** studio light rig and floor rebuilt for full saturation (see concept README round 2); p1–p3 re-rendered,
  round 1 kept as `p*-round1.jpg`; doc republished (same URL, v2).
- **Next:** his notes on the electric posts. Then extruded type and a less flat CRT; the reels after the posts lock.
- **Watch out:** `lights()`/`floor()` are post-only; reels still use `propRender`'s own lights.

---

## 2026-11-14 · Browser sweep (37 computers and phones) + phones held sideways fixed

- **Did:** `tests/browsers/run.mjs` grew from 14 to 37 configs (Edge, 1366×768, 2560×1440, MacBook Air, iPhone 11 → 17 / Air /
  16e / 13 mini, Pixel 7a / 10 / 10 Pro XL, Galaxy A55 / Z Flip 7 / Z Fold 7 / Tab S9, iPad gen 11, iPad landscape, four
  phones sideways) and now walks the WHOLE site: after PROJECTS it goes menu → ABOUT → SKILLS → CONTACT by plate and BACK
  (overflow, clipped plates, BACK on screen, errors, a still of each).
- **Fixed:** a phone held sideways broke the menu, ABOUT and SKILLS. It now takes the desktop layout (`upright()` in JS,
  `orientation:portrait` on the phone media queries) plus one short-landscape block at the end of the stylesheet. Rules in
  CLAUDE.md (Layout rules). Stills `docs/process/stills/2026-11-14-phone-sideways/`, JOURNAL chapter 2026-11-14.
- **Deployed 2026-11-14 on his "deploy"** (push to main, Pages builds `website/site`). Rollback: `git revert` back to
  `8f9656c` (the last live commit) and push. The 37-config sweep passed after one more fix: JATIN OS hides its date
  strip, header and HOW TO USE while a photo is open on a sideways phone (the photo was 143px tall on a Pixel).
- **Next:** a real phone turned sideways.
- **Watch out:** Playwright runs today's engine builds only; it can't run older Safari/Chrome versions or real Samsung
  Internet. Sweep stills (`docs/process/stills/2026-11-13-browsers/`, 229MB+) are not committed. `PH` is taken (a colour
  in the page); the phone test is `upright()`.

## 2026-11-10 — Slow-machine test rig + the lag it found. DEPLOYED (Pages run 42680683777, 54b0c34)
- **Deploy:** his word "deploy". Rollback point: run 42596277255 (707106c). Two Pages runs timed out in GitHub's
  file sync (10-min default) before `deploy-pages` got `timeout: 1800000`; the third went through in 2 min. Live
  page carries the new code; `tests/check.mjs` live: all passed.
- **His ask:** test on very low processing power, lowering it after each test, and fix what lags.
- **Built:** `tests/perf.mjs` (rigs gpu/phone/cpu, `LADDER`, `PROF`, `ONLY`, `SITE_DIR`+`TAG`); `tests/serve.mjs`
  takes `SITE_DIR`. Results `docs/process/perf/2026-11-09-*-{before,after}.json` (+ gpu after).
- **Fixed in site/index.html:** Q governor (counts slow frames, ignores main-thread-bound windows, recovers in ~1s);
  CutGlow per-distance LUT + active-cell list; DitherFX interlaced big shapes + adaptive refresh (`every` 33→80ms);
  EyeFX loads 48 random thumbs, swatches lazily, CPU-backed feed canvas; SkillFX Space size from a ResizeObserver.
- **Numbers** (laptop CPU ÷8): menu browse 62→110, ABOUT open 60*→119, ABOUT idle 60→118, SKILLS open 39*→110,
  deal 60→119. Phone ÷12: ABOUT idle 41→112, CONTACT idle 60→108.
- **Checked:** stills `docs/process/stills/2026-11-10-slow-machine/` (glow, dither, eye look unchanged); browsers 14/14
  (run.mjs: the intro tap now stops once the menu is up — in iPhone landscape .22 hit ABOUT).
- **Open:** (1) software GPU still single-digit fps on 3D screens: needs a lite mode (his call). (2) Phone landscape
  menu: the heading block sits behind the JATIN mark and ABOUT's plate runs into the logo panel (fitWedgePhone
  assumes portrait). (3) Not measured on a real weak laptop.
- **Watch out:** `docs/studio/studio.html` and `.claude/launch.json` are someone else's uncommitted edits.

## 2026-11-09 — Content look round 1 (posts + reels)
- **His note:** the asset-kit preview was "pretty simple and not good yet"; sent 2 post + 2 reel references (design
  only, not topic). Saved to memory as content-quality-bar.
- **Did:** `docs/studio/` (dev-only still renderer: three.js voxels, prints, hand type) and round 1 drafts in
  `docs/concepts/2026-11-09-content-look/` → https://claude.ai/artifact/M92mq2HztYmj2Qgp5dCTbq.
- **Next:** his notes. My pick: extruded 3D type + glossier black floor, and a 6–8s motion test of the high-effort style.
- **Watch out:** studio uses three.js from a CDN — fine because it never ships; keep it out of `site/`.

---

## 2026-11-09 — Asset kit preview (round 1)
- **His ask:** see how the asset kit works before it's built.
- **Did:** `docs/concepts/2026-11-09-asset-kit/` — a live preview page on his photos (transition, chain snap, title
  + lower third, chroma burst, sticker sheet, accent switch, frame scrub + mini timelines), published privately at
  https://claude.ai/artifact/PLPAHemou7FfEHtKmmejhG. README has the round log.
- **Next:** his notes → render the real files (4K ProRes 4444 alpha, PNGs) from the same drawing code → Fusion macros.
- **Watch out:** checked locally by serving a temporary copy from `site/` (removed after); never leave check files there,
  since `site/` deploys.

---

## 2026-11-09 — ABOUT bubble off his face on phones. NOT deployed
- **His note** (iPhone screenshots): "my face being cover and main menu description having now space". The menu
  shot was the pre-deploy build; live 6716cd0 already fits (still in `docs/process/stills/2026-11-09-about-bubble-face/`).
- **Did:** phone `.cgBubble` is border-box, `left:3vw`, `width:min(46vw,200px)`, tighter padding: right edge ≤49vw,
  his face starts ~53vw. Checked in WebKit at 393×657 and 375×560.
- **Next:** deploy on his word; he should hard-refresh (or close the tab) on the phone, Chrome iOS caches the page.

## 2026-11-09 — Master design brief (justjatin design language)
- **His ask:** the site "created my own design identity without realizing"; he wants it on every post, video edit
  and asset.
- **Did:** `docs/brand/index.html` (self-contained, Cyberway embedded) + `docs/brand/img/` stills, published
  privately at https://claude.ai/artifact/K9pmWn6SiWopC2VVr7ECz2. Chapters: idea (LOUD / PRINTED / UNCHAINED),
  colour (hexes, proportions, dithered ramps), type, texture (yes/no demos), shapes, motion (in 24fps frames),
  voice, recipes (post 4:5, reel 9:16, thumbnail, lower third, transition), the never-list with his words, and a
  checklist. Unlike the making-of docs, this one IS in the site's look, because it is the look.
- **Next:** his notes. Then the asset kit it lists: Resolve/Fusion macros named JATIN, a PNG sticker pack, layered
  templates, swatch files.
- **Watch out:** the glitch split in the CSS puts cyan on the RIGHT and pink on the left (CLAUDE.md says the
  reverse); the brief follows the code.

---

## 2026-11-09 — Deployed: frame governor, phone layout, CONTACT intent + email rules
- **His word:** "deploy".
- **Rollback point (recorded before):** site = Pages run 42511956743 (commit 824644d); Worker jatin-contact-mail v2
  `ee5acb86-1c45-44b8-a4e4-f358401534a6`. Roll back the Worker with `cf workers versions` / redeploy v2; the site with
  `git revert --no-edit 824644d..6716cd0 && git push`.
- **Went live:** Worker `e510cc5b-bb9c-433e-aa08-eb22f221a187` (new brief + email rules), then site 6716cd0 (Pages run
  42584520369, success).
- **Checked:** live Worker refuses "hi" (422 line) and gg@gmail.com (422 email) with invalid bodies only (no mail sent);
  `/` and `/jatin-cutout.png` 200; live index carries the new code; `tests/check.mjs` live: all ok except 1 photo + 2
  edits (flux-edits/03, 07) "fetch failed" — the network here was resetting connections (git fetch and gh failed the
  same minute). Those files didn't change in this release. Re-run `node tests/check.mjs https://justjatin.thotahub.in`
  on a stable connection.
- **Next:** a real iPhone pass on CONTACT; a friend's laptop on CONTACT; one real send once he confirms the Gmail
  verification.

## 2026-11-09 — Frame governor + phone layout pass. NOT deployed
- **His note:** frame drops for users (worst on CONTACT) and "the phone layout needs alot of work".
- **Measured** (headed Chromium, Metal, 1440×900 @2x, GPU time by forcing a 1px readback after each draw, probe
  only): phone 7–12.6ms GPU per frame at 2160×1350, computer 6.7ms, SKILLS card 1.2ms. JS p95: menu 5.8ms, ABOUT 8.2ms
  (DitherFX repainting every shape on one frame).
- **Did:**
  - `Q` (top of the script): frame governor. 40-frame windows; display interval = fastest frames; p50 > 1.35× or
    p90 > 2.1× → `s *= .82` (floor .45); five calm windows → `s /= .88`; 900ms between changes. Integrated GPUs
    (WEBGL_debug_renderer_info: Intel/UHD/Iris/AMD APU/Mali/old Adreno/SwiftShader) start at .7. `body.fxLow`
    (s < .8) drops the CSS fringe on `.phCv`/`.pcCv`. `Q.set(v)` forces a level. Multiplied into the R of PhoneFX,
    MonitorFX, CamFX and the SKILLS GL card (floor .6 there).
  - DitherFX: shapes due at 30fps each, oldest first, 1.4ms budget per frame; element list re-read every 250ms.
  - livingWedge: table sine, half the rows per pass (interlaced), full refresh still 30fps.
  - Phone layout: `fitWedgePhone()` (menu block between logo and plates, `.phS` / `.phXS` steps); ABOUT phone lens
    `[.47W, max(.235H,128)]`, edges keep their angles; SKILLS phone card hangs off the heading; compact phone info
    plate; bubble `min(50vw,200px)`; `deco()` bound tightened to the lid (`.28×.5` at y .49, +.01).
  - CONTACT blurb no longer says "just to talk shop".
  - `tests/browsers/run.mjs`: intro skip-tap moved from .7 to .22 of the height (on a 360×732 Pixel it opened
    ABOUT). 14/14 pass locally.
- **After:** 120fps on every screen here; menu JS p95 2.5ms, ABOUT 4.3ms.
- **Not verified:** a real weak laptop. The governor was only exercised by a probe stall and forced levels.
- **Next:** deploy on his word, site + contact Worker together (`cd worker/contact-mail && cf deploy`, then push);
  then a friend with a laptop tries CONTACT.

## 2026-11-09 — the story document: "JATIN, Unchained" (his ask)
- **Did:** a narrative making-of, written as themes, not a log: who he is (the ABOUT plate), the idea, the chain as his breaking-his-limits metaphor (every screen arrives held and the visitor breaks it), timing, what he cut and the rules it left, objects, his own material, how he works, the visitor, where it stands. His quotes throughout. Plain design per his part-one note (Plex Sans/Serif/Mono, one magenta accent, light/dark). Published private: https://claude.ai/artifact/QKAWewkWe8qrBfXMK3CJpF. Source `docs/process/story/` (`index.html` + `img/`, 1200px copies of stills).
- **Not checked:** the live page by eye (the in-app browser isn't signed in to claude.ai); all 20 files confirmed published.
- **Next:** his read. Part one (https://claude.ai/artifact/9vkQ3GiZtP5aj2mN44TBtP) stays as the round-by-round log.
- **Watch out:** no site code touched.

## 2026-11-09 — CONTACT: glitch, press feedback, intent, real email. NOT deployed (site or Worker)
- **His note** (iPhone clip): glitch round the phone, no click feedback, hard to read, no "just hi", fake emails pass.
- **Glitch:** `deco()` in the phone shader early-outs with `z-.04`, a depth-only slab. Rays grazing it far from the
  phone hit the ink-rule test (`dm<2.6*uDpr`) and smeared black. Now `max(z-.04, footprint box)`. If more blobs
  ever show, tint the ink rule red and colour by the min-distance material to find the bad SDF.
- **Tap twin drift:** the still-chat early return compared `P.zk` with a stale `zCache.key`; it now calls
  `zoomPose(R)` first, so a resize (iOS toolbar) re-frames the phone and the twin.
- **Chat:** IDEAS = edit / shoot / direction / something else; `line` required (`briefOk`: ≥25 chars, ≥5 words, not a
  greeting); reply = email only (`emailErr`: syntax, typo map, throwaway list; `mxOk`: Cloudflare DoH MX, 3s
  timeout, fails open). Press state `pressK` on pointerdown; pick holds 170ms (`busy`). Type 30→33, notes 27+;
  phone LCD fills the width (`zoomPose` want/cy).
- **Worker** (`worker/contact-mail/src/index.ts`): same rules; 422 `{why:'email'|'line'}` sends the phone back to
  that screen. Tested with a mock mailer (no real sends). **Deploy the Worker and the site together**: the live
  Worker refuses "something else", the live site still offers "just saying hi".
- **Next:** on "deploy": `cd worker/contact-mail && cf deploy`, then push. Real-device pass on his iPhone.
- **Later the same day:** his test `gg@gmail.com` passed (gmail has MX). Added `userOk`: Gmail 6–30 letters/digits/dots,
  iCloud 3–20, Yahoo 4–32, on the phone and in the Worker. Offered a mailed 4-digit code as the real proof; **his
  call: "Rules are enough"**. Don't build the code check unless he asks.

## 2026-11-09 — Menu chain comes out of the vanishing point. NOT deployed
- **Did:** in `ChainFX`, `buildPath(W,H,tri,vp)` puts a key point at the world's vanishing point in front of the
  old origin. The path cache is keyed on the VP. The triangle clip is gone. Links under .8px are drawn as ring-colour
  slivers, and links under .1px are skipped. Checked at 1440×900, 1440×700, 1280×800 and 375×812, on the menu
  and CONTACT.
- **Watch out:** the dark "crack" on the phone's CONTACT field was there before this change: it's a DepthFX ink
  streak, not the chain.
- **Next:** his notes; deploy on his word.

## 2026-11-09 — CONTACT lag + slow send fixed. Site NOT deployed; Worker IS live
- **His note:** "after the flip phone in contact it's kind of laggy … the cursor and animations feels very laggy
  and it's a bit of time to sending the message mail".
- **Cause, measured in headed Chrome on the Metal GPU:**
  - the phone canvas is 2160×1350 at DPR 1.5;
  - it redrew every vsync while ringing or buzzing (~80 draws/s on 120Hz);
  - with the chat open it redrew 30–50/s, although the zoomed phone is perfectly still and fills the screen.
  - Result: p95 frame 16.7ms, worst 50ms, which is the cursor stutter.
- **Did (`site/index.html`, PhoneFX `frame`/`size`):**
  - the open chat redraws only when the LCD changes (`pushLCD` clears `P`) or its framing does (`P.zk` vs
    `zCache.key`, `P.R`);
  - anything moving caps at 60fps;
  - while ringing, buzzing or snapping it renders at .78 resolution (`shaking`), which can't be told apart in
    stills.
  - Now 120fps flat in every CONTACT state, p95 9.3ms.
- **Send:** Email Service takes ~6.4s per send. The Worker now validates, answers at once, and finishes the send
  in `ctx.waitUntil` (~0.2s to the phone). A failed send is logged (`npx wrangler tail jatin-contact-mail`),
  not shown. Worker version ee5acb86, **already live** (it deploys separately from the site).
- **Oops:** three timing POSTs went out as real emails ("QA test · just saying hi"). The address had been
  verified since the release. Never POST a valid body to the live Worker without asking.
- **Rollback point (before the push):** Pages run 42506315238 (afb51b3). Roll back: `gh run rerun 42506315238`.
- **Live:** 824644d, Pages run 42511956743 (success). The live page carries the fix; `run.mjs <live>` passes 6/6
  (Chrome, Safari, three iPhones, Pixel 9).
- **Next:** one real test message from the live phone.

## 2026-11-08 — RELEASE: the full site replaces the Vogue apply build. Mail goes live.
- **Rollback point (recorded before the push):** live was Pages run 41129488755 (commit 9599bfb, site from
  a3cc3b5, apply mode). Roll back: `gh run rerun 41129488755`, or `git revert --no-edit <release>..HEAD && git push`.
  Snapshot of the pre-release page: `.local/snapshots/2026-11-08-pre-release-index.html`.
- **Did:**
  - `APPLY=false`: the intro lands on the menu.
  - The QA pass, below.
  - Contact mail is live:
    - Email Routing is on for `mail.thotahub.in` ONLY. Its MX is route1–3.mx.cloudflare.net. The apex MX is still
      his registrar forwarding (eforward1–5), untouched.
    - Destination thotajatin.work@gmail.com was added. **It stays unverified until he clicks Cloudflare's email.**
      Until then a send fails and the phone falls back to the mail-app step.
    - Worker `jatin-contact-mail` is on the custom domain `contact.thotahub.in` (no workers.dev), version
      91d38993-3dfd-415b-8f56-0909bc5432b4.
    - The worker builds through `vite.config.ts` + `@cloudflare/vite-plugin` 1.64.0 / vite 8.3.4, pinned dev-only:
      `cf deploy` refuses to build without a declared dev server.
    - Smoke test: OPTIONS 204, a foreign origin 403, bad fields 422.
    - `MAIL='https://contact.thotahub.in/'` in PhoneFX.
  - The tests (`tests/browsers/run.mjs`) open PROJECTS from the menu plate when the intro lands on the menu.
- **Live:** commit afb51b3, Pages run 42506315238 (success, 2026-11-08 17:44Z). Checked on the live domain:
  - `/`, `/?frame=20` and the cutout return 200;
  - the served page has `APPLY=false` and `MAIL` set;
  - `tests/check.mjs <live>` passes: every photo and edit is served correctly;
  - `run.mjs <live>` passes on Chrome, Safari, the three iPhones, Pixel 9 and Galaxy S24.
- **Flaky test:** the Android configs sometimes time out tapping `#m-projects` while the menu is still cascading
  in. A retry passes. That is the test, not the site.
- **Next:** once he verifies the address, send a real message from the live phone and confirm it lands in Gmail.
- **Watch out:** chat BACK double-clicked 200ms apart can still skip a screen, although `act()` has a 380ms guard.
  The cause was not found.

## 2026-11-08 — Launch QA: 5 simulated first-time users, fixed, rerun. NOT deployed at the time
- **Did:** five persona agents (impatient, skeptic, mobile slow-3G, non-native, breaker). Their briefs and the
  per-user findings are in the session scratchpad. Fixes in `site/index.html`, each marked `QA` in a comment:
  - the contact chat:
    - ends on a MAIL step, not "no signal";
    - no answer picked in advance;
    - real validation of the reply field;
    - a pink warning bar, with the empty field outlined;
    - the email shown on the LCD is a mailto link;
    - one guard against double clicks and key mashes, in `act()`;
    - the send timer is cleared, so the chat no longer haunts the LCD after EXIT;
    - the read-only status field shows its text;
    - on a phone the LCD refits above the keyboard (`zoomPose` with `kb`).
  - clicks during the computer's and the phone's entrances are queued, not dropped;
  - the transition canvas lets input through once a section has swapped in;
  - JATIN OS: one Esc is held during its animations (`qEsc`);
  - `popstate` reads the live URL when it applies, and a hash typed into the address bar opens that section;
  - the menu remembers the last section (`lastSec`);
  - wording follows the device (`isTouch()`): TAP vs CLICK;
  - a `.skHint` on SKILLS;
  - phones: 44px OS controls and no label under 11px;
  - the portrait loads after the menu (`data-src`), and grid thumbs load lazily past 11;
  - `?frame` only takes digits;
  - og:url and canonical point at justjatin.thotahub.in.
- **Kept on purpose:** CLICK ANY BUTTON on desktop, CLICK IT!/CLICK AGAIN!, Enter = back on sections, and
  #hash reloads restart the intro.

## 2026-11-08 — SKILLS card copy rewritten in his voice. NOT deployed, site/ uncommitted
- **Did:** the three `desc` lines in `CARDS` + the placeholder `.skDesc` in the HTML. Fit checked at 1440×900,
  1440×700, 375×812.
- **Next:** his notes. The PHOTOGRAPHY card still carries an EDITORIAL tag.

## 2026-11-08 — Identity copy matches the ABOUT plate. NOT deployed, site/ uncommitted
- **Did:** title, meta/OG, `#logoSub`, `data-desc` on ABOUT/PROJECTS/SKILLS (+ `#wedgeDesc` fallback), ABOUT role
  ribbon order, PHOTOGRAPHY card copy. No overflow at 1440×900, 1440×700, 375×812.
- **Next:** his notes. The SKILLS deck order (VISUAL DIRECTION first) is his earlier call; left as is.
- **Watch out:** og:url still points at the old github.io address; fix at release.

## 2026-11-08 — Custom cursor (CursorFX) + CLICK ME in VT323 with a pressing hand. NOT deployed, site/ uncommitted
- **Did:** `CursorFX` (end of the script, `CursorFX.init()`): extruded pixel arrow/hand/I-beam on `#cuCv`, accent
  side via `worldToMenu`/`worldToSection`, lean spring, press. `html.cuOn *{cursor:none!important}`. CLICK ME!! on
  the PROJECTS screen is VT323; the `blink` slot of `screenState` is now the press step (0–19 at 12fps);
  `MonitorFX.peek(21+k)` shows step k.
- **In flight:** nothing.
- **Next:** his notes on the cursor in a real browser (the preview pane runs at 1–2fps, don't judge it there).
- **Watch out:** hand detection reads the stylesheet's `cursor:` rules once at init plus inline `style.cursor`;
  new clickables just need `cursor:pointer` as usual. Safari: check the cursor hides over the 3D canvases.

## 2026-11-08 — PROJECTS CLICK ME!! re-lettered. NOT deployed, site/ uncommitted
- **Did:** `drawScreen` 'click' draws CLICK ME!! per glyph at .14em tracking, 3px stroke, +.3em after the L,
  fitted to 600px.
- **Next:** his notes.
- **Watch out:** any Cyberway text on a canvas needs hand tracking (`makeLogo` does the same).

## 2026-11-08 — BACK top-left on every page. NOT deployed, site/ uncommitted
- **Did:** `.backBtn` is a compact tab at top-left (`--backTop`); headings sit at `--headTop`; `.secBody` and the
  SKILLS `.skSlot` hang off it (the card shrinks on short screens). Phone BACK smaller. Audited 1440×900, 1440×700,
  1280×800, 375×812 on all four sections.
- **In flight:** nothing.
- **Next:** his notes.
- **Watch out:** anything new placed under a heading must use `--headTop`, not 7vh. JATIN OS keeps its own `.osBack`.

## 2026-11-08 (about r18) — ABOUT marker made subtler. NOT deployed, site/ uncommitted
- **Did:** toned down the `.hl` CRT strip (paler cyan, half-strength scanlines/grille, small glow, fainter fringe).
- **In flight:** nothing.
- **Next:** his notes.
- **Watch out:** keep the marker pale; on silver a full-accent strip reads louder than the heading.

## 2026-11-08 (about r17) — ABOUT plate moved into the beam, bigger; CRT marker. NOT deployed, site/ uncommitted
- **Did:** moved the bubble to his drawn box on desktop and scaled the type, capped by vh. The `.hl` marker is now a
  static CRT strip. Checked at 1440×900, 1440×700, 1280×800 and 375×812: no collisions.
- **In flight:** nothing.
- **Next:** his notes.
- **Watch out:** the CRT fringe on `.hl` is .6px on purpose. A wider split doubles the mono letterforms.

## 2026-11-08 (about r16) — ABOUT copy is his quote. NOT deployed, site/ uncommitted
- **Did:** the bubble copy is now "Photographer, editor, director from India, and I never stop experimenting.", then
  his quote in the marker. He approved the wording.
- **In flight:** nothing.
- **Next:** his notes. His second quote (gratitude) is unused; it could suit CONTACT.
- **Watch out:** say India, not Hyderabad, in ABOUT copy (his call).

## 2026-11-08 (about r15) — ABOUT description is a silver plate, new copy. NOT deployed, site/ uncommitted
- **Did:**
  - `.cgBubble`: paper, 3px ink rule, ink drop, ink type at weight 700. The spike is two layers, ink `::before`
    and paper `::after`.
  - The copy is rewritten, pending his yes.
  - The Plex Mono request now includes italic 600/700.
  - Snapshot before: `.local/snapshots/2026-11-08-about-round14-index.html`.
- **In flight:** his OK on the wording.
- **Next:** his notes.
- **Watch out:** italic Plex at 600+ used to be synthesized. If you trim the font request, keep `1,600;1,700`.

## 2026-11-08 (about r14) — ABOUT fields no longer re-cut per frame (his flicker clip). NOT deployed, site/ uncommitted
- **Did:**
  - `.cgField` is z0, unclipped, under the beam. `apply()` no longer touches the fields.
  - `#sec-about .secWedge{filter:none}`.
  - `#fxCv` in ABOUT is clipped to `--beam` (set when `apply` runs at o=1), hidden until `.lit`.
  - The settled stills match round 12.
- **In flight:** nothing.
- **Next:** his check in his browser. I couldn't reproduce the tile dropout here.
- **Watch out:**
  - Never put a big masked/dithered layer on a per-frame `clip-path` again. Animate the cut on the thing in
    front, over a still background.
  - `#fxCv` must stay above `.cgLight` in ABOUT, or the light hides the grid.

## 2026-11-08 (about r13) — beam glow no longer flickers the fields. NOT deployed, site/ uncommitted
- **Did:** in `AboutFX.fan`, the glow outside the beam is now a fixed band off its edges (perpendicular px), not
  3.2x the beam's angle. The settled frame is unchanged, since the glow only exists while the beam is boosted.
- **In flight:** nothing.
- **Next:** his look in a real tab.
- **Watch out:** Playwright *headless* screencasts show canvases blinking on alternate frames. That's an artifact;
  film in headed Chrome (`headless:false`) to judge flicker.

## 2026-11-08 (about r12) — grab removed, ABOUT back to round 10. NOT deployed, site/ uncommitted
- **Did:** removed round 11's drag (`LU`, `camHit`, `wire`, the grab cursors, `touch-action`). Also removed the
  unshown round 12 float (`CamFX.sway`) and the chain pin (`_runShift`, `RUN_W`). The stills match round 10.
- **In flight:** nothing.
- **Next:** his next ABOUT note. Motion still hasn't been judged in a real tab, only in headless scrubs.
- **Watch out:** the r11 entry below describes code that no longer exists.

## 2026-11-08 (about r11) — ABOUT camera is draggable, the projection follows. NOT deployed, site/ uncommitted
- **Did:**
  - `AboutFX` keeps `LU` (the lens as fractions). `layout()` uses it; T and B stay fixed.
  - `camHit` is a capsule down the body from the lens, live once `.lit`.
  - Pointer events sit on `#sec-about` (capture, skipping BACK), with an rAF-throttled relayout. Classes:
    `.camHover` (grab cursor), `.camGrab`.
  - `#sec-about` is now `touch-action:none`.
  - Clamp: desktop x .14–.6, y .2–.6; phone x .12–.88, y .08–.36.
  - The field split now hangs off the lens (L.x − .2W).
- **Not done:** keyboard has no way to move the camera (it's extra play, not navigation).
- **Watch out:** the DepthFX vanishing point stays at the default lens spot. The fields cover the world, so it
  barely shows.

## 2026-11-08 (about r10) — ABOUT camera aimed down the beam's bisector. NOT deployed, site/ uncommitted
- **Did:**
  - `CamFX.place(lens, size, dir)` → `aim(dir)` searches the roll so the lens axis (toW of +x) matches the
    bisector on screen. The result is stored in `RQ`, which `pose` uses.
  - REST yaw is now -.62.
  - Desktop size is now min(.205W, .34H).
- **Watch out:** if the beam geometry changes, the aim follows on its own; don't hand-set the roll.

## 2026-11-08 (about r9) — ABOUT beam spreads the instant it lands. NOT deployed, site/ uncommitted
- **Did:**
  - Timeline is now R0 960 / R1 = R2 1200 / O1 1600. The reach is ease-out quad and the spread ease-out cubic.
  - `fan` reach is the farthest frame corner from the lens, so the beam lands on the edge at R1.
  - Retimed: portrait 1.48s, deco 1.52s, chain 1.64s, pops 1.6–1.94s.
- **Watch out:** don't put a hold or an ease-in between the beam and the spread.

## 2026-11-08 (about r8) — ABOUT projector throws a beam of light that fans into the projection. NOT deployed, site/ uncommitted
- **Did:**
  - `AboutFX.fan(o,len,boost)` replaces the fan part of `light()`: core + glow + lens flare scaled by boost, plus
    the Bayer fan. Deco stays in `light()`.
  - Timeline: R0 960 / R1 1260 / R2 1340 / O1 1780. `at()` returns {o, len, a, open}. `apply(open)` drives the
    cyan beam, bands and fields; `fan(o, len, a)` drives the light.
  - `.cgLight` is z4 while it plays (over the fields) and z2 once `.lit`.
  - `.cgRay` is no longer used.
  - Retimed: portrait 1.66s, deco 1.7s, chain feed 1.82s, pops 1.78–2.12s. `snap.mjs` ABOUT settle is now 3400ms.
- **Watch out:** `fan` with boost runs full-frame for ~0.8s (~3ms a frame); after that it's drawn once.

## 2026-11-08 (about r7) — ABOUT camera rolls in on one smooth move. NOT deployed, site/ uncommitted
- **Did:**
  - `CamFX.pose` is now one ease-out cubic over `IN` = 1000ms.
  - Position and log-size follow a quadratic curve through the near point (.52W, .58H, S = 1.6·min side).
  - Roll is REST + 2π·(1−e); yaw and pitch swing head-on by sin(πe).
  - `FLY_A` / `FLY_B` are gone.
- **Next:** his notes. Judge it in a real tab.
- **Watch out:** CamFX's `init` / `r2` / `toW` / `LENS` sit between `REST` and `pose`. Don't splice that region by
  index again: a bad splice dropped them once this round, and was caught and restored.

## 2026-11-08 (about r6) — ABOUT entrance: camera rushes at you, then the ray opens into the projection. NOT deployed, site/ uncommitted
- **Did:**
  - `CamFX.pose(ms,W,H)` gives far (bottom-right, .3×) → near (head-on, S = 1.9·min side) → REST.
    `FLY_A` = 450, `FLY_B` = 530, `IN` = 950.
  - `AboutFX.apply(o,len,a)` opens the beam: the edges come out of their bisector, with the bands, fields,
    `.secBand` and `.cgRay` following.
  - `beam()` runs the timeline: R0 960, R1 1100, O1 1420. Then `.lit` shows the white fan.
  - `AboutFX.hold(ms)` + `CamFX.hold(ms)` scrub it.
  - Fields and beam are now cut at a box 40px outside the frame, corners taken in angle order (`side()`).
  - Retimed: portrait 1.38s, deco 1.36s, chain feed 1.46s, pops 1.42–1.78s. `snap.mjs` ABOUT settle is now 3000ms.
- **Next:** his notes. Judge the motion in a real tab.
- **Watch out:** fully shut (o=0) is special-cased, or the fields collapse to nothing.

## 2026-11-08 (about r5) — ABOUT gets one perspective chain on his path. NOT deployed, site/ uncommitted
- **Did:**
  - `ChainFX.about(sec)` draws on `.cgRunB` (z6, under the portrait) and `.cgRunF` (z8, over him).
  - The path comes from `RUN_D` / `RUN_P`: fractions plus link scale, Catmull-Rom smoothed, with the chain
    coordinate built as in the menu.
  - `RUN_SPLIT_*` is the key where it swaps to the front canvas.
  - It feeds in at 820ms (450ms ease-out quart), then scrolls at 1 link/s. Its loop stops when ABOUT closes.
- **Next:** his notes.

## 2026-11-08 (about r4) — ABOUT has no chains. NOT deployed, site/ uncommitted
- **Did:** removed `.cgChainA` (markup, CSS, path) and the `ChainFX.slam` call in `openSection`. The ChainFX
  path code stays for other sections.
- **Next:** his notes.

## 2026-11-08 (about r3) — ABOUT: name top-right, band chains cut, pink/purple blend. NOT deployed, site/ uncommitted
- **Did:**
  - `.cgTag-name` moved into the pink field (56vw / 7vh; phone: top-right).
  - Chains B and C removed (markup, CSS and paths).
  - Both fields now take the same "outside the beam" clip. `.cgFieldT` gets a linear `mask-image` computed in
    `AboutFX.layout`, normal to the lens→S ray, ±.2·min(W,H).
- **Next:** his notes.
- **Watch out:** the mask angle and offset are in px from the element box (the full section), so recompute them on
  every layout.

## 2026-11-08 (about r2) — ABOUT fields cover everything outside the beam; chains out of the lens. NOT deployed, site/ uncommitted
- **Did:**
  - `.cgFieldT` (#b81d66) and `.cgFieldB` (#560c80) sit at z3, both in DitherFX `SEL` with 5px cells.
    `AboutFX.layout` clips them, split on the ray from the lens to (.08W, top); on phones (.22W, top).
  - Chains B and C ride the bands (`ride()` in `layout`), at z6 so they sit over the bands and under him.
- **In flight:** nothing.
- **Next:** his notes on round 2.
- **Watch out:**
  - The fields must stay darker than the bands, or the stripes vanish.
  - Snapshot of round 1: `.local/snapshots/2026-11-08-about-round1-index.html`.

## 2026-11-08 (about r1) — ABOUT rebuilt as the handycam projector (CamFX + AboutFX). NOT deployed, site/ uncommitted
- **Hooks:**
  - `AboutFX.layout()` derives everything from the lens point: band clip-paths, the beam, the light / burst canvases,
    the chain paths, `--lens`.
  - `CamFX.place(lens,size)`; `CamFX.hold(ms)` scrubs the swing-in.
  - The chain canvases read `data-path`.
- **Watch out:**
  - The old poster page lives only in `.local/snapshots/2026-11-08-phone-round26-index.html`.
  - The portrait's cut arm must stay on the frame's right edge.
- **Next:** his notes on the composition and the camera, then motion polish (the projector "on" beat).

## 2026-11-08 (phone r27) — CONTACT: click 1 flips the lid open and that bursts the chains; it buzzes open with CLICK AGAIN!; click 2 brings it close. Pop-ups are tapering RING! bursts. NOT deployed, site/ uncommitted
- **Hooks:**
  - `breakChains()` sets `SNAP=c1`; `answer()` opens the dolly at once.
  - `hold(ms,c1,c2)`: SNAP follows c1.
  - The LCD has a `'msg'` kind while notify.
  - `RINGP`/`TIP`/`VB`: the burst path; `place()` pivots on the tip and keeps the burst on screen.
- **Next:** his notes; judge the ring and buzz in a real tab.

## 2026-11-08 (phone r26) — CONTACT: smoother ring, reference-style pop-ups, the chat drawn ON the model's LCD (invisible DOM twin for input). NOT deployed, site/ uncommitted
- **Hooks:**
  - `layout()` → `paintChat()` (texture) + `render()` (DOM twin); `repaint()` = texture only.
  - `pushLCD(kind)`: 'chat' paints the chat.
- **Watch out:**
  - Any new chat element must go in `layout()`, or it shows on neither the texture nor the twin.
  - Inputs in the twin are 16px (iOS zoom).
  - Judge the ring in a real tab.
- **Next:** his notes; frame cost in a real tab. Cloudflare mail only at release.

## 2026-11-08 (phone r25) — CONTACT intro: chained + ringing (CLICK IT!), click breaks chains, buzz (CLICK AGAIN!), click answers into the chat. NOT deployed, site/ uncommitted
- **Hooks:**
  - `stage()`, `ringEnv`/`buzzEnv`, `breakChains`/`answer`, `wrap()` (chains + snap), `pops()` (DOM SVG pop-ups).
  - `hold(ms,c1,c2)` scrubs any beat.
  - SNAP/BOOT are now set by the second click.
- **Watch out:**
  - Anything that scripts CONTACT has to press Return twice (or click) before the lid opens.
  - Judge the shake in a real tab.

## 2026-11-08 (contact chat) — CONTACT step 2 built: click the phone, it dollies in, the LCD asks 4 questions. NOT deployed, site/ uncommitted
- **Did:** PhoneFX open/close/key/hit + `.phChat` DOM layer; `worker/contact-mail` (cf Worker, send_email locked to thotajatin.work@gmail.com).
- **In flight:** Cloudflare setup, which waits for the release (his call, 2026-11-08: "once we got done with website and are going update the hosted site with it"):
  1. Email Routing on the `mail.thotahub.in` subdomain. The apex has registrar MX forwarding; don't touch it.
  2. Verify the destination (he clicks the link Cloudflare sends).
  3. `cf deploy` the Worker and set `MAIL` in PhoneFX.
- **Watch out:**
  - `MAIL` is empty, so sends fall back to mailto.
  - The Worker has not been dry-run: `cf` is not installed in `worker/contact-mail` yet.
  - The live site is APPLY mode, so CONTACT is not reachable there anyway.

## 2026-11-08 (phone r24) — CONTACT round 24: lid stickers are the site's marks (wedge, pixel link, sparkles, P5 stars) as Bayer-lit enamel badges. NOT deployed, site/ uncommitted
- **Next:** his notes; frame cost in a real tab; step 2.

## 2026-11-08 (phone r23) — CONTACT round 23: leaf-pod hinge from his drawing. NOT deployed, site/ uncommitted
- **Did:** halves round into the joint (corner radii .17), knuckles are lime round-cone pods (`rcone`).
- **Next:** his notes; frame cost in a real tab; step 2.

## 2026-11-08 (phone r22) — CONTACT round 22: chrome bands follow the outline + tribal flares. NOT deployed, site/ uncommitted
- **Did:** `cornerChrome()` replaces the clips: band from the outline distance, tapered by the corner angle, plus hooked flares.
- **Next:** his notes; frame cost in a real tab; step 2.

## 2026-11-08 (phone r21) — CONTACT round 21: clips as true rounded extrusions, pink stone, lid clips up the sides. NOT deployed, site/ uncommitted
- **Watch out:** never fake a height off a 2D distance (`max(d2,|z|-h(d2))`): it isn't a distance field; rays exhaust and the ink rule paints them black. Use `ext()`.
- **Next:** his notes; frame cost in a real tab; step 2.

## 2026-11-08 (phone r20) — CONTACT round 20: clips wrap the edge (front + smaller back + spine). NOT deployed, site/ uncommitted
- **Watch out:** shut, the lid's and body's clips stack at the same corners during the rise.
- **Next:** his notes; frame cost in a real tab; step 2.

## 2026-11-08 (phone r19) — CONTACT round 19: tribal corner clips, plain chrome (bumper + bands gone). NOT deployed, site/ uncommitted
- **Did:** `caseD` = 4 clips (`clipAt`/`clip2`/`blade`), domed profile; material 16 = plain mirror chrome.
- **Next:** his notes; measure the frame cost in a real tab (lighter than round 18); step 2.

## 2026-11-08 (phone r18) — CONTACT round 18: thorned liquid-chrome case. NOT deployed, site/ uncommitted
- **Did:** `caseD()` (bumper per half, open at the hinge, ten straight horns) as material 16, shaded with the card's hard chrome bands. The bounding box is −.52….52 x, −1.22…1.25 y, −.5…1.3 z.
- **Watch out:** don't bend `thorn`'s axis (it broke the field: specks only). Frame cost is unmeasured and likely up; measure it in a real tab before deploy.
- **Next:** his notes; frame cost; step 2.

## 2026-11-08 (phone r17) — CONTACT round 17: the phone follows the cursor like the computer. NOT deployed, site/ uncommitted
- **Did:** `par`/`parT` in PhoneFX (window pointermove), eased in `frame()`, added in `angles()` × the float ramp. Memory `no-cursor-parallax` updated: the phone is now an exception like the computer.
- **Next:** his notes; frame cost in a real tab; step 2.

## 2026-11-08 (phone r16) — CONTACT round 16: lid test reaches the hinge (last dotted line gone). NOT deployed, site/ uncommitted
- **Did:** "on the lid" = `p.y>.05 || (lid(p).y>.02 && p.y>-.03)` in both the halftone and the gloss.
- **Watch out:** if `TH` (the lid's fold) changes, recheck the strip next to the hinge up close.
- **Next:** his notes; frame cost in a real tab; step 2.

## 2026-11-08 (phone r15) — CONTACT round 15: tray walls unprinted (no dotted outline). NOT deployed, site/ uncommitted
- **Did:** the lid-panel rule covers the tray walls (no normal test, edge +.014).
- **Next:** his notes; frame cost in a real tab; step 2.

## 2026-11-08 (phone r14) — CONTACT round 14: hinge barrel unprinted. NOT deployed, site/ uncommitted
- **Did:** one more `tone=0.` rule (the barrel). Unprinted now: LCD, its bezel, the lid's inner panel, the hinge barrel.
- **Next:** his notes; frame cost in a real tab; step 2.

## 2026-11-08 (phone r13) — CONTACT round 13: heavy lacquer gloss on the lid panel. NOT deployed, site/ uncommitted
- **Did:** gloss block after the metal shading line (lid tray only): deep base, hard sliding window strips, lip, pin spec.
- **Next:** his notes; frame cost in a real tab; step 2.
- **Watch out:** a pure env reflection does not read on a face looking at the lens; the strips are what sell the gloss.

## 2026-11-08 (phone r12) — CONTACT round 12: the lid's whole inner panel unprinted. NOT deployed, site/ uncommitted
- **Did:** the halftone skips the lid's inner tray (its own `sdR2q`); the rim, the body and the outer lid keep it.
- **Next:** his notes; frame cost in a real tab; step 2 (the keys work).

## 2026-11-08 (phone r11) — CONTACT round 11: tiled keypad (his drawing), clean screen panel. NOT deployed, site/ uncommitted
- **Did:** `keys()` is a tiling (grid + oval nav + four corner keys, grooves only). The halftone skips the lid panel round the LCD. Round 10's page: `.local/snapshots/2026-11-08-phone-round10-index.html`.
- **Next:** his notes; frame cost in a real tab; step 2 (the keys work).

## 2026-11-08 (phone r10) — CONTACT round 10: clean LCD, no dots on its frame. NOT deployed, site/ uncommitted
- **Did:** `smooth()` replaces `bayer()` for the LCD backlight; the halftone skips the LCD bezel by region. Round 9's page: `.local/snapshots/2026-11-08-phone-round9-index.html`.
- **Next:** his notes; frame cost in a real tab; step 2.

## 2026-11-08 (phone r9) — CONTACT round 9: surface-printed halftone, electric-blue LCD. NOT deployed, site/ uncommitted
- **Did:** the halftone block after the tone map now works in object space (triplanar, lid frame on the lid), ink = a dark shade of the surface. `lcd()` uses the blue ramp with pale ink. Round 8's page: `.local/snapshots/2026-11-08-phone-round8-index.html`.
- **Next:** his notes; measure the frame cost in a real tab; step 2.
- **Watch out:** never go back to `gl_FragCoord` dots on a model; that is what read as an overlay. If the layout's `uS` changes, the dot pitch follows it.

## 2026-11-08 (phone r8) — CONTACT round 8: more contrast, hanging chain, JATIN tag. NOT deployed, site/ uncommitted
- **Did:** darker env + harder key, front fill .5; metal `*mix(.38,1.2,dk*sh)`. The strap is a verlet rope (`ropeStep`/`ropeTo`, `pin(ms)` uses the new `angles(ms)` split out of `pose`), 4 links + `tag()` hang-tag. Round 7's page: `.local/snapshots/2026-11-07-phone-round7-index.html`.
- **Next:** his notes; measure the frame cost in a real tab; step 2 (keys work, contacts on the LCD).
- **Watch out:** the strand hangs behind the phone's left edge (that side leans away); anything wide on the end hides. `hold()` resets the rope and re-simulates from 0.

## 2026-11-07 (phone r7) — CONTACT round 7: halftone tone back, lid bent forward. NOT deployed, site/ uncommitted
- **Did:** `TH=mix(pi,.3,uOpen)`. The env front fill is .8. The halftone uses `tone=smoothstep(1.,.12,lu)`.
- **Watch out:** the halftone needs tone. If a light or pose change brightens the body toward white, the dots vanish; check the faces up close.

## 2026-11-07 (phone r6) — CONTACT round 6: a sitting angle. NOT deployed, site/ uncommitted
- **Did:** REST is yaw .3, pitch **−.38**, roll .22. `TH=mix(pi,.12,uOpen)`. The lime base is (.95,1.08,.36).
- **Watch out:** in PhoneFX, NEGATIVE pitch sends the top away from the viewer. Rounds 5 and 5b used positive and tipped it toward him.
- **Next:** his notes; measure the frame cost in a real tab; step 2.

## 2026-11-07 (phone r5) — CONTACT round 5: his sketched angle. NOT deployed, site/ uncommitted
- **Did:** REST was yaw .3, pitch .34, roll .3; his "roll it back a bit" eased it to **yaw .3, pitch .25, roll .22**. The env sky top is lighter (.55,.52,.66).
- **Next:** his notes; the lid face reads darker than the base; measure the frame cost in a real tab; step 2.

## 2026-11-07 (phone r4) — CONTACT round 4: card pose, lime chrome, chain strap, round-2 screens. NOT deployed, site/ uncommitted
- **Did:**
  - REST is yaw .3, pitch .16, roll .15. The body base is lime.
  - `lcd()`, `outer()` and `bayer()` are back from round 2; the LCD is 384×490.
  - Shader strap removed. `strap(q)` in PhoneFX draws ChainFX links on `.phChain` canvases (back, plus front with `.front`), projected by `proj(toW(...))`, which must stay in step with the shader's camera.
  - Lid top: a crystal in a chrome ring at (0,.885), star studs at (±.16,.875).
  - The harness `phone.html` now loads ChainFX as well.
  - Round 3's page is at `.local/snapshots/2026-11-07-phone-round3-index.html`.
- **Next:** his notes; measure the frame cost in a real tab; step 2.
- **Watch out:** if the shader's camera changes (ro, focal 3.3, lift), change `proj()` too, or the strap drifts off the knuckle.

## 2026-11-07 (phone r3) — CONTACT round 3: posture, sunk hinge, keypad well, bigger screen, site theme. NOT deployed, site/ uncommitted
- **Did:**
  - Open angle `TH=mix(pi,.24,uOpen)`. REST is yaw −.26, pitch .12, roll .42. The face bow is .07.
  - Hinge barrel centred at z −.035: the middle is body pink (mat 1), the knuckles are mat 15 gunmetal.
  - Keypad well: `well` in `map`, floor at z −.018, mat 14 black gloss. `keys()` heights are measured from the floor; the rows wave. Key sides are chrome (`n.z<.62`).
  - LCD window is .2×.255. Canvases: `lcd()` (384×490) and `outer()` both use `shards()` and `glitch()`.
  - Halftone ink is applied to the metal materials after the tone map. The ink rule comes from `dm`, the closest approach of each missed ray, in px.
  - The strap frame is turned by `uRoll` (it hangs world-down) and sits off the left knuckle. The march box is ±.82 in x.
  - Round 2 page saved at `.local/snapshots/2026-11-07-phone-round2-index.html`.
- **Next:** his notes; measure the frame cost in a real tab; then step 2 (working keys, contacts on the LCD).
- **Watch out:** the ink rule needs `dm` tracked inside the march loop. Anything that ends the march early, like a tighter box, thins the outline.

## 2026-11-07 (phone r2) — CONTACT round 2: the decorated chrome phone, text box gone. NOT deployed, site/ uncommitted
- **Did:** PhoneFX shader rebuilt: both halves bow out on both faces (`p.z+=sign(p.z+mid)*.2*x²`; the shading re-applies the same bend before `keys()`), rolled rims with sunk trays, pearl thin film (`film()`), palette studio (`env()`), stones (`stone()` + `sdHeart`/`sdStar5`/`sdSpark`), lid stones in `deco(q,z,outer)`, bead strap `strap()` (box-gated), glints projected with the shader's camera after boot. Textures: LCD 384×464 (Bayer), key atlas (white print, handsets), outer display 256×296 (`uOut`). `#sec-contact .secBody` is visually hidden on every size; `rest()` starts at `.06W+2.6fs`. Round-1 page saved at `.local/snapshots/2026-11-07-phone-round1-index.html`.
- **Next:** his notes; measure the frame cost in a real tab (much heavier per pixel than round 1); then step 2.
- **Watch out:** materials are picked by float ids (20+ = beads). The LCD test needs `u.z>-.05`, or the outer display reads as the LCD.

## 2026-11-07 (phone) — CONTACT step 1: the 3D flip phone (PhoneFX). NOT deployed, site/ uncommitted
- **Did:** `PhoneFX` (before `openSection`) raymarches a clamshell on `.phCv`; `openSection` calls `PhoneFX.enter(el,180)`. Lid angle `TH=mix(pi,-.26,uOpen)` about the hinge (x axis at the origin); keys via `keys()`; LCD from a 384×496 canvas (`lcd()`), key labels from a 512×256 atlas, both no mips. `PhoneFX.hold(ms)` freezes the entrance. Harness: `.local/menu-preview/phone.html` + `phone-shot.mjs` (copy into `tests/browsers` to run, it needs Playwright).
- **Next:** his notes on the model; then step 2 (working keypad, contacts list on the LCD, card removed).
- **Watch out:** the idle float redraws at 30fps for as long as CONTACT is open; measure in a real tab.

## 2026-11-07 (camera look) — PHOTOGRAPHY: no black wedges; the camera looks at the cursor. NOT deployed, site/ uncommitted
- **Did:** `siteWorld` has no black shards (`sc=pcyc(...)` always). CamFilm `draw(W,H,T,px,py,still)` / `shot(s,px,py)`: yaw `.3-px*.62`, pitch `.26+py*.22`, plus a small sway. px/py are SkillFX's `par` (window-relative, tilt spring). The harness `cam.html` takes `?p=px:py,...` for one panel per pose.
- **Next:** his read, in a real tab.

## 2026-11-07 (case) — SKILLS: stars removed, skirt closes the card/plate gap, chrome case built while the menu is up. NOT deployed, site/ uncommitted
- **Did:** `SkillFX.prep()` (= `buildCase`) is called from `cascadeMenu()` +1.4s; `enter()` calls it as a fallback and `frame()` holds `t0` until `cas.ready` (max 1.6s). `.skInfoSkirt` is sized in `restage()`.
- **Watch out:** anything that starts the SKILLS entrance must let the case finish first, or the case pops in late again.

## 2026-11-07 (stripe) — SKILLS copy plate flush under the name stripe (one stripe). NOT deployed, site/ uncommitted
- **Did:** `restage()` sets `.skInfoB` padding-top to the bottom of `.skInfoMain`, the plate width to the stripe's 94% edge, and `--cut` to continue its slant. Stars now live in `.skInfoRow`.

## 2026-11-07 (full art) — SKILLS card face is all art; title/desc/tags moved under the banner. NOT deployed, site/ uncommitted
- **Did:** `.skScene` is full height; the face's plate, title, desc, tags and shine are hidden. `.skInfoB` (z8, over the front chain) holds the desc and tags; `restage()` gives it the banner's pivot. On a phone it's flat under the card, with `.skInfoBName`.
- **Watch out:** at 1440×700 the big numeral tucks under the PHOTOGRAPHY plate (this was already there).

## 2026-11-07 (flip) — SKILLS deal = one full flip through the back. NOT deployed, site/ uncommitted
- **Did:** `select()` sends `flipTo` to the next whole turn (direction follows next/prev); `frame()` swaps the face when `cos(yaw)<-.1`, with a 900ms backstop. Deal damping is 14.5 (a click flip is 10.5). `OUT`/`IN` removed. `dealHold(ms)` replays the spring for stills.
- **Next:** his read, in a real tab.

## 2026-11-07 (order) — SKILLS card order: 01 VISUAL DIRECTION, 02 VIDEO EDITING, 03 PHOTOGRAPHY (his call). NOT deployed, site/ uncommitted
- **Did:** reordered `CARDS`; the HTML placeholder card now matches card 01. Numbers, banner and plate menu follow the list. The eye is now `SkillFX.select(0)` in snapshots.

## 2026-11-07 (eye 6) — SKILLS round 49: eye depth (sphere ball, gaze-turned iris, lit relief, depth parallax) and a readable pupil. NOT deployed, site/ uncommitted
- **Did:** EyeFX `scene()` rewritten: `RB` sphere, `height()` relief, `uCam`/`uZ` drift (never the cursor), feed mapped off the normal. Reflection 55% on the iris, 22% on the pupil.
- **Next:** his read. Frame cost in a real tab (3 colour passes × 3 height taps), then the retired chair in Space.

## 2026-11-07 (eye 5) — SKILLS round 48: the eye's reflection flicks through his own photos (browse → flicker → LOCKED with pulled swatches → moodboard). NOT deployed, site/ uncommitted
- **Did:** EyeFX feed reads `PHOTOS` (moved to top level, markers intact) and lazy-loads the 46 thumbs when the card first draws. The harness `cam.html` sets `window.PHOTOS` and awaits `EyeFX.preload()`.
- **Next:** his read. 3.2MB of thumbs load with card 02; trim the list if phones feel it. Remove the retired chair from Space.

## 2026-11-07 (eye 4) — SKILLS round 47: EyeFX rebuilt from his new reference: one held eye, the look reflected in it. NOT deployed, site/ uncommitted
- **Did:** `EyeFX` is a 2D eye shader + a 512×320 feed canvas (texture unit 2 on Space's GL), redrawn on 2s at 12fps, pure function of time (`P:6.4`). Harness `cam.html` now loads Cyberway + VT323 for the feed text.
- **Next:** his read. Then remove the retired chair from Space.
- **Watch out:** the feed texture lives on unit 2; Space itself uses none. If Space ever gains a texture, keep off unit 2.

## 2026-11-07 (eye 3) — SKILLS round 46: EyeFX is now a flight through depth layers (eye / shatter frames / 3D spheres and cubes), no lashes. NOT deployed, site/ uncommitted
- **Next:** his read. Measure the card's frame cost in a real tab (11 layers × 3 passes). Remove the retired chair from Space.

## 2026-11-07 (eye 2) — SKILLS round 45: eye centred in the art window and rebuilt in the site's language (shatter world, star catchlight, ink drop). NOT deployed, site/ uncommitted
- **Watch out:** the card's art window is the top 64% and wider than tall. Render films at about 600×560, not portrait.

## 2026-11-07 (eye) — SKILLS round 44: VISUAL DIRECTION = EyeFX, an endless dive into a psychedelic eye. NOT deployed, site/ uncommitted
- **Did:** `EyeFX` (2D Droste shader, ×8 per 3.2s) before CamFilm; `Space` routes kind 3 to it; the card's `art` is 3.
- **Harness:** `.local/menu-preview/cam.html?m=EyeFX`, and `M=EyeFX P=3.2` for the render script.
- **Next:** his read. Then remove the retired chair from the Space shader.

## 2026-11-07 (close) — SKILLS round 43: camera stays whole (no detach), gentle 8s sway over the flowing shards. NOT deployed, site/ uncommitted
- **Next:** a world for VISUAL DIRECTION.

## 2026-11-07 (final) — SKILLS round 42: camera shards fill the centre, with flowing palette gradients; no platform; camera bigger. NOT deployed, site/ uncommitted
- **Next:** a world for VISUAL DIRECTION.

## 2026-11-07 (last) — SKILLS round 41: camera world has no glow, hard edges only. NOT deployed, site/ uncommitted
- **Next:** a world for VISUAL DIRECTION.

## 2026-11-07 (later still) — SKILLS round 40: PHOTOGRAPHY card in the site's world. NOT deployed, site/ uncommitted
- **Did:** CamFilm's background is `siteWorld` (palette shards, black wedges, ink dots, glowing floor). The slab is a black plate with neon edges; the parts are palette plastic.
- **Rule:** every card gets its own world. Space is VIDEO EDITING's alone.
- **Next:** a world for VISUAL DIRECTION (the chair still uses the space scene).

## 2026-11-07 (late) — SKILLS round 39: camera detach glides (0.6s in-out each way), no hits. NOT deployed, site/ uncommitted
- **Next:** his read in a real tab.

## 2026-11-07 (night) — SKILLS round 38: three-card deck wired. NOT deployed, site/ uncommitted
- **Did:** CARDS has VIDEO EDITING (computer), VISUAL DIRECTION (chair) and PHOTOGRAPHY (camera film). Each card's `art` switches `Space.kind` in `fill()`. The card title is fitted to the card.
- **Next:** his read on the copy, and a real-tab pass of the deal between cards (the camera film starts mid-loop on a deal, since its clock is page time).
- **Watch out:** the card copy is my draft, not his words.

## 2026-11-07 (evening) — SKILLS round 37: camera film = the detach only, in the card's world. NOT deployed, site/ uncommitted
- **Did:** CamFilm is now a 4.2s loop (sit → burst → hang → snap → hold) on the card's sky and rainbow slab, with white impact frames and speed lines. Palette insides.
- **Next:** his read; then wire the three cards into the deck.
- **Render a film:** the scratch `render-cam.mjs` drives `.local/menu-preview/cam.html?film=1` in headless Chromium (Comet is the installed one) and cuts an mp4.

## 2026-11-07 (later) — SKILLS round 36: CamFilm, a realistic camera + product-film loop. NOT deployed, site/ uncommitted
- **Did:** the camera has its own renderer (`CamFilm`, used when `Space.kind===1`): measured model, real materials and lighting, 8.9s orbit → macro → burst → hang → snap → hold → whip loop. No name on the body. The old toy camera is removed from the shared shader.
- **Next:** his read; then wire the three cards into the deck (`kind` per card).
- **Watch out:** CamFilm needs display gamma (it's at the end of its FS). The burst spreads the lens along its own axis; a vertical stack fuses the rings. Reduced motion draws one frame (7.4s, the front-on hold).

## 2026-11-07 (late night) — SKILLS round 35: camera rebuilt from his mirrorless reference. NOT deployed, site/ uncommitted
- **Did:** reference analysed (concept round 35); `camera()` in the card's `Space` shader is now a black mirrorless with a JATIN pixel plate. `.local/menu-preview/art.html?k=1|2` renders the card art big for checking.
- **Next:** his read; then the explode → hang → snap motion, and wiring the cards into the deck.
- **Watch out:** hash textures need a 3D cell (`floor(z)*vec2(17,31)`) or they band on curves; knurl masks need both a min and a max radius.

## 2026-11-07 (night) — SKILLS round 34: deck = VISUAL DIRECTION · PHOTOGRAPHY · VIDEO EDITING; art stills. NOT deployed, site/ uncommitted
- **Did:** camera and director's chair modelled into the card's `Space` shader (`uK`), stills in the concept folder.
- **Next:** on his yes, add the two cards to `CARDS` with their copy, `art` kind per card, and switch `Space.kind` on the deal.

## 2026-11-07 (later still) — SKILLS round 32: whole page in the card's chrome. NOT deployed, site/ uncommitted
- **Did:** SKILLS accent → steel, world tint → dark steel, DitherFX chrome ramps (`CHROME` on the bolt, `CHROME_LT` on small plates) for anything inside `#sec-skills`, acid details on the plates/banner → `var(--acc)`.
- **Then (round 33, his ask):** the menu's SKILLS is chrome too. The living wedge blends to the mirror ramp for grey accents; CLAUDE.md's accent list updated.

## 2026-11-07 (later) — SKILLS round 31: menu chain design in chrome, thicker near V. NOT deployed, site/ uncommitted
- **Did:** METAL keeps its chrome bands but drops `mono`, so its links get the menu chain's fringe + ink screen; `sprite()` now reads colour stops off any palette. The rig's near V went from 1.55 to 2.15.
- **In flight:** his read in a real tab.
- **Watch out:** `mono` = no fringe, no dots (DARK/SIDE/GREY debris). Don't set it on METAL again.

## 2026-11-07 — SKILLS round 30: the bolt breaks the chains. NOT deployed, site/ uncommitted
- **Did:** frame read of the Confidant recording (concept round 30). SKILLS triangle → green Z bolt that strikes at 1100ms and stays; chains grow thin-first, card shoved on lock and on strike; dead-still hold; break at 1260ms with a speed ramp into slow grey chunks; no flash/shockwave/speed lines; acid slash deleted; menu chain loop no longer in SKILLS. `snap.mjs` SKILLS holds re-timed. `tests/check.mjs` passes. Then (his note "BAAM!"): S-curve speed ramp, impact over in ~1s, then (his note) ONE very hard 0.5s card shake, only from the bolt; no other card shake.
- **In flight:** his read in a real tab (localhost:5179 → SKILLS).
- **Watch out:** the bolt is driven per frame from SkillFX (`boltFrame`), so `SkillFX.hold(ms)` scrubs it; the CSS clip on `#sec-skills .secBand` is only the no-JS/reduced-motion state.

## 2026-11-06 (later) — SKILLS round 29: chains that stay + banner out of the card. NOT deployed, site/ uncommitted
- **Did:** `RIG` chains in `SkillFX` (his sketch: thin far run behind the card, fat near V under it). They survive the break, jolt, then drift at 30fps while SKILLS is open. The info banner is tucked under the card's right edge and slides out from it (clip + translate, -9°). BACK z9 in SKILLS. Phone V at 55%. The card no longer follows the pointer (his note); only its art does. The menu/section background (DepthFX) no longer follows the pointer either (his note). It rests turned subtly toward the top-right (`RYAW=.3`/`RPITCH=.16`; .55/.3 was too much for him). Concept round 29, JOURNAL. `tests/check.mjs` passes.
- **ABOUT:** the JATIN sticker moved onto the bottom bar across his chest, big (his sketch). Audited 1440×900, 1440×700, 1280×800, 375×812.
- **In flight:** his read in a real tab (localhost:5179 → SKILLS).
- **Watch out:** the hold stills can catch a stale chain canvas if the frame hasn't run yet (one run showed the rig at 60ms; a reshoot was clean). Regenerate `.local/menu-preview/` after site edits.

## 2026-11-06 — SKILLS card entrance = the Confidant recording (his ask). NOT deployed, site/ uncommitted
- **Did:** `SkillFX` entrance rebuilt beat for beat from `Screen Recording 2026-10-28 at 9.00.21 PM.mov`: tumble-in on the spot → hold → six chains whip in at three depths → strain → acid slash → break into extruded chunks → banner. Concept round 28, JOURNAL chapter. `snap.mjs`: `SNAP_SITE=<folder>` shoots another copy; SKILLS_HOLDS re-timed. `.local/menu-preview/` = site with `APPLY=false` (regenerate: `sed 's/^const APPLY=true;/const APPLY=false;/' site/index.html > .local/menu-preview/index.html`), served by launch config `jatin-menu` (port 5179). `tests/check.mjs` passes.
- **In flight:** his read on the motion in a real tab (localhost:5179 → SKILLS).
- **Watch out:** chain depth scales are in px (not screen-relative) — the fat near chains are heavy on a phone; tune `CHAINS` scales if he says so. The menu-preview copy goes stale on every site edit — regenerate it.

## 2026-11-02 — BTN taken off the portfolio's identity (his ask). NOT deployed
- **Did:** his note: BTN is a separate brand, the site is his. Rewrote the meta + OG description, `#logoSub` ("Visual & Creative Director — Hyderabad"), the ABOUT bubble ("Hey, I'm Jatin" + "A visual & creative director out of Hyderabad…") and the menu ABOUT `data-desc`/`#wedgeDesc`. Kept: BTN folder (`off`), BTN sticker, CONTACT "Studio — [Beyond the Noise links]". Rule saved in CLAUDE.md "Who this is for" and memory. Stills `2026-11-02-btn-copy-full*` (APPLY flipped to false only for the shoot; it's `true` again).
- **Next:** ships with his next "deploy" (with the `og:url` fix noted below).
- **Watch out:** `snap.mjs` adds the date itself; pass the label without one. In apply mode the snaps can't reach the menu or ABOUT.

## 2026-11-02 — making-of document, part one (his ask)
- **Did:** a visual journey document of the build so far: references, every round of his notes in his words, what was cut, 39 stills, and the rules his notes add up to. Published as a private artifact: https://claude.ai/artifact/9vkQ3GiZtP5aj2mN44TBtP. Source in `docs/process/making-of/` (`src.html`; `img/` are 1400px copies of stills). His note on v1: "make the design simple, you don't need to apply website design" → v2 is a plain reading document (light/dark, Plex Sans, no glitch, no tilts, no Cyberway). Keep it plain for part two.
- **Next:** he'll ask for part two when every menu is done: add CONTACT, the remaining skill cards, the real logo, and the apply-mode → full-site return. Update the same artifact URL.
- **Watch out:** no site code touched. Quotes are tidied for spelling only.

## 2026-11-02 — every thotahub name forwards to the site (his ask)
- **Did:** thotahub.in `@` and `www` moved off Namecheap parking (was A 162.255.119.238 / CNAME parkingpage.namecheap.com) to proxied placeholders (A 192.0.2.1 / CNAME thotahub.in); MX + SPF email forwarding untouched. New .in Redirect Rule: thotahub.in, www.thotahub.in → 301 `https://justjatin.thotahub.in` + path. thotahub.com: added proxied CNAME `justjatin` and the host to the .com rule. `justjatin.thotahub.in` itself stays DNS-only (GitHub Pages) and is not in any rule.
- **Checked:** http + https on thotahub.in, www.thotahub.in, thotahub.com, www.thotahub.com → 301 to the site; justjatin.thotahub.in 200. justjatin.thotahub.com was briefly NXDOMAIN (negative cache from a lookup before the record existed, 1800s SOA min); Cloudflare's nameservers served it after ~14 min and it 301s correctly (http + https, deep path kept).
- **Watch out:** a redirect only moves visitors, it doesn't add any — it catches people who type the wrong ending.

## 2026-11-02 — thotahub.com forwards to justjatin.thotahub.in (his ask)
- **Did:** thotahub.com zone: A `@` → 192.0.2.1 and CNAME `www` → thotahub.com, both proxied (placeholders). Redirect Rule (zone ruleset phase `http_request_dynamic_redirect`; `cf` has no command for it, so set via the API with cf's own OAuth token): host thotahub.com / www.thotahub.com → 301 `https://justjatin.thotahub.in` + path, query kept. Checked http/https/www and a deep path: all 301 to the right place, final 200.
- **Watch out:** the placeholder records must stay proxied (orange) — grey sends visitors to a dead IP. thotahub.in's root still shows the Namecheap parking page (untouched by his choice).

## 2026-11-01 — domain: justjatin.thotahub.in (his call). No code deployed
- **Did:** Cloudflare (his brother's account, `cf` CLI signed in): added CNAME `justjatin.thotahub.in` → `thotajatin101-glitch.github.io`, DNS only. GitHub Pages custom domain set to `justjatin.thotahub.in`. Old github.io link 301s there (checked). thotahub.in's own records (Namecheap parking + email forwarding MX/SPF) and thotahub.com (empty) left untouched, free for later.
- **HTTPS:** certificate issued within ~2 min; Enforce HTTPS on. Checked: `/`, cache-busted `/`, `/jatin-cutout.png` all 200 over https.
- **Next:** `og:url` in index.html still says the github.io address — change to `https://justjatin.thotahub.in/` and ship with the next "deploy". Optional: verify thotahub.in under GitHub account Settings → Pages (TXT record) against domain takeover.
- **Watch out:** never set the `justjatin` record to proxied (orange) — breaks GitHub's HTTPS. Removing the Pages custom domain breaks every old github.io link already sent to clients. Undo: `gh api -X PUT repos/thotajatin101-glitch/jatin-site/pages -F cname=` and delete the record.




## 2026-10-31 (night) — DEPLOYED a3cc3b5 (his word: "deploy")
- **Live:** Pages run 41129161818, success. Checked live: every route served, release strings present in index.html, `tests/check.mjs <live>` pass, `NET=4g tests/load.mjs <live>` pass. Not checked: a real Chrome tab by eye.
- **Going live:** 8 commits since ff559b4: FLUX straight onto photos + PHOTOS/EDITS tabs, OS menu plates, his 8 edits (~233MB video), EXIT removed, both first-user QA rounds.
- **Rollback (recorded before the push):** previous live is ff559b4 (docs 8054cd6). `git revert --no-edit ff559b4..025698f && git push`, or re-run the ff559b4 Pages deploy in Actions.
- Pre-flight on this exact tree: `tests/check.mjs` pass, `tests/browsers` 14/14, `NET=4g tests/load.mjs` pass.

## 2026-10-31 (night) — first-user QA: 5 personas, 2 fix rounds. NOT deployed
- Did: 5 simulated first-time users (Playwright, real Chromium/WebKit) from intro to a full-size photo, findings ranked by how many hit them, fixed, all 5 re-run. Commits 5228ecc + fa6bc7d. Back button climbs the OS (one sentinel history entry while it's up: `arm`/`disarm` in MonitorFX), early computer clicks queued (`queue`, Esc cancels), `#boot` LOADING line, full photo `fetchPriority=high` then neighbours, `UPDATED` from `document.lastModified`, meta/OG, search NO MATCH + Enter, touch padding on the nav row, grid `inert` under the viewer, same-spot click guard on tile/CLOSE, help text names the plate (`B`). check, 14/14 browsers, NET=4g load all pass.
- Open (his call / content): contact + about unreachable in apply mode and CONTACT still `[your@email.com]`; no credits on the work; no og:image; slow 3G is still ~14s to the prompt (one 380K file) and opening FLUX queues all 40 thumbs (Chrome's lazy threshold is huge on slow nets); PROJECTS canvas not focusable/readable by screen readers; `?frame=999` not clamped.
- Watch out: LAST UPDATED needs the host's Last-Modified header (GitHub Pages sends it; the local servers don't, so locally it shows today). Another session was editing JATIN OS in parallel — check `git status` before touching index.html.

## 2026-10-31 (late) — EXIT removed, BACK leaves the computer. NOT deployed
- Did: header [X] EXIT gone (colour squares stay); BACK is live on the folder stage and calls close(); hints say BACK leaves. Walk now BACKs out twice instead of clicking EXIT. 6 configs pass.
- Next: "deploy".

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
