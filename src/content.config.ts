import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const log = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/log' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    // the post header's standfirst, the summary is used when it's missing
    lead: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.enum(['Internship', 'Writeups', 'Builds', 'Notes'])).min(1),
    series: z.object({ id: z.literal('atlassian'), week: z.number().int().min(1).max(12) }).optional(),
    classification: z.enum(['public']).default('public'),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pixelWord: z.string().optional(),
      order: z.number(),
      year: z.string(),
      role: z.string(),
      stack: z.array(z.string()),
      outcome: z.string().max(160),
      tags: z.array(z.string()),
      cover: image(),
      status: z.enum(['published', 'pending']).default('published'),
      updated: z.coerce.date().optional(),
      meta: z.object({ year: z.string(), role: z.string(), stack: z.string(), status: z.string() }).optional(),
      // shorter role and stack for the home card when the full ones wrap
      card: z.object({ role: z.string(), stack: z.string() }).optional(),
      aside: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
      threats: z
        .array(
          z.object({
            id: z.enum(['S', 'T', 'R', 'I', 'D', 'E']),
            note: z.string().max(120),
            status: z.enum(['mitigated', 'accepted']),
          }),
        )
        .length(6)
        .optional(),
    }),
});

export const collections = { log, work };
