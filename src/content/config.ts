import { defineCollection, z } from 'astro:content';

// Working papers. Order in research.html follows `order` ascending.
const papers = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    coauthors: z.array(z.string()).optional(),
    url: z.string().url().optional(),
    urlLabel: z.string().optional().default('PDF'),
    status: z.string().optional(), // e.g. "Under Review", "Work in Progress"
    abstract: z.string(),
    presentations: z.array(z.string()).optional(),
  }),
});

// Talks / seminars. Listed on research page under each paper; also feed "What's new".
const presentations = defineCollection({
  type: 'data',
  schema: z.object({
    venue: z.string(),
    year: z.number(),
    date: z.string().optional(), // ISO date for sorting What's-new
    paper: z.string().optional(), // slug reference (informational)
    note: z.string().optional(),
  }),
});

// Honors, fellowships, awards.
const awards = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    year: z.string(), // string to allow ranges like "2026-2027"
    date: z.string().optional(), // ISO date for What's-new sort
    note: z.string().optional(),
  }),
});

// Courses taught. Order in teaching.html follows `order` ascending.
const teaching = defineCollection({
  type: 'data',
  schema: z.object({
    code: z.string(),
    title: z.string(),
    institution: z.enum(['Baruch College, CUNY', 'Queens College, CUNY']),
    role: z.enum(['Instructor of Record', 'Teaching Assistant']).default('Instructor of Record'),
    order: z.number(),
    websiteUrl: z.string().url().optional(),
  }),
});

export const collections = { papers, presentations, awards, teaching };
