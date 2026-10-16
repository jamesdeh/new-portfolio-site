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

Open http://localhost:8787. Use `npm run build` instead to see exactly what would go live, with drafts hidden. After a rebuild, stop the preview with Ctrl+C and start it again, because it indexes `dist/` when it starts.

Preview the other internship phases with `npm run dev:during` (week 3) or `npm run dev:after`.

## Editing with the CMS

Run `npm run dev`, open http://localhost:4321/admin/index.html in Chrome or Edge, choose **Work with Local Repository** and pick this folder. Edits are written straight to `src/content/`, so review and commit them like any other change. New posts start as drafts.

On the live site `/admin` will sign in through GitHub once the auth worker and Cloudflare Access are set up (see `public/admin/config.yml`).

## Automation

| Workflow | What it does | Needs |
|---|---|---|
| `build.yml` | Runs the full build on every push and PR, so the audit fails CI if the readout would be untrue | nothing |
| `observatory.yml` | Weekly Mozilla HTTP Observatory scan; the colophon shows the real grade | repo variable `SITE_HOST` |
| `rebuild.yml` | Daily rebuild so the internship week and `security.txt` expiry stay current | repo secret `DEPLOY_HOOK_URL` |

Fonts are subset from `handoff/fonts` with `python scripts/subset-fonts.py` (needs `fonttools` and `brotli`).

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
