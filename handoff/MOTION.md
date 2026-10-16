# Motion

Quiet, then still. Motion confirms what happened or adds one moment of play, never decoration. Open `motion-demo.html` in Chrome or Edge to see it all working.

Rules for every item below:

- Each one has a `prefers-reduced-motion: reduce` version that is static or instant
- Nothing blocks content: no loaders, no scroll hijacking, no smooth-scroll overrides, no custom cursor
- Transform and opacity only, plus colour and border changes. No layout animation
- Everything works without JavaScript, the motion is the extra
- Total JS for all of it stays under 5 kB gzipped

Load order in `Base.astro`:

```html
<head>
  <script src="/scripts/head.js"></script>
  <link rel="stylesheet" href="/styles/signal-noir.css">
  <link rel="stylesheet" href="/styles/motion.css">
</head>
<body>
  ...
  <script src="/scripts/toast.js" defer></script>
  <script src="/scripts/status.js" defer></script>
  <script src="/scripts/menu.js" defer></script>
  <script src="/scripts/command-palette.js" defer></script>
  <!-- per page: decrypt, section-index, card-tilt, field on home; reading-progress, paper-toggle, copy-code on posts -->
</body>
```

---

## 1. Signature motion

These are the designed moments. They are also annotated as sticky notes beside the Home board on the canvas.

| ID | What | Where | Trigger | Spec | Reduced motion | Runs in |
|---|---|---|---|---|---|---|
| M1 | Pixel word decrypts | Home hero, "DE HAIR." | First visit per session | Random glyphs from the word's own letters resolve left to right. 8 steps × 90ms = 720ms. Width locked so nothing reflows. The accent full stop stays put | Final word, no animation | `scripts/decrypt.js` |
| M2 | Index marker slides | Home rail, any page with `.idx` | Section crosses 40% of the viewport | One 7px square moves `translateY(--i × 36px)` over 320ms `cubic-bezier(.2,.7,.2,1)`. Links get `aria-current` | Marker jumps | `scripts/section-index.js` + `.idx__marker` in the stylesheet |
| M3 | Cards tilt in | Home 02 WORK | Card is 20% visible | From `perspective(1200px) rotateX(8deg) translateY(32px)`, opacity 0, to the resting tilt (−1.5° / +1.25°). 600ms ease-out, second card in a row 80ms later. Once only | Resting tilt from the start | `scripts/card-tilt.js` + `motion.css` |
| M4 | Pixel dissolve | Every page change | Same-origin navigation | Cross-document View Transitions. The new page appears through 8 Bayer mask steps over 360ms (`img/masks/bayer-1..8.png`, 32px tiles). The old page holds still. Unsupported browsers just navigate | No transition | `motion.css` only |
| M5 | Dithered field leans to the pointer | Home hero background | Pointer move over the hero, `pointer: fine` | 1-bit field at 6% opacity. Mask centre follows the pointer and the field shifts up to 24px each way, 400ms ease-out, rAF throttled, paused off screen | Static field | `scripts/field.js` + `motion.css` |
| Dot | Status pulse | Status pill | Always | 1px ring around the 6px accent square, 2.4s loop, `steps(6)` so it reads as pixels, not a glow | Solid dot | Stylesheet (`sn-pulse`) |

Markup the scripts expect:

```html
<!-- m1: only the letters decrypt, the h1 label stays clean -->
<h1 class="hero__title" aria-label="James de Hair">
  <span class="g">James</span>
  <span class="px"><span data-decrypt>DE HAIR</span><span class="acc">.</span></span>
</h1>

<!-- m2: marker is the first li, links point at section ids -->
<ul class="idx">
  <li class="idx__marker" aria-hidden="true"></li>
  <li><a href="#intro" aria-current="true"><span class="n">00</span>Intro</a></li>
  ...
</ul>

<!-- m5: field sits first inside the hero -->
<section class="hero" id="intro"><div class="hero__field" aria-hidden="true"></div> ... </section>
```

---

## 2. Interaction feedback

Small and quick. Durations come from the tokens: `--t-fast` 120ms linear for colour and border, `--t-base` 200ms and `--t-slow` 320ms ease-out for movement.

| Element | Motion | Timing | Reduced motion | Runs in |
|---|---|---|---|---|
| Buttons | Primary fills with accent on hover. Active moves down 1px | 120ms colour, 120ms transform | Colour only | Stylesheet |
| Links | Dashed pixel underline turns solid on hover | Instant swap | Same | Stylesheet |
| Case card hover / focus | Goes flat, lifts 4px, border turns accent, arrow nudges 4px | 320ms transform, 120ms border | Border only, stays tilted | Stylesheet |
| Post card, post row | Surface fill, title turns accent, row arrow fades and slides in 6px | 120ms fill, 200ms arrow | Fill only | Stylesheet |
| Nav, index, tags | Colour shifts | 120ms | Same | Stylesheet |
| Progress bar current cell | Blinks between full and 35% | 1.2s `steps(2)` loop | Solid | Stylesheet (`sn-blink`) |
| Palette caret | Block caret blinks | 1s `steps(2)` loop | Solid | Stylesheet (`sn-caret`) |
| Command palette | Dialog drops in 8px and fades | 160ms ease-out | Instant | `motion.css`, `scripts/command-palette.js` |
| Mobile menu sheet | Drops in 8px and fades under the top bar | 200ms ease-out | Instant | `motion.css`, `scripts/menu.js` |
| Code copy | Button reads "Copied" in accent, live region announces it | Holds 2s | Same | `scripts/copy-code.js` |
| Toast | Rises 8px in, falls 4px out | 200ms in, 120ms out, stays 4s | Instant | `motion.css`, `scripts/toast.js` |
| Reading bar | Cells fill as you read, one per twelfth | Per scroll frame | Same (it's state, not decoration) | `scripts/reading-progress.js` |
| Paper toggle | Instant swap, no fade, applied before paint on load | None | Same | `scripts/head.js`, `scripts/paper-toggle.js` |
| Log filters and search | List updates in place, count announced | None | Same | `scripts/log-filter.js` |
| Status pill | Text corrects to the current phase if the build is stale | None | Same | `scripts/status.js` |

---

## 3. What never moves

- Body copy, headings other than the hero pixel word, images and the top bar
- Scroll position: anchor jumps are native, no smooth scrolling
- Layout: no height or width animation, no accordions that push content
- Nothing autoplays except the status dot, the current progress cell and the palette caret, all tiny and pixel-stepped

---

## 4. Reduced motion checklist

Turn on Reduce motion in the OS and reload each page:

- [ ] Hero shows "DE HAIR." immediately
- [ ] Index marker jumps between sections
- [ ] Cards are visible at their resting tilt on load; hover changes the border only
- [ ] Navigating between pages swaps instantly
- [ ] Hero field is still and ignores the pointer
- [ ] Status dot is solid, progress cell and caret don't blink
- [ ] Menu, palette and toasts appear instantly

---

## 5. Notes for the build

- `html.js` is set by `head.js`. The card entry hides cards only under `html.js`, and a 3s CSS fallback reveals them if the observer never runs
- The dissolve masks must be same-origin, which they are on the site. Browsers block CSS masks from `file://`, which is why the demo inlines them
- View Transitions need `@view-transition { navigation: auto; }` on both pages, so keep it in the shared `motion.css`
- Test in Chrome, Safari 18+ and Firefox (Firefox skips the dissolve, everything else works)
