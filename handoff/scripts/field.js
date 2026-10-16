// m5 dithered field leans toward the pointer, max 24px each way
// desktop pointers only, paused off screen, off for reduced motion
(() => {
  const field = document.querySelector('.hero__field');
  if (!field) return;
  const fine = matchMedia('(pointer: fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return;

  const hero = field.parentElement;
  let raf = 0;
  let visible = true;
  let px = 0.7;
  let py = 0.3;

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);

  const paint = () => {
    raf = 0;
    field.style.setProperty('--fx', (px * 100).toFixed(1) + '%');
    field.style.setProperty('--fy', (py * 100).toFixed(1) + '%');
    field.style.setProperty('--dx', ((px - 0.5) * 48).toFixed(1) + 'px');
    field.style.setProperty('--dy', ((py - 0.5) * 48).toFixed(1) + 'px');
  };

  hero.addEventListener('pointermove', (ev) => {
    if (!visible) return;
    const r = hero.getBoundingClientRect();
    px = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
    py = Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height));
    if (!raf) raf = requestAnimationFrame(paint);
  });

  hero.addEventListener('pointerleave', () => {
    px = 0.7;
    py = 0.3;
    if (!raf) raf = requestAnimationFrame(paint);
  });
})();
