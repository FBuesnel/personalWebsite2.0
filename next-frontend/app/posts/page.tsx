import type { Metadata } from "next";
import { prisma } from "../../lib/db";
import { formatPostDate, KIND_LABELS } from "../../lib/posts-format";
import PostsClient from "../../components/pages/PostsClient";

export const metadata: Metadata = {
  title: "Posts",
  description: "Stories, poetry, and thoughts by Fynn Buesnel.",
};

export const revalidate = 3600;

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true, quote: true, kind: true, publishedAt: true },
  });
  return (
    <PostsClient
      posts={posts.map(post => ({
        slug: post.slug,
        title: post.title,
        quote: post.quote,
        kindLabel: KIND_LABELS[post.kind],
        dateLabel: formatPostDate(post.publishedAt),
      }))}
    />
  );
}
