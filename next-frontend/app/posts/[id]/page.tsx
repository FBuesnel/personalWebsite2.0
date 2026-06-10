import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/db";
import PostClient from "../../../components/pages/PostClient";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map(post => ({ id: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { slug: id } });
  if (!post || !post.published) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.quote,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.quote,
      url: `/posts/${post.slug}`,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { slug: id } });
  if (!post || !post.published) notFound();
  return <PostClient text={post.content} />;
}
