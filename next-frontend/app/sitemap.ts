import type { MetadataRoute } from "next";
import { prisma } from "../lib/db";

const BASE = "https://www.fynnbuesnel.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/experience`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/posts`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.2 },
    ...posts.map(post => ({
      url: `${BASE}/posts/${post.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
