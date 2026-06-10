import { notFound } from "next/navigation";
import { prisma } from "../../../../lib/db";
import { Container, Header } from "../../../../components/GlobalStyles";
import PostEditor from "../../../../components/admin/PostEditor";
import PostImageUploader from "../../../../components/admin/PostImageUploader";

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
        <PostImageUploader />
      </Container>
    );
  }

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <Container>
      <Header>Edit Post</Header>
      <PostEditor
        post={{
          id: post.id,
          slug: post.slug,
          title: post.title,
          quote: post.quote,
          content: post.content,
          kind: post.kind,
          publishedAtDate: post.publishedAt.toISOString().slice(0, 10),
          coverImage: post.coverImage,
          published: post.published,
        }}
      />
      <PostImageUploader />
    </Container>
  );
}
