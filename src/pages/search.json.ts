// command palette index, fetched on first open
import { getPosts, getWork, hasPage } from '../lib/content';

export async function GET() {
  const posts = await getPosts();
  const work = (await getWork()).filter(hasPage);
  const index = [
    ...posts.map((p) => ({ title: p.data.title, url: `/log/${p.id}/`, group: 'Posts', hint: p.data.tags[0] })),
    ...work.map((w) => ({ title: w.data.title, url: `/work/${w.id}/`, group: 'Work', hint: 'Case' })),
    { title: 'cd /', url: '/', group: 'Pages', hint: 'Home' },
    { title: 'cd /log', url: '/log/', group: 'Pages', hint: 'Log' },
    { title: 'cd /log/series/atlassian', url: '/log/series/atlassian/', group: 'Pages', hint: 'Series' },
    { title: 'cd /colophon', url: '/colophon/', group: 'Pages', hint: 'Colophon' },
    { title: 'cat /rss.xml', url: '/rss.xml', group: 'Pages', hint: 'Feed' },
  ];
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
}
