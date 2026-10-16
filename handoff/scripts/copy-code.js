// copy button on code figures: copies without line numbers
// shows copied in the accent for 2s and tells screen readers
(() => {
  const root = document.querySelector('.sn') || document.body;
  const live = document.createElement('p');
  live.className = 'sr-only';
  live.setAttribute('aria-live', 'polite');
  root.append(live);

  for (const fig of document.querySelectorAll('figure.code')) {
    const btn = fig.querySelector('.code__copy');
    const code = fig.querySelector('pre code');
    if (!btn || !code) continue;
    btn.hidden = false;
    const label = btn.innerHTML;

    btn.addEventListener('click', async () => {
      const copy = code.cloneNode(true);
      copy.querySelectorAll('.ln').forEach((n) => n.remove());
      try {
        await navigator.clipboard.writeText(copy.textContent);
        btn.classList.add('is-done');
        btn.textContent = 'Copied';
        live.textContent = 'Code copied';
        setTimeout(() => {
          btn.classList.remove('is-done');
          btn.innerHTML = label;
          live.textContent = '';
        }, 2000);
      } catch (e) {
        if (window.jdhToast) window.jdhToast('Clipboard blocked. Select the code instead', { error: true });
      }
    });
  }
})();
