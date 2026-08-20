import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.mdx' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      deck: z.string(),
      order: z.number(),
      year: z.string(),
      role: z.string(),
      category: z.enum(['work', 'side-project']).default('work'),
      // "planned" entries render as stubs and must never carry invented metrics or screenshots.
      status: z.enum(['shipped', 'planned']).default('shipped'),
      tags: z.array(z.string()).default([]),
      metrics: z
        .array(z.object({ value: z.string(), label: z.string() }))
        .default([]),
      repoUrl: z.url().optional(),
      demoUrl: z.url().optional(),
      projectUrl: z.url().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, notes };
