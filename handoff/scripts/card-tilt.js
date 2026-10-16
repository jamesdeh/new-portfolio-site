// m3 cards ease from an 8 degree tilt to their resting tilt as they enter
// css lives in motion.css, reduced motion shows them at rest straight away
(() => {
  const cards = [...document.querySelectorAll('.cards .card')];
  if (!cards.length) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    cards.forEach((c) => c.classList.add('is-in', 'is-settled'));
    return;
  }

  cards.forEach((c, i) => c.style.setProperty('--stagger', String(i % 2)));

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const card = e.target;
      card.classList.add('is-in');
      // once settled, hover uses the normal faster transition again
      card.addEventListener('transitionend', () => card.classList.add('is-settled'), { once: true });
      io.unobserve(card);
    }
  }, { threshold: 0.2 });

  cards.forEach((c) => io.observe(c));
})();
