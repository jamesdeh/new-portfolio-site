import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'The Log · James de Hair',
    description: 'Internship posts, CTF writeups, builds and short notes.',
    site: context.site!,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.summary, pubDate: p.data.date, link: `/log/${p.id}/`, categories: p.data.tags })),
    customData: '<language>en-nz</language>',
  });
}
