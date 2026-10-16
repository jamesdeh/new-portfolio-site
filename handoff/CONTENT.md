# Content

Every piece of copy as designed, plus what's confirmed and what's still a placeholder. New Zealand English, plain, first person. Anything in `[BRACKETS]` is a placeholder: keep it visibly marked until James fills it.

## Confirmed facts (safe to publish)

- Third-year cybersecurity engineering student at Te Herenga Waka, Victoria University of Wellington
- Security Engineering intern at Atlassian, Sydney, 12 weeks from November 2026. Not in Sydney yet
- NZCSC 2026: top 10 among university students, top 30 overall
- Graham Kelly Engineering and Computer Science Scholarship, VUW
- Red Specter is a new idea he's working on with a friend: pen testing for small businesses. Early days, not a running business
- PricePath is an ENGR302 team project (Team 8, five people). James owned the scraper and the deployment. Playwright scraper for PAK'nSAVE, New World (both Foodstuffs, `__NEXT_DATA__`) and Woolworths NZ (DOM). Deployed on an OCI instance with nginx and a DuckDNS domain. Has a CI/CD pipeline
- GitHub: github.com/jamesdeh

## Writeups source material

NZCSC 2026 notes, solves and writeup material are in `C:\Users\yolob\Downloads\nzcsc2026` (`/mnt/c/Users/yolob/Downloads/nzcsc2026` from WSL). Use them for the CTF writeups page and Writeups posts. Don't invent anything that isn't in those files, redact sensitive values and keep drafts until James approves.

## Placeholders to fill

| Where | Placeholder |
|---|---|
| Contact, security.txt | Email address and domain: `james@[domain]` |
| Contact, footer | LinkedIn URL |
| Footer, contact, `/pgp.asc` | PGP fingerprint (40 hex) and public key |
| Lab | Home lab server spec: `[SPEC: CPU, RAM, hypervisor]` |
| About | Real portrait, dithered to 1-bit (Atkinson), 240 × 300 shown at 2× |
| PricePath | Live URL, products per nightly run, week deploys went fully automatic. Confirm Python and GitLab CI |
| Status | Internship start and end dates for `src/config/site.ts` |
| Colophon | Repo link, changelog dates for v0.2 and v1.0 |
| 404 | Flag path and flag text |
| Log | Every sample post title and body is a draft. Replace with real posts or keep as drafts |

---

## Global

- Top bar: JDH monogram + "James de Hair" · Work · Log · About · Contact · status pill · Search ⌘K
- Status pill now: `WLG → SYD · NOV` (aria-label "Status: in Wellington, moving to Sydney in November")
- Footer: "Ngā mihi, James" · "Built by hand in Te Whanganui-a-Tara, Wellington. Static pages, no trackers, no cookies." · readout `CSP strict ✓ · HSTS preload ✓ · Trackers 0 · Cookies 0 · JS {size}` · Site (Work, Log, About, Colophon) · Elsewhere (GitHub, LinkedIn, RSS) · PGP fingerprint + "Get key · /pgp.asc" · "© 2026 James de Hair" · "Views are my own" · "Back to top"

## Home

**00 Intro**
- Kicker: 00 / Intro · Cybersecurity engineering · VUW · Wellington, NZ
- Headline: James / DE HAIR. (pixel, accent full stop)
- Subline (mono): "Third-year cybersecurity engineering student at VUW. **Security Engineering intern at Atlassian, Sydney, from November 2026.** Breaking things so they ship safer."
- Buttons: Read the Log (primary) · See the work
- Facts row: Study · VUW · year 3 | Next · Atlassian · SYD | NZCSC 2026 · Top 10 uni | Side project · Red Specter | Keys · PGP in footer

**01 Now** (before the internship) · "Updated 2026-10-16"
- Heading: Right NOW
- Route: WLG ··· SYD · "Still in Wellington" · "Flying out in November" · Internship bar "Starts Nov"
- 01 Finishing third year of cybersecurity engineering at VUW.
- 02 Getting ready for Sydney. The Security Engineering internship at Atlassian starts in November.
- 03 Working on Red Specter with a friend, and getting the Log ready for the internship series.

During the internship: "UTC+13 → UTC+11" · "Back in Wellington late January" · lines: "Week three of twelve as a Security Engineering intern at Atlassian in Sydney." · "Writing one Log post a week about what I'm learning. Public knowledge only, views my own." · "Chipping away at Red Specter with a friend, from across the Tasman."

**02 Work** · "4 projects" · heading: Selected WORK

| # | Title | Meta | Outcome | Tags |
|---|---|---|---|---|
| 01 | PricePath | 2026 · Scraper + deploy lead · Playwright, OCI, nginx, CI/CD | Grocery prices from three NZ supermarket chains, scraped nightly and shipped to a locked-down OCI box by CI. | Builds, Cloud, Team of 5 |
| 02 | CTF writeups | Ongoing · Player · NZCSC, Hack The Box | NZCSC 2026: top 10 among university students, top 30 overall. Writeups for retired boxes only, dead ends left in. | Writeups, Offence |
| 03 | Red Specter | 2026 · With a friend · Early days | A new idea a friend and I are working on: pen testing for small businesses, explained in plain English. | Idea, Offence |
| 04 | Hardened OCI lab | 2026 · Solo · Oracle Linux, systemd, Docker, nginx | A free-tier box I keep trying to break: keys only, least privilege, everything behind a reverse proxy. | Builds, Blue team |

