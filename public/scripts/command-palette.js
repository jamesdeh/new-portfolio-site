// command palette: cmd or ctrl k, or / when not typing
// native dialog, index fetched from /search.json on first open
// index shape: [{ "title": "...", "url": "/log/...", "group": "Posts" | "Pages" | "Actions", "hint": "Case", "text": "summary and headings", "action": "paper" | "copy", "value": "..." }]
// also g then a letter jumps to a page, matching the hints in the palette
(() => {
  const dlg = document.getElementById('cmdk');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  const input = dlg.querySelector('input');
  const list = dlg.querySelector('[role="listbox"]');
  const count = dlg.querySelector('[data-cmdk-count]');
  const root = document.documentElement;
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

  const toast = (msg, error) => window.jdhToast && window.jdhToast(msg, { error });

  const run = (r) => {
    dlg.close();
    if (r.action === 'paper') {
      const paper = root.dataset.mode !== 'paper';
      if (paper) root.dataset.mode = 'paper';
      else delete root.dataset.mode;
      try { localStorage.setItem('jdh-mode', paper ? 'paper' : 'noir'); } catch (e) { /* fine */ }
      document.querySelectorAll('[data-paper-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(paper)));
      toast(paper ? 'Paper mode on' : 'Noir mode on');
    } else if (r.action === 'copy') {
      navigator.clipboard.writeText(r.value).then(() => toast(r.done || 'Copied'), () => toast('Clipboard blocked', true));
    }
  };

  const render = (q) => {
    const query = q.trim().toLowerCase();
    results = index
      .filter((r) => !query || r.title.toLowerCase().includes(query) || (r.text || '').toLowerCase().includes(query))
      .slice(0, 12);
    active = 0;
    list.replaceChildren();
    if (!results.length) {
      const empty = document.createElement('p');
      empty.className = 'cmdk__group-k micro';
      empty.textContent = 'command not found: ' + q.trim() + '. Try a tag like builds';
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
      const el = document.createElement(r.action ? 'button' : 'a');
      el.className = 'cmdk__item';
      el.id = 'cmdk-' + i;
      el.setAttribute('role', 'option');
      if (r.action) {
        el.type = 'button';
        el.addEventListener('click', () => run(r));
      } else {
        el.href = r.url;
      }
      const mk = document.createElement('span');
      mk.className = 'mk';
      mk.setAttribute('aria-hidden', 'true');
      mk.textContent = '>';
      const hint = document.createElement('span');
      hint.className = 'hint';
      hint.textContent = r.hint || '';
      el.append(mk, mark(r.title, q.trim()), hint);
      list.append(el);
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

  const go = { h: '/', l: '/log/', w: '/#work', s: '/log/series/atlassian/', c: '/colophon/', v: '/cv/' };
  let g = 0;

  addEventListener('keydown', (e) => {
    const typing = /^(input|textarea|select)$/i.test(document.activeElement?.tagName || '');
    const key = e.key.toLowerCase();
    if ((key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
      e.preventDefault();
      open();
      return;
    }
    if (typing || dlg.open || e.metaKey || e.ctrlKey || e.altKey) return;
    if (key === 'g') { g = Date.now(); return; }
    if (go[key] && Date.now() - g < 800) location.href = go[key];
    g = 0;
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
      if (item) { e.preventDefault(); item.click(); }
    }
  });
})();
