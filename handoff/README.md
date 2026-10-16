# Handoff bundle

Everything Claude Code needs to build the Signal Noir site. Read `HANDOFF.md` first.

## What's here

| Path | What it is |
|---|---|
| `HANDOFF.md` | Build spec: stack, routes, structure, tokens, components and states, schemas, security, budgets, done list |
| `MOTION.md` | Every animation and transition, with timings, triggers, reduced-motion versions and which script runs it |
| `CONTENT.md` | All page copy as designed, confirmed facts, and placeholders James still needs to fill |
| `styles/signal-noir.css` | The design system stylesheet, ready for `src/styles/`. Port it as described in HANDOFF.md section 3 |
| `styles/motion.css` | Motion layer: view transitions, card entry, field, menu, palette, toast, reduced motion |
| `scripts/` | Small vanilla scripts (classic, no imports) for motion and interaction. Copy to `public/scripts/` |
| `fonts/` | Geist Sans, Geist Mono and Geist Pixel (Square, plus Grid for reference). SIL OFL 1.1 in `OFL.txt` |
| `img/` | 1-bit cover art, portrait placeholder, grain tile, hero field, and `masks/` for the pixel dissolve |
| `pages/` | Every board exported as a static page. Open in a browser. `preview.css` is the canvas stylesheet with local paths |
| `screenshots/` | Full-page PNGs of each page at 1440 and 390, plus the system boards |
| `design-source/` | The design canvas files (`.dc.html`, `canvas.json`, stylesheet). Exact markup and copy per board |
| `content/` | Seed MDX for `src/content/work` and `src/content/log`, in the schemas from HANDOFF.md |
| `motion-demo.html` | One page that runs every motion from `scripts/` so you can see the intended feel |

## Pages to build

| Route | Design | Static preview | Screenshots |
|---|---|---|---|
| `/` | Home | `pages/home.html` (now), `pages/home-during.html` (mid-internship) | `home-1440`, `home-390` |
| `/work/pricepath` | Case study | `pages/work-pricepath.html` | `work-pricepath-1440`, `-390` |
| `/log` | Log index | `pages/log.html`, `pages/log-during.html` | `log-1440`, `-390` |
| `/log/[slug]` | Post | `pages/post.html` (Noir), `pages/post-paper.html` (Paper) | `post-1440`, `post-paper-390` |
| `/log/series/atlassian` | Series | `pages/series.html`, `pages/series-during.html` | `series-1440`, `-390` |
| `/404` | 404 | `pages/404.html` | `404-1440`, `-390` |
| `/colophon` | Colophon | `pages/colophon.html` | `colophon-1440`, `-390` |

System references: `pages/system-foundations.html`, `system-chrome.html`, `system-content.html`, `system-controls.html`, `accent-comparison.html`, `handoff-board.html`.

The previews are rendered from the canvas, so they use inline styles and preview-only paths. Use them for layout and copy, and build the real markup from components.

## Build order

1. Scaffold Astro 6, copy `fonts/`, `img/` and `scripts/` into `public/`, add `styles/` to `src/styles/`
2. `Base.astro`: tokens on `<html>`, skip link, top bar, footer, grain, `head.js`
3. Home sections 00 to 06 against `home-1440.png` and `home-390.png`
4. Content collections, Log index, post layout, series page
5. Case study layout with the threat model strip
6. 404 with the hidden flag, colophon
7. Motion layer (`MOTION.md`), then the command palette and `search.json`
8. RSS (main and series), sitemap, `robots.txt`, `security.txt`
9. `public/_headers`, the audit hook and the generated readout
10. Sveltia CMS at `/admin` with the auth worker and Cloudflare Access
11. Accessibility and performance pass against the done list
