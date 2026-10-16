# Signal Noir · build spec

Portfolio and blog ("the Log") for James de Hair, a third-year cybersecurity engineering student at VUW starting a 12-week Security Engineering internship at Atlassian in Sydney in November 2026. Replaces jamesdeh.github.io.

Goal: a security hiring manager trusts it within 10 seconds. Precise, fast, quiet, confident, with a few moments of play. Crafted rather than expensive.

Design source of truth: the Design canvas **James de Hair · Signal Noir**. Its files are in `design-source/`, previews in `pages/`, screenshots in `screenshots/`.

---

## 1. Stack (fixed)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Astro 6, `output: 'static'` | No UI framework integrations |
| Styles | Vanilla CSS | Custom properties, container queries. `styles/signal-noir.css` + `styles/motion.css` |
| Content | MDX content collections | `@astrojs/mdx`, Content Layer API in `src/content.config.ts`, `glob()` loader, zod schemas |
| CMS | Sveltia CMS at `/admin` | GitHub backend, OAuth via a Cloudflare Worker, Cloudflare Access in front. Self-host the bundle |
| Hosting | Cloudflare static assets (or Pages) | Custom domain. Headers in `public/_headers` |
| Scripts | Classic scripts in `public/scripts/` | Loaded with `defer` (`head.js` without). No bundler needed. CSP stays `'self'` |
| Extras | `@astrojs/rss`, `@astrojs/sitemap` | Shiki for code with a monochrome theme |

Check the Astro 6 upgrade notes before scaffolding (Node version, Vite version, removed legacy collection APIs).

---

## 2. Project structure

```
src/
  content.config.ts
  content/
    work/*.mdx            seeds in handoff/content/work
    log/*.mdx             seeds in handoff/content/log
  styles/
    signal-noir.css
    motion.css
  config/site.ts          internship dates, accent, socials, pgp fingerprint
  layouts/
    Base.astro            html attrs, head.js, top bar, footer, skip link, view transitions
    Post.astro            classification banner, toc rail, reading bar, paper toggle, series line
    CaseStudy.astro       crumb, meta row, cover, toc rail, threat strip, prev/next
  components/
    TopBar.astro  StatusPill.astro  MenuSheet.astro  SectionIndex.astro  SectionHeader.astro
    CaseCard.astro  PostCard.astro  PostRow.astro  SeriesFeature.astro  WeekCell.astro
    ClassBanner.astro  PixelProgress.astro  Callout.astro  CodeFigure.astro
    ThreatStrip.astro  Readout.astro  Button.astro  Tag.astro  Field.astro
    CommandPalette.astro  PaperToggle.astro  Footer.astro  Icon.astro
  pages/
    index.astro
    work/[slug].astro
    log/index.astro
    log/[slug].astro
    log/series/atlassian.astro
    colophon.astro
    404.astro
    rss.xml.ts
    log/series/atlassian/rss.xml.ts
    search.json.ts        command palette index
public/
  admin/index.html  admin/config.yml  admin/sveltia-cms.js
  fonts/  img/  img/masks/  scripts/
  _headers  robots.txt  pgp.asc  .well-known/security.txt
```

---

## 3. Porting the canvas CSS

The canvas scopes everything under `.sn` so several themes can sit on one board. In the build:

1. Keep one `<div class="sn">` wrapper inside `<body>`. It is the container for the `@container page` rules and carries the grain overlay. Put `data-accent="red"` and paper mode on `<html>`: the stylesheet already supports `html[data-mode="paper"] .sn`.
2. Breakpoints: the rail hides at ≤ 1100px, one column at ≤ 760px. Max width 1440, 48px margin, 24px gutter, 12 columns. Mobile margin 16px.
3. **No `style=""` attributes in shipped markup.** The canvas uses inline styles so the editor can tweak them. Turn each into a class. Runtime values go through `style.setProperty` (allowed by CSP).
4. Delete the demo state classes (`.is-hover`, `.is-focus`, `.is-active`) and the `.spec*` helpers. They only draw states on the system boards.
5. `sc-for`, `sc-if` and `{{ }}` in `design-source/` are canvas template syntax. The previews in `pages/` show them resolved.
6. Pixel icons are inline SVG paths (8×8 UI set at 16px, 16×16 kit set at 64px). Copy the `d` attributes from `design-source/Main.dc.html` (07 / Pixel icons) and `Home.dc.html` (Lab). `fill="currentColor"`, `shape-rendering="crispEdges"`, `aria-hidden="true"` unless they carry meaning.
7. The pass tick in the readout is the pixel `check` icon with `role="img" aria-label="pass"`.

---

## 4. Tokens

