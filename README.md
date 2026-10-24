# jatin-site

Personal portfolio for Jatin — Beyond the Noise Studio.
Single self-contained page. Open `index.html` in a browser. That's it.

## Picking this up in Claude Code

```bash
cd path/to/jatin-site
claude
```

`CLAUDE.md` loads automatically at the start of every session — it carries the
full brief: aesthetic rules, the intro timing table, layout constraints, the
bug already fixed, and what's still open. You don't need to re-explain the
project.

Good first message to give it:

> Read CLAUDE.md and the images in reference/, then open index.html and tell me
> what you'd tighten first.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site. HTML + CSS + JS in one file, no dependencies. |
| `CyberwayRiders-lg97d.ttf` | The display font. Already embedded as base64 inside `index.html` — this is the master copy, keep it. |
| `jatin-cutout.png` | Background-removed B&W portrait used in the ABOUT collage. |
| `tools/cutout.swift` | Regenerates that cutout from any photo. Build and run: `swiftc -O tools/cutout.swift -o /tmp/cutout && /tmp/cutout photo.jpg out.png` — then desaturate with ffmpeg (see below). |
| `CLAUDE.md` | Project brief. Auto-loaded by Claude Code each session. |
| `reference/` | The visual references the design is built from. |

## Reference images

| File | What it shows |
|---|---|
| `01-logo-neon-outlines.jpg` | Opening beat of Jatin's logo animation — neon shard outlines on black |
| `02-logo-burst.jpg` | The burst — halftone shatter, wordmark in the center hole |
| `03-logo-glitch.jpg` | Mid-animation glitch state on the wordmark |
| `04-persona-menu.jpg` | Persona-style menu — tilted type, diagonal color bands, tag labels |
| `05-persona-submenu.jpg` | Submenu treatment — flowing color bands, list layout |
| `06-logo-still.jpeg` | Clean still of the JATIN wordmark |
| `07-target-composition.png` | Target composition — name held in the black center of the shatter |

Source screen recordings aren't included here (large files). Add them to
`reference/` if you want them alongside.

## Editing notes

- The menu is a Persona-5-Royal system menu: a vertical plate stack on the
  left plus a giant accent wedge that re-slams the selected word. Each item's
  colour is the `--acc` custom property on `#m-about`, `#m-projects`,
  `#m-skills`, `#m-experience`, `#m-contact`.
- Plate shape is the `clip-path` on `.mItem`; the wedge triangle is the
  polygon inside `#wedgeTri`.
- The halftone is a fine ink screen — `--dot` (size), `--dot-angle`, and
  `--dotgrid` (dot weight) at the top of the stylesheet drive it everywhere.
- To swap the ABOUT portrait: run `tools/cutout.swift` on a new photo, then
  `ffmpeg -i cut.png -vf "crop=…,format=rgba,hue=s=0,eq=contrast=1.42,scale=880:-1" jatin-cutout.png`.
  The sticker outline is CSS (`#cutout`'s stacked drop-shadows), so it adapts
  to whatever silhouette you give it — don't bake an outline into the PNG.
- The wedge heading sizes itself to fill the space left of the screen edge
  (`fitWedge()` in the script). Tune `WEDGE_GAP` for its clearance from the
  menu and `WEDGE_MAX` for the ceiling on short words — don't hardcode a
  font size.
- Intro timing lives in the `TL` timeline array in the script block — one
  entry per beat, hard cuts, matched frame-by-frame to the reference video.
  The last entry hands off to `toMenu()`.
- The background shatter re-rolls per-frame during the intro only, then holds
  still on slow drift — so refresh a few times before judging a composition
  change.
