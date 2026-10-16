// mobile menu sheet under the top bar
// esc or the button closes it and focus goes back to the button
(() => {
  const btn = document.querySelector('.menu-btn');
  const sheet = document.getElementById('menu-sheet');
  if (!btn || !sheet) return;

  const open = (on) => {
    btn.setAttribute('aria-expanded', String(on));
    btn.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
    sheet.hidden = !on;
    if (on) {
      const first = sheet.querySelector('a, button');
      if (first) first.focus();
    } else {
      btn.focus();
    }
  };

  btn.addEventListener('click', () => open(btn.getAttribute('aria-expanded') !== 'true'));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') open(false);
  });
})();
