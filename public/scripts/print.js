// save as pdf on the cv: shows the button and opens the browser's print dialog
(() => {
  const btn = document.querySelector('[data-print]');
  if (!btn) return;
  btn.hidden = false;
  btn.addEventListener('click', () => print());
})();
