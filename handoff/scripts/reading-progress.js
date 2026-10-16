// reading bar on posts: one cell fills per twelfth of the article read
(() => {
  const bar = document.querySelector('.pbar--read');
  const article = document.querySelector('.doc__body');
  if (!bar || !article) return;
  const cells = [...bar.children];
  let raf = 0;

  const update = () => {
    raf = 0;
    const r = article.getBoundingClientRect();
    const total = Math.max(1, r.height - innerHeight);
    const p = Math.min(1, Math.max(0, -r.top / total));
    const n = Math.round(p * cells.length);
    cells.forEach((c, i) => c.classList.toggle('on', i < n));
    bar.setAttribute('aria-valuenow', String(Math.round(p * 100)));
  };

  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  addEventListener('resize', update);
  update();
})();
