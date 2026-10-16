// small toast helper: window.jdhToast('PGP fingerprint copied', { error: false })
// bottom left, role=status, 4s, esc dismisses
(() => {
  const root = document.querySelector('.sn') || document.body;
  const host = document.createElement('div');
  host.className = 'toast-host';
  root.append(host);

  const remove = (t) => {
    t.classList.add('is-leaving');
    setTimeout(() => t.remove(), 120);
  };

  window.jdhToast = (message, opts = {}) => {
    const t = document.createElement('div');
    t.className = 'toast' + (opts.error ? ' toast--err' : '');
    t.setAttribute('role', 'status');
    const text = document.createElement('span');
    text.textContent = message;
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'btn btn--ghost btn--sm';
    close.setAttribute('aria-label', 'Dismiss');
    close.textContent = '×';
    close.addEventListener('click', () => remove(t));
    t.append(text, close);
    host.append(t);
    setTimeout(() => t.isConnected && remove(t), 4000);
  };

  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') host.querySelectorAll('.toast').forEach(remove);
  });
})();
