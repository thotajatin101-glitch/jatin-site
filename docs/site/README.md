# Site workstream — source of truth

The full brief (aesthetic, motion, layout, every decision and his notes behind
it) lives in the root `CLAUDE.md`; it's loaded every session, so it stays the
single source of truth for decisions. This README is the map of the folder.

## Layout

| Path | What |
|---|---|
| `site/` | **The deploy folder.** `index.html` + `jatin-cutout.png`. Nothing else ships. |
| `docs/site/reference/` | Committed design references (logo stills, Persona menus). |
| `.local/reference/` | Raw source recordings and screenshots — gitignored, local only. |
| `docs/tools/` | Reusable scripts (`cutout.swift` — the portrait cutout). |
| `docs/concepts/YYYY-MM-DD-name/` | One folder per design/motion iteration: rounds, his notes, stills. |
| `tests/check.mjs` | Pre-release syntax + route check (`node tests/check.mjs [url]`). |
| `CyberwayRiders-lg97d.ttf` | Font master (embedded in the page as base64). |

## Not created yet
- `VOICE.md` / `PROFILE.md` — when there's real copy to write (CONTACT,
  folder contents), build them from his own writing.
