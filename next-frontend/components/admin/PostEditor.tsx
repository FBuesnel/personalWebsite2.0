'use client';

import { useActionState } from 'react';
import { AdminCard, AdminForm, Input, TextArea, Button, InlineRow, Label, Notice } from './AdminStyles';
import { savePost } from '../../app/admin/posts/actions';

export interface PostEditorData {
  id: string;
  slug: string;
  title: string;
  quote: string;
  content: string;
  published: boolean;
}

const PostEditor = ({ post }: { post?: PostEditorData }) => {
  const [error, formAction, pending] = useActionState(savePost, undefined);

  return (
    <AdminCard>
      <AdminForm action={formAction}>
        {post && <input type="hidden" name="id" value={post.id} />}
        <InlineRow>
          <Label>
            Title
            <Input name="title" defaultValue={post?.title} required size={40} />
          </Label>
          <Label>
            Slug (the URL: /posts/your-slug)
            <Input name="slug" defaultValue={post?.slug} required size={30} pattern="[a-z0-9\-]+" />
          </Label>
        </InlineRow>
        <Label>
          Quote (shown next to the title on the Posts page and in link previews)
          <Input name="quote" defaultValue={post?.quote} />
        </Label>
        <Label>
          Content (markdown: # heading, &gt; blockquote, *italic line*)
          <TextArea name="content" rows={20} defaultValue={post?.content} required />
        </Label>
        <InlineRow>
          <Label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
            <input type="checkbox" name="published" defaultChecked={post?.published ?? true} /> Published
          </Label>
          <Button type="submit" disabled={pending}>
            {pending ? 'Saving...' : 'Save Post'}
          </Button>
        </InlineRow>
        {error && <Notice>{error}</Notice>}
      </AdminForm>
    </AdminCard>
  );
};

export default PostEditor;
