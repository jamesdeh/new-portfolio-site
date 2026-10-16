import { getCollection, type CollectionEntry } from 'astro:content';
import { showDrafts } from '../config/site';

export type Post = CollectionEntry<'log'>;
export const TAGS = ['Internship', 'Writeups', 'Builds', 'Notes'] as const;
export type Work = CollectionEntry<'work'>;

export const readingMinutes = (body = '') => {
  const words = body
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
    .replace(/```[\s\S]*?```/g, (m) => m.split(/\s+/).slice(0, 40).join(' '))
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
};

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export async function getPosts() {
  const all = await getCollection('log', (p) => showDrafts || !p.data.draft);
  return all.sort((a, b) => +b.data.date - +a.data.date);
}

export const seriesPosts = (posts: Post[]) =>
  posts.filter((p) => p.data.series?.id === 'atlassian').sort((a, b) => a.data.series!.week - b.data.series!.week);

// titles like "W03/12: Reading before writing" drop the prefix in rows that show it separately
export const shortTitle = (p: Post) => (p.data.series ? p.data.title.replace(/^W\d+\/12:\s*/, '') : p.data.title);

export async function getWork() {
  const all = await getCollection('work');
  return all.sort((a, b) => a.data.order - b.data.order);
}

// pending work has no page in production, only a dashed card
export const hasPage = (w: Work) => w.data.status === 'published' || showDrafts;
