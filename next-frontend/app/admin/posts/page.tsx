import { prisma } from "../../../lib/db";
import { Container, Header } from "../../../components/GlobalStyles";
import PostsAdminList from "../../../components/admin/PostsAdminList";

export const dynamic = "force-dynamic";

export default async function PostsAdminPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, slug: true, title: true, published: true },
  });
  return (
    <Container>
      <Header>Posts</Header>
      <PostsAdminList posts={posts} />
    </Container>
  );
}
