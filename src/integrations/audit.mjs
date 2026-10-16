// astro:build:done audit: the security readout is generated, never typed
// minifies the public scripts, then fails the build if the headers, the html
// or the budgets would make the readout lie. js is measured per page
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

const BUDGET = { js: 5000, css: 20000, html: 30000 };

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });

const gz = (buf) => zlib.gzipSync(buf, { level: 9 }).length;
const kb = (n) => (n / 1000).toFixed(1) + ' kB';

// _headers is a list of path blocks, each with indented "Name: value" lines
export function parseHeaders(src) {
  const blocks = {};
  let cur = null;
  for (const line of src.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      cur = blocks[line.trim()] = {};
      continue;
    }
    const m = line.trim().match(/^([^:!]+):\s*(.*)$/);
    if (cur && m) cur[m[1].trim().toLowerCase()] = m[2].trim();
  }
  return blocks;
}

export default function audit() {
  return {
    name: 'signal-noir-audit',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        const fails = [];
        const rel = (p) => path.relative(out, p).replaceAll('\\', '/');
        const isAdmin = (p) => rel(p).startsWith('admin/');

        // 1. headers
        const headersFile = path.join(out, '_headers');
        const headers = fs.existsSync(headersFile) ? parseHeaders(fs.readFileSync(headersFile, 'utf8')) : {};
        const root = headers['/*'] || {};
        const csp = root['content-security-policy'] || '';
        const hsts = root['strict-transport-security'] || '';
        const cspStrict = Boolean(csp) && !/unsafe-/.test(csp) && !/https?:\/\//.test(csp) && /script-src 'self'/.test(csp) && /default-src 'none'/.test(csp);
        const hstsPreload = /max-age=(\d+)/.test(hsts) && Number(hsts.match(/max-age=(\d+)/)[1]) >= 31536000 && /preload/.test(hsts) && /includesubdomains/i.test(hsts);
        if (!cspStrict) fails.push('CSP on /* is missing or not strict');
        if (!hstsPreload) fails.push('HSTS on /* is missing preload, includeSubDomains or a 1 year max-age');
        if (Object.values(headers).some((b) => b['set-cookie'])) fails.push('_headers sets a cookie');

        // 2. minify the classic scripts copied from public/scripts
        const scriptsDir = path.join(out, 'scripts');
        if (fs.existsSync(scriptsDir))
          for (const f of walk(scriptsDir).filter((p) => p.endsWith('.js')))
            fs.writeFileSync(f, transformSync(fs.readFileSync(f, 'utf8'), { minify: true, target: 'es2020' }).code);

        // 3. html and js scan, /admin is allowed its own rules
        const files = walk(out);
        const html = files.filter((f) => f.endsWith('.html') && !isAdmin(f));
        const js = files.filter((f) => f.endsWith('.js') && !isAdmin(f));
        const css = files.filter((f) => f.endsWith('.css') && !isAdmin(f));
        let trackers = 0;
        let cookies = 0;
        for (const f of html) {
          const s = fs.readFileSync(f, 'utf8');
          const where = rel(f);
          for (const m of s.matchAll(/<script\b([^>]*)>/gi)) {
            const attrs = m[1];
            const src = attrs.match(/\bsrc="([^"]*)"/)?.[1];
            if (!src) fails.push(`${where}: inline <script>`);
            else if (/^(https?:)?\/\//.test(src)) {
              trackers++;
              fails.push(`${where}: third-party script ${src}`);
            }
          }
          // only links that fetch something count, canonical and alternate are just urls
          for (const m of s.matchAll(/<link\b([^>]*)>/gi)) {
            const relAttr = m[1].match(/\brel="([^"]*)"/)?.[1] ?? '';
            const href = m[1].match(/\bhref="([^"]*)"/)?.[1] ?? '';
            if (/stylesheet|preload|icon|manifest|prefetch|preconnect/.test(relAttr) && /^(https?:)?\/\//.test(href)) fails.push(`${where}: third-party ${relAttr} ${href}`);
          }
          for (const m of s.matchAll(/<(?:img|iframe|source|video|audio)\b[^>]*src="((?:https?:)?\/\/[^"]+)"/gi)) fails.push(`${where}: third-party media ${m[1]}`);
          if (/<style\b/i.test(s)) fails.push(`${where}: inline <style>`);
          if (/\sstyle="/i.test(s)) fails.push(`${where}: style="" attribute`);
        }
        for (const f of js) if (/document\.cookie|cookieStore/.test(fs.readFileSync(f, 'utf8'))) cookies++;
        if (cookies) fails.push(`${cookies} script(s) touch cookies`);

        // 4. budgets: js is what each page loads, css is the shared total
        const jsSize = new Map(js.map((f) => [rel(f), gz(fs.readFileSync(f))]));
        const allJs = [...jsSize.values()].reduce((a, b) => a + b, 0);
        const cssBytes = css.reduce((n, f) => n + gz(fs.readFileSync(f)), 0);
        if (cssBytes > BUDGET.css) fails.push(`CSS ${kb(cssBytes)} gzipped is over ${kb(BUDGET.css)}`);

        // 5. write each page's own js size into its readout
        let heaviest = 0;
        for (const f of html) {
          let s = fs.readFileSync(f, 'utf8');
          const srcs = [...s.matchAll(/<script\b[^>]*\bsrc="\/([^"]+)"/gi)].map((m) => m[1]);
          const bytes = srcs.reduce((n, src) => n + (jsSize.get(src) ?? 0), 0);
          heaviest = Math.max(heaviest, bytes);
          if (bytes > BUDGET.js) fails.push(`${rel(f)} loads ${kb(bytes)} of JS gzipped, over ${kb(BUDGET.js)}`);
          if (s.includes('__JS_SIZE__')) fs.writeFileSync(f, (s = s.replaceAll('__JS_SIZE__', kb(bytes))));
          const n = gz(Buffer.from(s));
          if (n > BUDGET.html) fails.push(`${rel(f)} is ${kb(n)} gzipped, over ${kb(BUDGET.html)}`);
        }

        logger.info(`CSP strict ${cspStrict ? 'pass' : 'FAIL'} · HSTS preload ${hstsPreload ? 'pass' : 'FAIL'} · trackers ${trackers} · cookies ${cookies} · JS heaviest page ${kb(heaviest)} (all scripts ${kb(allJs)}) · CSS ${kb(cssBytes)} · ${html.length} pages`);
        if (fails.length) {
          for (const f of fails) logger.error(f);
          throw new Error(`audit failed with ${fails.length} problem(s), the readout would not be true`);
        }
      },
    },
  };
}
