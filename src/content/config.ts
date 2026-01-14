import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default("AttriKit Team"),
    // SEO: canonical URL for custom normalization
    canonical: z.string().optional(),
  }),
});

export const collections = { blog };