**03 Log** · RSS link · heading: From the LOG
- Series feature: "Series · Atlassian, Sydney" · "Twelve weeks on a security team" · "One post a week from November 2026: what I'm learning, what surprised me and what I'd tell the next intern. Public knowledge only. Views are my own." · Open the series · 00/12 · W01 Nov … W12 Jan
- Latest three posts (before): Hardening a free-tier OCI box · NZCSC: three challenges I nearly quit on · Playwright vs three supermarkets
- Button: All posts

**04 Lab** · "5 items" · heading: In the LAB
- HackRF One: Software-defined radio, 1 MHz to 6 GHz. Mostly for learning how my own remotes talk.
- USB Rubber Ducky: Keystroke injection. The fastest way to show why an unlocked laptop is a problem.
- Wi-Fi Pineapple: Wireless auditing on my own network, and on client networks when it's in scope.
- FPV drone: Built it, crashed it, rebuilt it. Soldering practice that flies.
- Home lab server: Where things get broken on purpose. [SPEC: CPU, RAM, hypervisor]
- Note: "Everything here is used on my own hardware, or with written permission and a scope."

**05 About** · "Kia ora" · heading: The short VERSION.
- Portrait with hand note "that's me"; caption "Fig. 01 · 1-bit portrait, Atkinson dither · placeholder"
- Lead: I'm a third-year cybersecurity engineering student at Te Herenga Waka, Victoria University of Wellington.
- I like the unglamorous end of security: reading configs, writing threat models and fixing the boring thing before it turns into the interesting thing. Outside class I play CTFs, break my own hardware in a home lab and work on Red Specter, a pen-testing idea for small businesses, with a friend.
- I'm still a student, so most of what's here is learning in public. Where I got something wrong, I've left it in.
- Highlights: 2026 · Security Engineering intern, Atlassian, Sydney | NZCSC 2026 · Top 10 university students, top 30 overall | Award · Graham Kelly Engineering and Computer Science Scholarship, VUW | Building · Red Specter, an early-stage idea with a friend

**06 Contact** · "Plain email, no forms" · heading: Say HELLO.
- Big link: james@[domain]
- PGP key · /pgp.asc · fingerprint | GitHub · github.com/jamesdeh | LinkedIn · [linkedin.com/in/…] | Response · "Usually within two working days. NZT, or AEDT from November."

## Case study: PricePath

Full copy is in `content/work/pricepath.mdx`. Threat model:

| | Note | Status |
|---|---|---|
| S | Only the CI runner can deploy. One SSH key per environment, password login off. | Mitigated |
| T | Scraped rows are schema-checked before they reach the database. | Mitigated |
| R | Every scrape run logs source, start time and row count. | Mitigated |
| I | No secrets in the repo. CI variables are masked and protected. | Mitigated |
| D | nginx rate limits requests. One small VM is still a single point of failure. | Accepted |
| E | Services run as unprivileged users under systemd. No root in the app. | Mitigated |

These are draft notes from the design. James should confirm each one matches what PricePath actually does.

## Log index

- Heading: The LOG · "Internship posts, CTF writeups, builds and short notes. Written as I learn, kept public, nothing internal." · RSS feed
- Filters: All · Internship · Writeups · Builds · Notes · search "Search the Log" with `>` prompt and "grep posts"
- Empty state: `grep: no posts match "query"` · "Try a tag instead, or clear the search."

## Post

- Banner: `CLASSIFICATION: PUBLIC · 6 MIN READ · W03/12 · 2026-11-24`, repeated at the end as `END OF DOCUMENT · CLASSIFICATION: PUBLIC`
- Series line: "Views are my own and don't represent Atlassian."
- Sample body: `content/log/2026-11-24-w03-reading-before-writing.mdx`

## Series

- Kicker: Series · Security Engineering internship · Atlassian, Sydney
- Heading: Twelve WEEKS
- Lead: One post a week from November 2026 to the end of January 2027. What I'm learning, what surprised me and what I'd tell the next intern. Public knowledge only, views my own.
- Note: "Nothing here is internal or under NDA. If a week has nothing I can share, the post says so and talks about what I learned in general terms."
- Follow along: "New weeks land in the main Log feed and in a series-only feed." · Series RSS · Whole Log

## 404

- Banner: `CLASSIFICATION: RESTRICTED · HTTP 404 · THIS PAGE DOESN'T EXIST, OR NEVER DID`
- Heading: ACCESS DENIED / 404
- Terminal: `$ cat /flag.txt` → `cat: /flag.txt: Permission denied` → `$ ls -a /` → `.  ..  .well-known  log  work  robots.txt` → `# hint: robots know more than they say`
- "Wrong turn, old link or curiosity. All three are fine." · "If you followed a link from somewhere on this site, tell me and I'll fix it. If you're poking around on purpose, there is a flag. It's harmless and it's yours if you find it." · Back home · Read the Log · "Or press ⌘K and type where you meant to go"

## Colophon

- Heading: How it's BUILT · "What this site runs on, the headers it sends and what changed. If you spot a weak header, I'd like to know."
- Stack rows, headers table, budget readout and changelog as in `pages/colophon.html`
- Changelog: 2026-10-16 · v0.1 · Signal Noir design system and page designs | [Date] · v0.2 · Astro build, content collections, Sveltia CMS, headers in CI | [Date] · v1.0 · Launch. Replaces jamesdeh.github.io
