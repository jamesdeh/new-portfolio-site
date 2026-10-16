# Seed content

Copy `work/` and `log/` into `src/content/`. Copy `../img/cover-*.png` into `src/assets/covers/` so the `cover` paths resolve.

- `work/pricepath.mdx` is the full case study from the design. James needs to confirm the facts and fill the `[PLACEHOLDER]` values
- `work/ctf-writeups.mdx`, `red-specter.mdx` and `oci-lab.mdx` are `status: pending`, so their cards render in the dashed "write-up in progress" state until the pages are written. The Home design shows them active; switch to `published` once each page exists
- `log/2026-11-24-w03-reading-before-writing.mdx` is a sample post that uses every post component (callouts, code with a filename and highlighted line, footnotes, blockquote). It stays `draft: true`
- Writeups (the CTF page and Writeups posts) come from `C:\Users\yolob\Downloads\nzcsc2026` (`/mnt/c/Users/yolob/Downloads/nzcsc2026` from WSL)
- The other log files are the sample titles from the design, all `draft: true` with `[DRAFT]` bodies

MDX components used: `<Callout type="note | warn | flag" label?>`, `<ThreatStrip />` (reads `threats` from front matter), `<Flow steps hot>`, `<DeadEnds items>`, `<Stats items>`.
