import type { Metadata } from "next";
import { prisma } from "../../lib/db";
import PostsClient from "../../components/pages/PostsClient";

export const metadata: Metadata = {
  title: "Posts",
  description: "Stories, poetry, and thoughts by Fynn Buesnel.",
};

export const revalidate = 3600;

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
    select: { slug: true, title: true, quote: true },
  });
  return <PostsClient posts={posts} />;
}
