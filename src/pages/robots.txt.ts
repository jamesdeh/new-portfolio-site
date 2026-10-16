import { site } from '../config/site';

// the disallowed path is the hidden flag, the 404 page hints at it
export function GET({ site: url }: { site: URL }) {
  const body = ['User-agent: *', `Disallow: /${site.flag.path}/`, 'Disallow: /admin/', '', `Sitemap: ${new URL('/sitemap-index.xml', url)}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