| Token | Noir | Paper |
|---|---|---|
| `--bg` | #0A0A0A | #F3F1EC |
| `--surface` | #111111 | #EAE7E0 |
| `--surface-2` | #171717 | #E2DED5 |
| `--line` | #262626 | #D4D0C7 |
| `--line-2` | #3A3A3A | #B9B4A9 |
| `--control` (input edges, 3:1) | #636363 | #8A857B |
| `--muted` | #8A8A8A (5.7:1) | #5E5B55 (6.0:1) |
| `--text` | #EDEDED (16.9:1) | #111111 (16.7:1) |
| `--accent` | Signal red #FF3B2F (5.58:1) | #B8261C (5.58:1) |
| `--grain` | 0.05 | 0.035 |

The other three accents stay in the stylesheet (`data-accent="green" | "amber" | "paua"`). Accent is for the status dot, active index marker, links, focus rings, selection, pixel highlights, FLAG callouts and filled progress cells. Under 5% of any screen.

Type: Geist 800 at −0.04em for display, Geist 400 18/1.6 body (17 on mobile), Geist Mono 500 caps at +0.08em for labels, Geist Pixel Square for one word per major heading plus the monogram, 404 and PENDING. The hand note ("that's me") uses Nanum Pen Script in the canvas; prefer a hand-drawn SVG in the build so there's no third-party font.

Space: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144. Sections 144 apart (96 on mobile). Radius 0, 2px max. Borders 1px. No shadows, gradients, blur or glass.

---

## 5. Page notes

