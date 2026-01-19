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

const docs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),           // For sorting
    category: z.string(),         // Category (e.g., "getting-started", "guides", "api")
    draft: z.boolean().default(false),  // Draft flag
    canonical: z.string().optional(),
  }),
});

export const collections = { blog, docs };
