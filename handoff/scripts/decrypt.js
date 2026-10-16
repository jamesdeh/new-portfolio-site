// m1 decrypt: the hero pixel word resolves from its own glyphs
// first visit per session only, 8 steps of 90ms, width locked
// markup: <h1 aria-label="James de Hair"> ... <span data-decrypt>DE HAIR</span><span class="acc">.</span>
(() => {
  const el = document.querySelector('[data-decrypt]');
  if (!el) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let seen = '1';
  try { seen = sessionStorage.getItem('jdh-decrypt'); } catch (e) { /* storage blocked, skip */ }
  if (reduce || seen) return;

  const word = el.textContent;
  const pool = [...new Set(word.replace(/[^a-z0-9]/gi, ''))];
  const steps = 8;
  const width = el.getBoundingClientRect().width;
  el.style.setProperty('width', width + 'px');

  let step = 0;
  const tick = () => {
    step += 1;
    const keep = Math.ceil((word.length * step) / steps);
    el.textContent = [...word]
      .map((c, i) => (i < keep || !/[a-z0-9]/i.test(c) ? c : pool[(Math.random() * pool.length) | 0]))
      .join('');
    if (step < steps) {
      setTimeout(tick, 90);
    } else {
      el.textContent = word;
      el.style.removeProperty('width');
      try { sessionStorage.setItem('jdh-decrypt', '1'); } catch (e) { /* fine */ }
    }
  };
  tick();
})();
