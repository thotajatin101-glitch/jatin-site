# Release — launch guards

The site is a static page: `site/index.html` + `site/jatin-cutout.png` + his
photos in `site/work/<set>/` (built by `docs/tools/photos.mjs`). The
`site/` folder is the deploy folder. Nothing else
ships. No build step, so "build" below means "the exact files that go out".

> **Status (2026-11-01): GitHub Pages at `https://justjatin.thotahub.in`.**
> DNS is Cloudflare (thotahub.in zone, record `justjatin` CNAME →
> `thotajatin101-glitch.github.io`, DNS only — never proxy it or GitHub can't
> renew HTTPS). The old `thotajatin101-glitch.github.io/jatin-site/` link
> 301s to it as long as the Pages custom domain stays set. Earlier note: Recommendation: **Cloudflare
> Pages** — every deploy gets its own version id and a one-command rollback,
> which the "record first" rule needs. GitHub Pages can't do that (rollback =
> revert a commit and wait for a rebuild).

## The rules

- **Deploy only on his explicit word.** "Looks good" is not a go; "deploy" is.
- **Deploy from a clean release branch in its own worktree** (`release`), never
  from a checkout with half-finished work. Ship only commits he has seen.
  List them (`git log --oneline origin/release..release`) before deploying.
- If anything is wrong live, **roll back first, diagnose second.**

## Before deploying

1. **Lint** — HTML/CSS/JS syntax check of `index.html`, 0 errors.
   *(Not set up yet — see "Gaps".)*
2. **Type check** — n/a: no TypeScript. Replaced by: the page loads with
   **zero console errors** and **zero failed requests**.
3. **Test suite** — `node tests/check.mjs` (syntax, routes, every photo file:
   exact-case names, no EXIF/GPS, size budgets) and `node tests/load.mjs`
   (real Chrome, empty cache, 4G + slow 4G: every grid, every photo in the
   viewer, zoom/drag, fullscreen, phone). Both also take the live URL after
   deploying: `node tests/check.mjs https://…` checks the live copies match.
   Layout changes: also `cd tests/browsers && node run.mjs` (Chromium, WebKit,
   Firefox; desktops, phones, tablets).
4. **Route tests** — every key route loads with its key content (list below).
5. **Record first:** write the current live version id and its exact rollback
   command into the hand-off entry *before* running the deploy.

## Key routes

It's one page; the routes are its screens. Each must load directly (cold, from
the URL) and show its key content:

| Route | Must show |
|---|---|
| `/` | intro canvas runs, then the menu with 4 plates (ABOUT, PROJECTS, SKILLS, CONTACT) and the wedge |
| `/#about` | reload → intro → menu; Back/Forward reach the ABOUT poster (portrait, banner "JATIN") |
| `/#projects` | the 3D computer renders (WebGL canvas non-empty), CLICK ME!! → JATIN OS opens |
| `/#skills` | SKILLS heading + cards |
| `/#contact` | CONTACT heading + links |
| `/?frame=20` | intro freezes on the snap frame; a click resumes and strips `?frame` |
| `/jatin-cutout.png` | 200, `image/png` |
| reduced motion | intro skipped, menu shown settled |

## Right after deploying

1. Hit every key route on the live domain with a cache-busting query
   (`?v=<timestamp>`) and check each returns 200.
2. Confirm the new content is actually served: `curl` the live `index.html`
   and grep for a string that only exists in this release.
3. Open the changed screen live (real Chrome tab, not the Claude preview pane)
   and confirm it draws and animates.

## Then

- Merge `release` back into `main`. Push `release`.
- Hand-off entry: version id, what went live, what was checked, rollback command.

## Commands

```text
deploy:    git push origin main   (.github/workflows/pages.yml publishes site/)
list:      gh run list --workflow pages.yml --limit 5   (live = newest success)
rollback:  git revert --no-edit <bad>..<head> && git push, or re-run the last
           good Pages run in Actions
domain:    gh api repos/thotajatin101-glitch/jatin-site/pages   (cname, https_enforced)
```

## Gaps — to set up before the first deploy

- ~~Host + domain~~ done 2026-11-01 (GitHub Pages, justjatin.thotahub.in).
- A zero-dependency check script in `tests/` (Node, no packages): syntax-checks
  the inline scripts and asserts the routes above. A real-browser version needs
  Playwright as a **dev-only** tool — it never ships, but it's still his OK.