**Home (`/`).** Hero headline is the name: "James" in grotesk over "DE HAIR." in pixel type with an accent full stop. The h1 has `aria-label="James de Hair"`. Alternatives exist in the canvas (Kia ora, I'm / JAMES., and six slogans) but the name is the decision. Sections 00 INTRO to 06 CONTACT with the sticky index rail. Copy in `CONTENT.md`.

**Phases.** The site has three states driven by `internship.start` and `internship.end` in `src/config/site.ts`:

| Phase | Status pill | 01 NOW | Series |
|---|---|---|---|
| before (now) | `WLG → SYD · NOV`, pulsing dot | Pre-departure lines, empty bar "Starts Nov" | `00/12`, every week PENDING, W01 "First up" |
| during | `SYD · W03/12`, pulsing dot | Internship lines, bar fills by week | Published weeks link, next week dashed, rest PENDING |
| after | `WLG · 12/12 done`, grey dot | Post-internship lines | All 12 weeks |

Render the phase at build. `scripts/status.js` corrects a stale page client-side. Add a daily scheduled rebuild (GitHub Actions cron calling a Cloudflare deploy hook) so the no-JS value stays right.

**Log index (`/log`).** Tag filters are buttons with `aria-pressed`; a tag with 0 posts is disabled. The search field filters titles client-side. The result count is an `aria-live="polite"` line. Before the internship the Internship filter shows 0 and is disabled.

**Post (`/log/[slug]`).** 68ch column, classification banner top and bottom, toc rail, sticky 12-cell reading bar under the top bar, paper toggle, footnotes both ways, prev/next. Series posts add "Views are my own and don't represent Atlassian." automatically.

**Case study (`/work/[slug]`).** Crumb, big title with one pixel word, outcome line, meta row (Year, Role, Stack, Status), 2:1 cover, then Problem, Threat model (STRIDE strip, 3×2 in the column), Approach, Dead ends, Result, What I'd change.

**Series (`/log/series/atlassian`).** W01 to W12 grid (4 columns, 2 on mobile). Each cell is a post link or PENDING in pixel type.

**404.** "ACCESS DENIED / 404" in pixel type, a terminal block that hints at a harmless flag in `robots.txt`.

**Colophon.** Stack list, security headers table with targets, budget readout, changelog.

---

## 5b. Writeups source material

James's CTF material is in `C:\Users\yolob\Downloads\nzcsc2026` (`/mnt/c/Users/yolob/Downloads/nzcsc2026` from WSL). Use it for:

- `/work/ctf-writeups`: an index of writeups, led by the NZCSC 2026 result (top 10 among university students, top 30 overall)
- Log posts tagged Writeups, starting with the draft `2026-09-29-nzcsc-three-challenges.mdx`

Rules: keep James's voice and facts, leave the dead ends in, check the competition's publishing rules, write up only retired Hack The Box machines, redact credentials, tokens, private IPs and other teams' names, and keep everything `draft: true` until James approves it.

---

## 6. Components and states

Every interactive component has default, hover, focus-visible, active and disabled (see `pages/system-*.html`). Focus is always a 2px accent outline (offset 2px, 3px on buttons, inset on rows). Targets at least 44px on touch, 24px minimum anywhere.

| Component | Hover | Focus-visible | Active | Disabled | Notes |
|---|---|---|---|---|---|
| Nav link | text colour | ring | `aria-current="page"` + 6px accent square | muted, not focusable | Top bar sticky, solid `--bg`, 64 tall (56 mobile). Mobile MENU button opens `MenuSheet` |
| Monogram | border to text | ring | `--surface-2` fill | muted | Pixel "JDH" in a 44px square, name label on desktop |
| Status pill | border `--line-2` | ring | n/a | grey dot (`status--idle`) after the internship | Links to `#now`. See phases |
| Section index | label to text | inset ring | number accent, label text, marker | muted, `aria-disabled` | One `.idx__marker` moved by `--i` |
| Section header | n/a | n/a | n/a | n/a | `02 / WORK` over a hairline, H2 with one pixel word |
| Case card | flat, lift 4px, accent border, arrow nudges | outline offset 4px | scale 0.995 | dashed, dimmed cover, no link | Stretched title link. Cover `alt=""` |
| Post card | `--surface`, title accent | ring | `--surface-2` | dashed | |
| Post row | `--surface`, arrow fades in | inset ring | `--surface-2` | muted title | Series rows prefix `W03/12` in accent |
| Classification banner | n/a | n/a | n/a | n/a | Repeats at the end as END OF DOCUMENT |
| Pixel progress | n/a | n/a | current cell blinks | empty cells `--line` | `role="progressbar"` with value. Sizes 16, 10, 6, reading 4 |
| Callouts | n/a | n/a | n/a | n/a | NOTE solid, WARN dashed, FLAG accent label. Icon + label always |
| Code figure | copy `--surface-2` | inset ring | "Copied" in accent for 2s | button hidden without JS | Filename tab, language, line numbers, one highlighted line |
| Threat strip | n/a | n/a | n/a | n/a | Mitigated (accent square) or accepted (hollow square) |
| Readout | n/a | n/a | n/a | n/a | Generated at build (section 9) |
| Button primary | accent fill, `--on-accent` text | ring offset 3 | down 1px | `--line` border, muted | One per view |
| Button secondary | border text, `--surface` | ring offset 3 | `--surface-2`, down 1px | `--line` border, muted | |
| Link | dashed underline turns solid | ring | text colour | muted, no underline | |
| Tag filter | border `--line-2` | ring | `aria-pressed="true"` + accent square | dashed, count 0 | |
| Input | edge muted | ring | n/a | `--surface` fill | 48 tall, 16px text, `>` prompt. Error: dashed accent edge, warn icon, "Err:" text |
| Paper toggle | border `--line-2` | ring | `aria-pressed` | n/a | `scripts/paper-toggle.js`, stored in localStorage |
| Toast | n/a | dismiss ring | n/a | n/a | `scripts/toast.js`, bottom left, `role="status"`, 4s |
| Command palette | row `--surface-2` | trapped in dialog | `aria-selected` row + accent caret | no-JS trigger links to /log | `scripts/command-palette.js`, native `<dialog>` |
| Footer | link to accent | ring | n/a | n/a | Readout, PGP, RSS, "Ngā mihi, James", © 2026 |

---

## 7. Content schemas

```ts
// src/content.config.ts (sketch)
const log = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/log' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.enum(['Internship', 'Writeups', 'Builds', 'Notes'])).min(1),
    series: z.object({ id: z.literal('atlassian'), week: z.number().int().min(1).max(12) }).optional(),
    classification: z.enum(['public']).default('public'),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    pixelWord: z.string().optional(),
    order: z.number(),
    year: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    outcome: z.string().max(160),
    tags: z.array(z.string()),
    cover: image(),
    status: z.enum(['published', 'pending']).default('published'),
    meta: z.object({ year: z.string(), role: z.string(), stack: z.string(), status: z.string() }).optional(),
    threats: z.array(z.object({
      id: z.enum(['S', 'T', 'R', 'I', 'D', 'E']),
      note: z.string().max(120),
      status: z.enum(['mitigated', 'accepted']),
    })).length(6).optional(),
  }),
});
```

Reading time is computed from the body (about 230 wpm). Drafts never render in production. `status: 'pending'` work renders the disabled card.

MDX components: `<Callout type="note | warn | flag">`, code fences with `title="file.py"` and `{5}` line highlights rendered by a small Shiki transformer into the `.code` markup, GFM footnotes styled as `.footnotes`.

---

## 8. Accessibility

- WCAG 2.2 AA. Every text pair in section 4 is at least 4.5:1. Input edges and focus rings at least 3:1
- Skip link first. One `<h1>` per page. Sections use `aria-labelledby` on their H2
- Hero h1 keeps `aria-label="James de Hair"` so the decrypt never reaches screen readers as noise
- Filters announce counts via `aria-live="polite"`. The palette uses combobox + listbox with `aria-activedescendant`
- Callouts, errors and states never rely on colour alone
- Tables have `scope` on headers and scroll inside a box on mobile
- Test keyboard only, VoiceOver with Safari, NVDA with Firefox, 200% zoom, 320px width

---

## 9. Security and the honest readout

`public/_headers`:

```
/*
  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; manifest-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  X-Frame-Options: DENY

/admin/*
  ! Content-Security-Policy
  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://avatars.githubusercontent.com; connect-src 'self' https://api.github.com https://[AUTH-WORKER-DOMAIN]; font-src 'self'; frame-ancestors 'none'; base-uri 'none'
  X-Robots-Tag: noindex
```

- Keep scripts external (`build.inlineStylesheets: 'never'`, no inline scripts). If Astro 6 ships stable CSP hashing, it can replace the manual rules
- Sveltia: self-host `sveltia-cms.js`, GitHub OAuth through the `sveltia-cms-auth` Worker, Cloudflare Access on `/admin/*`. Check the `/admin` policy against Sveltia's docs at launch
- `public/.well-known/security.txt` with Contact, Expires, Encryption (`/pgp.asc`), Preferred-Languages (`en`), Canonical
- Hidden flag: `robots.txt` has `Disallow: /[FLAG-PATH]/`; that page prints `JDH{[FLAG]}` and a thank you. Keep it harmless

**The readout is generated, never typed.** An `astro:build:done` hook:

1. Parses `public/_headers` and checks CSP has no `unsafe-*` outside `/admin`, HSTS has `preload` and no third-party hosts appear
2. Scans `dist/**/*.html` for scripts or styles from other origins and cookie use (expect 0)
3. Sums gzipped `dist/**/*.js` and replaces a `__JS_SIZE__` token in every page (`JS 3.1 kB` style)
4. Exits non-zero if anything fails, so a false claim can't ship

---

## 10. Performance budget

| Asset | Budget |
|---|---|
| HTML per page | < 30 kB gzipped |
| CSS total | < 20 kB gzipped (two files) |
| JS total | < 5 kB gzipped |
| Fonts | 3 files, subset to Latin plus macrons, preload Geist and Geist Pixel |
| Images | 1-bit PNGs, < 15 kB each, `width` and `height` set, lazy below the fold |
| LCP | < 1.2s on fast 4G |
| CLS | 0 (decrypt locks its width) |
| Third-party requests | 0 outside `/admin` |

---

## 11. Sveltia CMS sketch

```yaml
# public/admin/config.yml
backend:
  name: github
  repo: jamesdeh/new-portfolio-site
  branch: main
  base_url: https://[AUTH-WORKER-DOMAIN]
media_folder: public/img/uploads
public_folder: /img/uploads
collections:
  - name: log
    label: Log
    folder: src/content/log
    extension: mdx
    format: frontmatter
    create: true
    slug: '{{year}}-{{month}}-{{day}}-{{slug}}'
    fields:
      - { name: title, label: Title, widget: string }
      - { name: summary, label: Summary, widget: text }
      - { name: date, label: Date, widget: datetime }
      - { name: tags, label: Tags, widget: select, multiple: true, options: [Internship, Writeups, Builds, Notes] }
      - { name: series, label: Series, widget: object, required: false, fields: [ { name: id, widget: hidden, default: atlassian }, { name: week, widget: number, value_type: int, min: 1, max: 12 } ] }
      - { name: draft, label: Draft, widget: boolean, default: true }
      - { name: body, label: Body, widget: markdown }
  - name: work
    label: Work
    folder: src/content/work
    extension: mdx
    format: frontmatter
    create: true
    fields:
      - { name: title, widget: string }
      - { name: order, widget: number }
      - { name: year, widget: string }
      - { name: role, widget: string }
      - { name: stack, widget: list }
      - { name: outcome, widget: string }
      - { name: tags, widget: list }
      - { name: cover, widget: image }
      - { name: status, widget: select, options: [published, pending] }
      - { name: threats, widget: list, fields: [ { name: id, widget: select, options: [S, T, R, I, D, E] }, { name: note, widget: string }, { name: status, widget: select, options: [mitigated, accepted] } ] }
      - { name: body, widget: markdown }
```

---

## 12. Done means

- Every page matches its 1440 and 390 screenshot. No horizontal scroll at 320px
- Keyboard reaches and operates everything, with the focus ring always visible
- axe and Lighthouse accessibility at 100. No contrast failures in Noir or Paper
- HTTP Observatory and securityheaders.com at A+
- Readout values come from the build hook and CI fails on any false claim
- Every motion in `MOTION.md` works, and reduced motion makes each one static or instant
- JS under 5 kB gzipped, zero third-party requests outside `/admin`
- All `[PLACEHOLDER]` markers listed in `CONTENT.md` are either filled by James or still visibly marked
