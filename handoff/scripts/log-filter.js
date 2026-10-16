// log index: tag filters and title search, count announced politely
// markup: buttons [data-filter="all|Internship|..."], rows [data-tags] [data-title], input #log-q, [data-log-count]
(() => {
  const rows = [...document.querySelectorAll('[data-tags]')];
  if (!rows.length) return;
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const input = document.getElementById('log-q');
  const count = document.querySelector('[data-log-count]');
  const empty = document.querySelector('[data-log-empty]');
  let tag = 'all';

  const apply = () => {
    const q = (input ? input.value : '').trim().toLowerCase();
    let shown = 0;
    for (const row of rows) {
      const tags = row.dataset.tags.split(',');
      const title = (row.dataset.title || row.textContent).toLowerCase();
      const ok = (tag === 'all' || tags.includes(tag)) && (!q || title.includes(q));
      row.hidden = !ok;
      if (ok) shown += 1;
    }
    if (count) count.textContent = shown === 1 ? '1 post' : shown + ' posts';
    if (empty) empty.hidden = shown > 0;
  };

  buttons.forEach((b) => b.addEventListener('click', () => {
    tag = b.dataset.filter;
    buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    apply();
  }));
  if (input) input.addEventListener('input', apply);
})();
