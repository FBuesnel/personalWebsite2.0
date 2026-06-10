import { notFound } from "next/navigation";
import { prisma } from "../../../../lib/db";
import { Container, Header } from "../../../../components/GlobalStyles";
import PostEditor from "../../../../components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function PostEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return (
      <Container>
        <Header>New Post</Header>
        <PostEditor />
      </Container>
    );
  }

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <Container>
      <Header>Edit Post</Header>
      <PostEditor post={post} />
    </Container>
  );
}
