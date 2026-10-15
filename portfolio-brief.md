# Portfolio rebuild brief (Signal Noir)

Full plan: https://claude.ai/code/artifact/2f6fca4c-db5f-4b38-bf1c-60d6fbf01ba2

## Decisions (16 Oct 2026)

| Decision | Choice |
| --- | --- |
| Style | Signal Noir (closest to grilledpixels.com/ecommerce) |
| Accent | Claude Design explores Signal red #FF3B2F, Phosphor green #3DFF8B, Amber #FFB000 plus a wild card |
| Blog | MDX in the repo plus Sveltia CMS at /admin (GitHub OAuth via a Cloudflare Worker, Cloudflare Access in front) |
| Hosting | Custom domain on Cloudflare (Workers static assets or Pages) |
| Framework | Astro 6, static output, vanilla CSS tokens |
| Fonts | Geist Sans, Geist Pixel, Geist Mono |
| Deadline | Live before the Atlassian internship starts in November 2026 |

## Prompt for Claude Design

```text
You are designing a personal portfolio and blog for James de Hair, a third-year cybersecurity engineering student at Victoria University of Wellington, New Zealand. In November 2026 he starts a 12-week Security Engineering internship at Atlassian in Sydney. The site replaces jamesdeh.github.io.

GOAL
A portfolio a security hiring manager trusts within 10 seconds: precise, fast, quiet and confident, with a few moments of play. Ultra modern but not flashy. He is a student, so it should feel crafted rather than expensive. It also hosts a blog called "Log" with a 12-week Atlassian internship series.

REFERENCES (attached)
1. grilledpixels.com/ecommerce is the main reference. Take the near-black grainy canvas, the pairing of a huge grotesk word with a pixel-font word, the small mono uppercase labels, the sticky left section index with a square marker and the tilted project cards. Do not copy its layout or copy.
2. timvandamme.com: take one idea only, a dithered portrait with a single hand-drawn note in the accent colour.
3. The current site: move away from its 3D desk scene and purple gradients.

STYLE: "SIGNAL NOIR"
- Background #0A0A0A with a 4 to 6% film grain overlay. Surface #111111. Hairlines #262626. Text #EDEDED. Muted text #8A8A8A.
- One accent colour, used on under 5% of any screen: status dot, active index marker, links, focus rings, pixel highlights.
- Explore the accent with these options side by side on the hero and on a post page: Signal red #FF3B2F, Phosphor green #3DFF8B, Amber #FFB000, plus one wild card of your choice. Recommend one and explain why. Every accent must pass WCAG AA for text on #0A0A0A.
- Type: Geist Sans for display (700 to 800, tracking -0.04em) and body (400, 17 to 18px, line height 1.6). Geist Pixel (Square or Grid) for one word per major heading only. Geist Mono 500, uppercase, +0.08em tracking for labels, numbers and metadata.
- Square corners (0 to 2px radius) and 1px borders. No drop shadows, gradients, glassmorphism or stock illustration. No padlocks, hooded hackers or matrix rain.
- 12-column grid, 1440px max width, 24px gutters, 120 to 160px between sections. Mobile: 16px side gutter and no horizontal scroll.

STEP 1: DESIGN SYSTEM
Create a "Signal Noir" design system before any pages: colour tokens (dark default plus a light "paper mode" for long reads), type scale, spacing scale and grid. Include these components with default, hover, focus-visible, active and disabled states:
- Top bar: JDH monogram, nav (Work, Log, About, Contact), status pill "● SYD · W03/12" with a pulsing accent dot
- Sticky left section index: 00 INTRO, 01 NOW, 02 WORK, 03 LOG, 04 LAB, 05 ABOUT, 06 CONTACT, with a square marker on the active item
- Section header: mono number and label ("02 / WORK") over a hairline
- Case study card: 16:10 image, title, one-line outcome, mono meta row (YEAR · ROLE · STACK), tags, slight 3D tilt
- Post card and post list row (date, title, tags, reading time)
- Post header styled as a classification banner: "CLASSIFICATION: PUBLIC · 6 MIN READ · W03/12 · 2026-11-24"
- 12-cell pixel progress bar (series progress and reading progress)
- Callouts: NOTE, WARN, FLAG
- Code block with a filename tab and copy button; inline code
- Threat model strip for case studies (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege), each with a one-line note
- Terminal readout: "CSP strict ✓ · HSTS preload ✓ · trackers 0 · cookies 0 · JS {size}"
- Buttons (primary: accent outline; secondary: hairline), links with a pixel underline, tags, form inputs, toast
- Command palette (Ctrl or Cmd + K) styled as a terminal prompt
- Footer: security readout, PGP fingerprint, RSS link, "Ngā mihi, James", © 2026

STEP 2: PAGES (desktop 1440 and mobile 390 for each)
1. Home, one long scroll:
   00 INTRO: two-line headline mixing grotesk and pixel type, e.g. "SECURITY," (grotesk) over "ENGINEERED." (pixel). Mono subline: "Third-year cybersecurity engineering student at VUW. Security Engineering intern at Atlassian, Sydney, from November 2026. Breaking things so they ship safer." Buttons: "Read the Log" and "See the work". Suggest two alternative headline pairs.
   01 NOW: three short lines on this month, with location WLG → SYD.
   02 WORK: three or four tilted case study cards: PricePath (grocery price scraper and deployment: Playwright, OCI, nginx, CI/CD), CTF writeups (NZCSC top 30, Hack The Box), Red Specter (co-founded pen-testing venture for small businesses) and a hardened self-hosted OCI lab.
   03 LOG: latest three posts plus a feature row for the Atlassian 12-week series with its pixel progress bar.
   04 LAB: kit grid with small 1-bit pixel icons and captions: HackRF, USB Rubber Ducky, Wi-Fi Pineapple, FPV drone, home lab server.
   05 ABOUT: dithered 1-bit portrait (placeholder) with one hand-drawn accent note ("that's me"), a short bio and highlights: NZCSC top 30, [scholarship name], Atlassian Security Engineering intern 2026.
   06 CONTACT: large email link, PGP key link, GitHub, LinkedIn and a response-time note.
2. Case study page: hero image, meta row, then Problem, Threat model, Approach, Dead ends, Result, What I'd change. Table of contents in the left rail.
3. Log index: tag filters (All, Internship, Writeups, Builds, Notes), search field, list rows and the series feature.
4. Post page: 68-character reading column, classification header, table of contents rail, reading progress bar, code blocks, callouts, footnotes, a "Views are my own" line on series posts, previous and next links, paper-mode toggle.
5. Atlassian series page: W01 to W12 grid; each cell is a post or "PENDING" in pixel type.
6. 404: "ACCESS DENIED / 404" in pixel type with a terminal line hinting at a hidden flag.
7. Colophon: stack, security header grades table, changelog.

MOTION (annotate it in the design; it will be built in code)
- First visit only: the pixel headline word decrypts from random glyphs in under 800ms
- The section index marker slides between items on scroll
- Case study cards ease from an 8 degree tilt to flat as they enter the viewport
- Page changes: a 300 to 400ms pixel dissolve (View Transitions)
- Optional hero background: a very low-contrast dithered field that bends toward the cursor
- Every motion has a prefers-reduced-motion version that is static or instant
- No content-blocking loaders, no scroll hijacking, no custom cursor

ACCESSIBILITY AND PERFORMANCE
WCAG 2.2 AA, a visible 2px accent focus ring, a keyboard path for every interaction and semantic headings. Design for a static Astro build with near-zero JavaScript, so avoid effects that need heavy libraries.

COPY TONE
New Zealand English. Short, plain and specific, in first person. Confident but honest about being a student. No buzzwords such as "passionate", "ninja" or "rockstar".

DELIVERABLES
1. The Signal Noir design system with tokens and components
2. The accent comparison with your recommendation
3. Every page above at 1440 and 390
4. A handoff bundle for Claude Code that names the stack: Astro 6 static site, vanilla CSS with custom properties, MDX content collections, Sveltia CMS at /admin, deployed on Cloudflare. Include the motion notes and all component states.
```

