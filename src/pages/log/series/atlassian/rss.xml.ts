import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, seriesPosts } from '../../../../lib/content';

export async function GET(context: APIContext) {
  const posts = seriesPosts(await getPosts()).reverse();
  return rss({
    title: 'Twelve weeks · James de Hair',
    description: 'One post a week from a Security Engineering internship at Atlassian in Sydney. Views are my own.',
    site: context.site!,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.summary, pubDate: p.data.date, link: `/log/${p.id}/` })),
    customData: '<language>en-nz</language>',
  });
}
