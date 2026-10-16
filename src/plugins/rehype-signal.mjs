// rehype plugins for signal noir prose
// code fences become the .code figure: filename tab, line numbers, one or more highlighted lines
// shiki tokenises with a sentinel theme so tokens map to classes, never inline styles
import { createHighlighter } from 'shiki';

const LANGS = ['python', 'javascript', 'typescript', 'shellscript', 'powershell', 'json', 'yaml', 'html', 'css', 'php', 'jinja', 'ini', 'nginx', 'dockerfile', 'sql', 'diff', 'xml'];
const ALIAS = { py: 'python', js: 'javascript', ts: 'typescript', sh: 'shellscript', bash: 'shellscript', shell: 'shellscript', zsh: 'shellscript', ps1: 'powershell', pwsh: 'powershell', yml: 'yaml', jinja2: 'jinja', conf: 'nginx' };

// sentinel colours, one per token class in the stylesheet
const CLASS_BY_COLOUR = { '#000001': 'c', '#000002': 'k', '#000003': 's', '#000004': 'f' };
const theme = {
  name: 'signal-noir-classes',
  type: 'dark',
  colors: { 'editor.foreground': '#000000', 'editor.background': '#000000' },
  settings: [
    { settings: { foreground: '#000000' } },
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#000001' } },
    { scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'constant.language', 'variable.language', 'support.type.primitive'], settings: { foreground: '#000002' } },
    { scope: ['keyword.operator', 'punctuation'], settings: { foreground: '#000000' } },
    { scope: ['string', 'string.quoted', 'punctuation.definition.string', 'string.template'], settings: { foreground: '#000003' } },
    { scope: ['entity.name.function', 'support.function', 'variable.function', 'meta.function-call.generic'], settings: { foreground: '#000004' } },
  ],
};

let highlighter;
const getHighlighter = () => (highlighter ??= createHighlighter({ themes: [theme], langs: LANGS }));

const el = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const text = (value) => ({ type: 'text', value });

const ICON_COPY = 'M3 0h5v1h-5zM3 1h1v1h-1zM7 1h1v1h-1zM1 2h5v1h-5zM7 2h1v1h-1zM1 3h1v1h-1zM5 3h1v1h-1zM7 3h1v1h-1zM1 4h1v1h-1zM5 4h3v1h-3zM1 5h1v1h-1zM5 5h1v1h-1zM1 6h5v1h-5z';
const icon = (d) =>
  el('svg', { viewBox: '0 0 8 8', width: 16, height: 16, fill: 'currentColor', shapeRendering: 'crispEdges', ariaHidden: 'true' }, [el('path', { d })]);

const parseMeta = (meta = '') => {
  const title = meta.match(/title="([^"]*)"/)?.[1] ?? '';
  const hl = new Set();
  const range = meta.replace(/title="[^"]*"/, '').match(/\{([\d,\s-]+)\}/)?.[1];
  if (range)
    for (const part of range.split(',')) {
      const [a, b] = part.trim().split('-').map(Number);
      for (let i = a; i <= (b || a); i++) hl.add(i);
    }
  return { title, hl };
};

const textOf = (node) => (node.type === 'text' ? node.value : (node.children || []).map(textOf).join(''));

function walk(node, fn, parent = null, index = 0) {
  fn(node, parent, index);
  if (node.children) node.children.forEach((c, i) => walk(c, fn, node, i));
}

export function rehypeCodeFigure() {
  return async (tree) => {
    const hits = [];
    walk(tree, (node, parent, index) => {
      if (node.tagName !== 'pre' || !parent) return;
      const code = node.children?.find((c) => c.tagName === 'code');
      if (!code) return;
      hits.push({ node, parent, index, code });
    });
    if (!hits.length) return;
    const hi = await getHighlighter();

    for (const { parent, index, code } of hits) {
      const cls = [].concat(code.properties?.className || []);
      const raw = (cls.find((c) => String(c).startsWith('language-')) || '').replace('language-', '');
      const lang = ALIAS[raw] || raw;
      const known = hi.getLoadedLanguages().includes(lang);
      const { title, hl } = parseMeta(code.data?.meta || code.properties?.metastring || '');
      const source = textOf(code).replace(/\n$/, '');
      const { tokens } = hi.codeToTokens(source, { lang: known ? lang : 'text', theme: theme.name });

      const lines = [];
      tokens.forEach((line, i) => {
        const n = i + 1;
        const parts = [el('span', { className: ['ln'] }, [text(String(n))])];
        for (const t of line) {
          const c = CLASS_BY_COLOUR[(t.color || '').toLowerCase().slice(0, 7)];
          parts.push(c ? el('span', { className: [c] }, [text(t.content)]) : text(t.content));
        }
        const last = i === tokens.length - 1;
        if (hl.has(n)) {
          lines.push(el('span', { className: ['hl'] }, parts));
        } else {
          // a highlighted line is a block, so only plain lines need a newline
          lines.push(...parts);
          if (!last) lines.push(text('\n'));
        }
      });

      const tab = [text(title || raw || 'text')];
      if (title && raw) tab.push(text(' '), el('span', { className: ['lang'] }, [text(raw)]));
      const figure = el('figure', { className: ['code'] }, [
        el('div', { className: ['code__bar'] }, [
          el('span', { className: ['code__tab'] }, tab),
          el('button', { className: ['code__copy'], type: 'button', ariaLabel: 'Copy code', hidden: true }, [icon(ICON_COPY), text('Copy')]),
        ]),
        el('pre', { tabIndex: 0 }, [el('code', {}, lines)]),
      ]);
      parent.children[index] = figure;
    }
  };
}

// gfm footnotes: visible mono heading, accent back links
export function rehypeFootnotes() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.tagName === 'section' && node.properties?.dataFootnotes !== undefined) {
        node.properties.className = ['footnotes'];
        const h = node.children.find((c) => c.tagName === 'h2');
        if (h) {
          h.properties.className = ['label'];
          h.children = [text('Footnotes')];
        }
      }
      if (node.tagName === 'a' && node.properties?.dataFootnoteBackref !== undefined) {
        node.properties.className = ['link'];
      }
    });
  };
}
