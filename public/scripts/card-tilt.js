// m3 cards ease from an 8 degree tilt to their resting tilt as they enter
// also plays [data-play] once in view, like the wlg to syd route on home
// css lives in motion.css, reduced motion shows everything at rest straight away
(() => {
  const cards = [...document.querySelectorAll('.cards .card')];
  const plays = [...document.querySelectorAll('[data-play]')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    cards.forEach((c) => c.classList.add('is-in', 'is-settled'));
    plays.forEach((p) => p.classList.add('is-played'));
    return;
  }

  cards.forEach((c, i) => c.style.setProperty('--stagger', String(i % 2)));

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const el = e.target;
      const play = el.hasAttribute('data-play');
      // cards go at 20% visible, the route waits until most of it is on screen
      if (!e.isIntersecting || e.intersectionRatio < (play ? 0.6 : 0.2)) continue;
      if (play) {
        el.classList.add('is-played');
      } else {
        el.classList.add('is-in');
        // once settled, hover uses the normal faster transition again
        el.addEventListener('transitionend', () => el.classList.add('is-settled'), { once: true });
      }
      io.unobserve(el);
    }
  }, { threshold: [0.2, 0.6] });

  cards.forEach((c) => io.observe(c));
  plays.forEach((p) => io.observe(p));
})();
