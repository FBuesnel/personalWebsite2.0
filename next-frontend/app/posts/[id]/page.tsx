import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "../../../lib/posts-data";
import { getPostText } from "../../../lib/posts";
import PostClient from "../../../components/pages/PostClient";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return posts.map(post => ({ id: post.id }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = posts.find(p => p.id === id);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.quote,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.quote,
      url: `/posts/${post.id}`,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const text = getPostText(id);
  if (text === null) notFound();
  return <PostClient text={text} />;
}
