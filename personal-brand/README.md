# personal-brand — justjatin

His own brand work, kept apart from the website. Everything here is named
JATIN / justjatin, never BTN (BTN is the studio, a separate brand).

| Folder | What goes here |
|---|---|
| `posts/` | Finished posts: one folder per post, `YYYY-MM-DD-name/`, with the exports and the source. |
| `videos/` | Finished edits and reels: one folder per piece, `YYYY-MM-DD-name/`. Big video files stay out of git (see below). |
| `kit/brief/` | The justjatin design brief: the design language taken from the site. |
| `kit/studio/` | The dev-only renderer that draws post and reel drafts (`node personal-brand/kit/studio/render.mjs <outDir> p1 r1 …`). |
| `kit/concepts/` | The rounds that set the look: `2026-11-09-asset-kit`, `2026-11-09-content-look` (his notes, stills, drafts). |

Video masters and renders (`.mov`, `.mp4`, `.mxf`, `.braw`) in `videos/` are
gitignored: GitHub refuses files over 100MB. Stills, thumbnails and notes are kept.
