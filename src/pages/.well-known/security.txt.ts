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
    // step 2 of the flag trail, comments are allowed by rfc 9116
    '# Thanks for checking. If you are here for the flag, step 2 of 3:',
    `# ${Buffer.from(`/${site.flag.finalPath}/`).toString('base64')}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
