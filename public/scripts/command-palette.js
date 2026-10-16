// command palette: cmd or ctrl k, or / when not typing
// native dialog, index fetched from /search.json on first open
// index shape: [{ "title": "...", "url": "/log/...", "group": "Posts" | "Pages" | "Actions", "hint": "Case" }]
(() => {
  const dlg = document.getElementById('cmdk');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  const input = dlg.querySelector('input');
  const list = dlg.querySelector('[role="listbox"]');
  const count = dlg.querySelector('[data-cmdk-count]');
  let index = null;
  let results = [];
  let active = 0;

  const load = async () => {
    if (index) return;
    try { index = await (await fetch('/search.json')).json(); } catch (e) { index = []; }
  };

  const mark = (text, q) => {
    const span = document.createElement('span');
    const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
    if (i < 0) { span.textContent = text; return span; }
    const m = document.createElement('mark');
    m.textContent = text.slice(i, i + q.length);
    span.append(text.slice(0, i), m, text.slice(i + q.length));
    return span;
  };

  const render = (q) => {
    const query = q.trim();
    results = index.filter((r) => !query || r.title.toLowerCase().includes(query.toLowerCase())).slice(0, 12);
    active = 0;
    list.replaceChildren();
    if (!results.length) {
      const empty = document.createElement('p');
      empty.className = 'cmdk__group-k micro';
      empty.textContent = 'command not found: ' + query + '. Try a tag like builds';
      list.append(empty);
    }
    let group = '';
    results.forEach((r, i) => {
      if (r.group !== group) {
        group = r.group;
        const k = document.createElement('div');
        k.className = 'cmdk__group-k micro';
        k.textContent = group;
        list.append(k);
      }
      const a = document.createElement('a');
      a.className = 'cmdk__item';
      a.id = 'cmdk-' + i;
      a.href = r.url;
      a.setAttribute('role', 'option');
      const mk = document.createElement('span');
      mk.className = 'mk';
      mk.setAttribute('aria-hidden', 'true');
      mk.textContent = '>';
      const hint = document.createElement('span');
      hint.className = 'hint';
      hint.textContent = r.hint || '';
      a.append(mk, mark(r.title, query), hint);
      list.append(a);
    });
    if (count) count.textContent = results.length + (results.length === 1 ? ' result' : ' results');
    select(0);
  };

  const select = (i) => {
    const items = [...list.querySelectorAll('[role="option"]')];
    if (!items.length) { input.removeAttribute('aria-activedescendant'); return; }
    active = (i + items.length) % items.length;
    items.forEach((el, n) => el.setAttribute('aria-selected', String(n === active)));
    input.setAttribute('aria-activedescendant', items[active].id);
    items[active].scrollIntoView({ block: 'nearest' });
  };

  const open = async () => {
    if (dlg.open) return;
    dlg.showModal();
    input.value = '';
    await load();
    render('');
    input.focus();
  };

  addEventListener('keydown', (e) => {
    const typing = /^(input|textarea|select)$/i.test(document.activeElement?.tagName || '');
    if ((e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
      e.preventDefault();
      open();
    }
  });

  document.querySelectorAll('[data-cmdk-open]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    open();
  }));

  input.addEventListener('input', () => render(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); select(active + 1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); select(active - 1); }
    if (e.key === 'Enter') {
      const item = list.querySelector('[aria-selected="true"]');
      if (item) location.href = item.href;
    }
  });
})();
