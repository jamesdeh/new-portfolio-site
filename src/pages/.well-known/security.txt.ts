import { site } from '../../config/site';

// rfc 9116, expires a year after each build so a stale file can't linger
export function GET({ site: url }: { site: URL }) {
  const expires = new Date(Date.now() + 365 * 86400000).toISOString().replace(/\.\d+Z$/, 'Z');
  const body = [
    `Contact: mailto:${site.email}`,
    `Expires: ${expires}`,
    `Encryption: ${new URL('/pgp.asc', url)}`,
    'Preferred-Languages: en',
    `Canonical: ${new URL('/.well-known/security.txt', url)}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
