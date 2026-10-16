// status pill: keeps the phase and week right between rebuilds
// markup: <a class="status" data-status data-start="2026-11-23" data-end="2027-02-13" href="/#now">...</a>
// the build renders the same text, this only corrects a stale page
(() => {
  const pill = document.querySelector('[data-status]');
  if (!pill) return;
  const start = new Date(pill.dataset.start + 'T00:00:00+11:00');
  const end = new Date(pill.dataset.end + 'T23:59:59+11:00');
  if (isNaN(start) || isNaN(end)) return;
  const now = new Date();

  const sep = (t) => {
    const s = document.createElement('span');
    s.className = 'sep';
    s.textContent = t;
    return s;
  };
  const dot = document.createElement('span');
  dot.className = 'status__dot';
  dot.setAttribute('aria-hidden', 'true');

  let parts;
  let label;
  if (now < start) {
    const month = start.toLocaleString('en-NZ', { month: 'short' });
    parts = ['WLG ', sep('→'), ' SYD ', sep('·'), ' ' + month];
    label = 'Status: in Wellington, moving to Sydney in ' + start.toLocaleString('en-NZ', { month: 'long' });
    pill.classList.remove('status--idle');
  } else if (now <= end) {
    const week = Math.min(12, Math.floor((now - start) / 604800000) + 1);
    const w = String(week).padStart(2, '0');
    parts = ['SYD ', sep('·'), ' W' + w + '/12'];
    label = 'Status: in Sydney, week ' + week + ' of 12';
    pill.classList.remove('status--idle');
  } else {
    parts = ['WLG ', sep('·'), ' 12/12 done'];
    label = 'Status: back in Wellington, internship finished';
    pill.classList.add('status--idle');
  }

  pill.replaceChildren(dot, ...parts);
  pill.setAttribute('aria-label', label);
})();
