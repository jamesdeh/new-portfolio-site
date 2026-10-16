# James de Hair · portfolio and Log

Static portfolio and blog that replaces jamesdeh.github.io. The design system is called **Signal Noir**. The blog is called **the Log** and will carry a 12-week Atlassian internship series.

## Start here

1. `handoff/README.md` explains what's in the bundle and the build order
2. `handoff/HANDOFF.md` is the build spec (stack, structure, tokens, components, states, security)
3. `handoff/MOTION.md` lists every animation with timings and reduced-motion versions; reference code is in `handoff/scripts/`
4. `handoff/CONTENT.md` has all page copy, confirmed facts and the placeholders to keep
5. Open `handoff/pages/*.html` in a browser to see each page as designed. Full-page screenshots at 1440 and 390 are in `handoff/screenshots/`
6. `handoff/motion-demo.html` shows the motion working in a browser

## Writeups source material

CTF writeups, NZCSC 2026 notes and related files live outside the repo in `C:\Users\yolob\Downloads\nzcsc2026` (`/mnt/c/Users/yolob/Downloads/nzcsc2026` from WSL). Read it when writing the CTF writeups page (`work/ctf-writeups`) and any Writeups posts in the Log. If you can't reach it, ask James to open it or copy it in.

- Turn James's notes into posts in his voice; don't invent steps, results or rankings that aren't in the files
- Check the competition's rules before publishing solutions, and only write up Hack The Box machines that are retired
- Redact anything sensitive: credentials, tokens, private IPs, other teams' names and anything marked private
- Keep new posts `draft: true` until James approves them

`portfolio-brief.md` is the original brief and decision log. The design canvas is the source of truth for anything visual; `handoff/design-source/` holds its files.

## Stack (fixed, do not swap)

- Astro 7 (James chose 7 over the handoff's Astro 6 on 2026-10-16), `output: 'static'`, no UI framework
- Vanilla CSS with custom properties and container queries; port `handoff/styles/signal-noir.css`
- MDX content collections (Content Layer API, `glob()` loader, zod schemas)
- Sveltia CMS at `/admin`, GitHub backend, OAuth through a Cloudflare Worker, Cloudflare Access in front of `/admin`
- Cloudflare static hosting on a custom domain, security headers in `public/_headers`

## Rules

- Match the design. Don't restyle, round values or add components the boards don't have
- JS total under 5 kB gzipped. Zero third-party requests outside `/admin`
- Strict CSP: no inline `<script>` and no `style=""` attributes in shipped HTML. Set runtime values with `element.style.setProperty`
- WCAG 2.2 AA. Visible 2px accent focus ring. Every motion has a `prefers-reduced-motion` version that is static or instant
- Accent is Signal red: `data-accent="red"` on `<html>` (#FF3B2F, paper #B8261C)
- Copy is New Zealand English: short, plain, first person. No buzzwords. Never invent facts; keep `[PLACEHOLDER]` markers until James fills them
- Code comments are lowercase, have no trailing full stop and stay short and simple
- No secrets in the repo. Auth worker settings live in Cloudflare environment variables

## Done means

See the checklist at the end of `handoff/HANDOFF.md`.
