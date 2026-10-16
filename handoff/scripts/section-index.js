// m2 section index: one square marker follows the section in view
// the marker slides via --i in css, links get aria-current
(() => {
  const list = document.querySelector('.idx');
  if (!list) return;
  const links = [...list.querySelectorAll('a[href^="#"]')];
  const sections = links.map((a) => document.getElementById(a.hash.slice(1)));

  const set = (i) => {
    if (i < 0) return;
    list.style.setProperty('--i', i);
    links.forEach((a, n) => {
      if (n === i) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) set(sections.indexOf(e.target));
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach((s) => s && io.observe(s));
})();
