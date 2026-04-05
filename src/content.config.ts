import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      region: z.string().optional(),
      description: z.string(),
      image: z.string().optional(),
      mapX: z.number().min(0).max(100), // percentage position on the map
      mapY: z.number().min(0).max(100),
      tags: z.array(z.string()).default([]),
    }),
});

const characters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/characters' }),
  schema: z.object({
    name: z.string(),
    class: z.string(),
    race: z.string(),
    level: z.number().optional(),
    image: z.string().optional(),
    location: z.string().optional(), // slug of the location
    status: z.enum(['active', 'retired', 'deceased']).default('active'),
    tags: z.array(z.string()).default([]),
  }),
});

const npcs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/npcs' }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    race: z.string().optional(),
    image: z.string().optional(),
    location: z.string().optional(),
    faction: z.string().optional(),
    status: z.enum(['alive', 'dead', 'unknown']).default('alive'),
    tags: z.array(z.string()).default([]),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(), // fantasy calendar date, e.g. "3rd of Deepwinter, Year 1042"
    sortOrder: z.number(), // numeric value for chronological sorting
    location: z.string().optional(),
    characters: z.array(z.string()).default([]),
    type: z
      .enum(['battle', 'discovery', 'political', 'quest', 'divine', 'other'])
      .default('other'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const worldLore = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/world-lore' }),
  schema: z.object({
    title: z.string(),
    category: z
      .enum([
        'history',
        'factions',
        'magic',
        'religions',
        'geography',
        'cultures',
        'other',
      ])
      .default('other'),
    image: z.string().optional(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
  }),
});

const music = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/music' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    file: z.string(), // path relative to /music/ e.g. "tavern-theme.mp3"
    coverArt: z.string().optional(),
    duration: z.string().optional(), // e.g. "3:45"
    mood: z.array(z.string()).default([]), // e.g. ["epic", "battle"]
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  locations,
  characters,
  npcs,
  events,
  'world-lore': worldLore,
  music,
};
