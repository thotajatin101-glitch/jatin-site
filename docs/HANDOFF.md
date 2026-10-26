# Hand-off log

Newest on top. Each entry: date · did · in flight · next · watch out.

---

## 2026-10-26 — folder restructure

- **Did:** moved the shipped files into `site/` (the deploy folder), the
  design references into `docs/site/reference/`, `cutout.swift` into
  `docs/tools/`, and the raw recordings and screenshots into `.local/reference/`
  (gitignored, now untracked). Added `tests/check.mjs` (syntax + route check,
  passes) and `docs/site/README.md`. Preview server now serves `site/`.
- **In flight:** path updates in `CLAUDE.md`, `README.md` and
  `.claude/serve.js` are made but **not committed** — those files carry older
  uncommitted work. Same for the content edits in `site/index.html` and
  `site/jatin-cutout.png`: only the renames are committed.
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
