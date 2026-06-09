import type { MetadataRoute } from "next";
import { posts } from "../lib/posts-data";

const BASE = "https://www.fynnbuesnel.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/experience`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/posts`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.2 },
    ...posts.map(post => ({
      url: `${BASE}/posts/${post.id}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
