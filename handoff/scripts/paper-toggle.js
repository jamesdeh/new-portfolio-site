// paper mode toggle on posts, remembered per browser
// markup: <button class="toggle" data-paper-toggle aria-pressed="false"><span class="t-noir">Noir</span><span class="t-paper">Paper</span></button>
(() => {
  const btn = document.querySelector('[data-paper-toggle]');
  if (!btn) return;
  const root = document.documentElement;
  const sync = () => btn.setAttribute('aria-pressed', String(root.dataset.mode === 'paper'));

  btn.addEventListener('click', () => {
    const paper = root.dataset.mode !== 'paper';
    if (paper) root.dataset.mode = 'paper';
    else delete root.dataset.mode;
    try { localStorage.setItem('jdh-mode', paper ? 'paper' : 'noir'); } catch (e) { /* fine */ }
    sync();
  });

  sync();
})();
