import { prisma } from "../../../lib/db";
import { Container, Header, Description } from "../../../components/GlobalStyles";
import PostsAdminList from "../../../components/admin/PostsAdminList";

export const dynamic = "force-dynamic";

export default async function PostsAdminPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, slug: true, title: true, published: true },
  });
  return (
    <Container>
      <Header>Edit Posts</Header>
      <Description>
        Write and publish without redeploying. Unpublished posts are hidden from the site.
      </Description>
      <PostsAdminList posts={posts} />
    </Container>
  );
}
