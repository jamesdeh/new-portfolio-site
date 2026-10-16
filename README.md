# James de Hair · portfolio and Log

Static portfolio and blog in the Signal Noir design system. Astro 7, vanilla CSS, MDX content, Cloudflare static hosting.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:4321. Drafts and pending case studies show in dev.

To test the real build with Cloudflare's own static server, so `_headers`, the 404 page and redirects behave like production:

```bash
npm run build:drafts
npm run preview
```

Open http://localhost:8787. Use `npm run build` instead to see exactly what would go live, with drafts hidden.

Preview the other internship phases with `npm run dev:during` (week 3) or `npm run dev:after`.

## Where things live

| Path | What |
|---|---|
| `src/content/log/*.mdx` | Log posts. `draft: true` keeps a post off the live site |
| `src/content/work/*.mdx` | Case studies. `status: pending` shows a dashed card with no page |
| `src/config/site.ts` | Email, domain, socials, PGP fingerprint, internship dates, hidden flag. Placeholders are marked |
| `public/styles/` | `signal-noir.css` (design system) and `motion.css` |
| `public/scripts/` | Small classic scripts, minified at build |
| `public/_headers` | Security headers. The colophon table reads this file |
| `src/integrations/audit.mjs` | Build check: fails if the footer's security readout would be untrue, writes each page's JS size into it |
| `handoff/` | The design handoff: spec, motion notes, copy, page previews |

## Build rules

The build fails if any page has an inline script or style, loads anything third-party, ships over 5 kB of JS, or if the CSP or HSTS in `_headers` stop being strict. See `CLAUDE.md` for the full rules.
