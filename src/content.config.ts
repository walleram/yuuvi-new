import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      lang: z.enum(['es', 'en']),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(['cultura', 'estetica', 'gaming', 'tecnologia', 'musica']),
      tags: z.array(z.string()).default([]),
      author: z.string(),
      authorImage: image().optional(),
      coverImage: image(),
      coverAlt: z.string(),
      featured: z.boolean().default(false),
      published: z.boolean().default(true),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      canonicalURL: z.string().url().optional(),
      /**
       * Clave que empareja un artículo con su traducción al otro idioma.
       * Los slugs suelen diferir entre idiomas ("gadgets-adolescentes" / "gadgets-teens"),
       * así que sin esta clave hreflang no se puede resolver.
       */
      translationKey: z.string().optional(),
    }),
});

export const collections = { articles };
