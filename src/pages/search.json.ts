// command palette index, fetched on first open
// text holds the summary, tags and section headings so search reaches past titles
import { getPosts, getWork, hasPage } from '../lib/content';
import { site, pgpGroups } from '../config/site';

const headings = (body = '') => [...body.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m) => m[1]).join(' ');

export async function GET() {
  const posts = await getPosts();
  const work = (await getWork()).filter(hasPage);
  const index: Record<string, string>[] = [
    ...posts.map((p) => ({
      title: p.data.title,
      url: `/log/${p.id}/`,
      group: 'Posts',
      hint: p.data.tags[0],
      text: [p.data.summary, p.data.tags.join(' '), headings(p.body)].join(' '),
    })),
    ...work.map((w) => ({
      title: w.data.title,
      url: `/work/${w.id}/`,
      group: 'Work',
      hint: 'Case',
      text: [w.data.outcome, w.data.tags.join(' '), w.data.stack.join(' '), headings(w.body)].join(' '),
    })),
    { title: 'cd /', url: '/', group: 'Pages', hint: 'G H' },
    { title: 'cd /log', url: '/log/', group: 'Pages', hint: 'G L' },
    { title: 'cd /log/series/atlassian', url: '/log/series/atlassian/', group: 'Pages', hint: 'G S' },
    { title: 'cd /cv', url: '/cv/', group: 'Pages', hint: 'G V' },
    { title: 'cd /colophon', url: '/colophon/', group: 'Pages', hint: 'G C' },
    { title: 'cat /rss.xml', url: '/rss.xml', group: 'Pages', hint: 'Feed' },
    { title: 'toggle --paper', url: '', group: 'Actions', hint: 'Mode', action: 'paper' },
    { title: 'copy email', url: '', group: 'Actions', hint: 'Copy', action: 'copy', value: site.email, done: 'Email copied' },
  ];
  if (site.pgpFingerprint) {
    index.push({ title: 'copy pgp --fingerprint', url: '', group: 'Actions', hint: 'Copy', action: 'copy', value: pgpGroups(site.pgpFingerprint).join(' '), done: 'PGP fingerprint copied' });
  }
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
}