## Prompts for Claude Motion (Team and Enterprise plans, beta)

Launch teaser:

```text
Make a 15-second launch teaser for my new portfolio site, exported at 16:9 and 1:1 for LinkedIn. Audience: recruiters, classmates and security people in New Zealand and Australia.

Style: "Signal Noir", matching the attached design system. #0A0A0A background with fine film grain. Geist Sans for large words, Geist Pixel for one word per scene, Geist Mono for small labels. One accent colour: [accent hex]. Square corners and hairlines. No gradients, 3D, stock footage, padlocks or hooded hackers.

Scenes:
1. 0 to 2s: black screen, a blinking accent cursor, mono text types "> whoami"
2. 2 to 5s: "JAMES DE HAIR" in large grotesk; "SECURITY ENGINEER" decrypts from random pixel glyphs beneath it
3. 5 to 8s: three case study cards slide in tilted and settle flat, with mono labels PRICEPATH, CTF WRITEUPS, RED SPECTER
4. 8 to 11s: a 12-cell pixel progress bar fills its first cell, labelled "THE LOG · 12 WEEKS IN SYDNEY"
5. 11 to 15s: pixel dissolve to [domain] centred, a pulsing accent status dot and a small mono line "now live"

Pacing: calm and precise with eased cuts and no flashes. Hold the final frame for one second so it works as a thumbnail. No audio.
```

Weekly bumper:

```text
Make a 5-second 1:1 bumper in the attached Signal Noir style. A pixel counter ticks to "W[week]/12", then the post title "[title]" types out in Geist Mono beneath it, and the 12-cell progress bar fills to cell [week]. Accent [accent hex]. Hold the last frame for one second.
```
