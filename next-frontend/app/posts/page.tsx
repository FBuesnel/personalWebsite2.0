import type { Metadata } from "next";
import PostsClient from "../../components/pages/PostsClient";

export const metadata: Metadata = {
  title: "Posts",
  description: "Stories, poetry, and thoughts by Fynn Buesnel.",
};

export default function PostsPage() {
  return <PostsClient />;
}
