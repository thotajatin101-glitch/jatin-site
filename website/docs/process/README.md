# Process — how this site was made

Raw material for the making-of: what it looked like at each stage, what he
asked for, what got cut and why. When the site is done, the case study /
documentation for other people gets cut from this.

| Path | What |
|---|---|
| [JOURNAL.md](JOURNAL.md) | The story, chapter by chapter, oldest first. His notes in his words. |
| `stills/YYYY-MM-DD-label/` | One snapshot set per stage: stills (JPEG), `films/*.mp4`, a contact sheet, and a README listing every frame. Generated — don't hand-edit. |

## Taking a snapshot

```bash
node docs/tools/snap.mjs <label>
```

Shoots every screen of `site/` headless (any installed Chromium — Chrome,
Comet, Edge…), ~2 minutes. Options:

- `--only menu,about` — just the piece that changed (merges into an existing set).
- `--film intro,transition,projects` — frame-accurate films from the site's own
  scrub harnesses (`?frame=N`, `TransFX.peek`, `MonitorFX.hold`). Needs ffmpeg.
- `--rev <commit>` — shoot an older version straight out of git.

## The routine

- **Any session that changes the look or motion:** take a set (`--only` the
  pieces touched; a full set + films at milestones), then add a journal
  entry — date, his note in his words, what was built, what was dropped and
  why, link to the set.
- **Before building over something he rejected**, snapshot it first. Rejected
  versions are the best part of a making-of and they're gone once replaced.
- Sizes: a full set with films is ~40MB. Don't take full sets every session.

## Limits

- Headless shots are true to the frame but not to playback speed — judge
  motion in a real browser (`docs/VERIFY.md`).
- The transition film is drawn over the menu (no screen swap underneath).
- Rounds before 2026-10-24 weren't captured; the journal tells them from the
  notes in `CLAUDE.md`, without stills.
