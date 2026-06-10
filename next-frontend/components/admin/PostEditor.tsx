'use client';

import { useActionState, useRef, useState } from 'react';
import styled from 'styled-components';
import { AdminCard, AdminForm, Input, TextArea, Select, Button, InlineRow, Label, Notice } from './AdminStyles';
import MarkdownToolbar from './MarkdownToolbar';
import PostBody from '../PostBody';
import { savePost } from '../../app/admin/posts/actions';

const TabsRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  color: ${({ theme, $active }) => ($active ? theme.text : theme.secondaryText)};
  padding: 0.25rem 0;
  border-bottom: 3px solid ${({ theme, $active }) => ($active ? theme.accent : 'transparent')};
  transition: color 0.3s, border-color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const PreviewPane = styled.div`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  padding: ${({ theme }) => theme.space[5]};
  min-height: 320px;
  max-width: 720px;
`;

export interface PostEditorData {
  id: string;
  slug: string;
  title: string;
  quote: string;
  content: string;
  kind: 'STORY' | 'POEM' | 'ESSAY';
  publishedAtDate: string; // YYYY-MM-DD
  coverImage: string | null;
  published: boolean;
}

const PostEditor = ({ post }: { post?: PostEditorData }) => {
  const [error, formAction, pending] = useActionState(savePost, undefined);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [view, setView] = useState<'write' | 'preview'>('write');
  const [previewText, setPreviewText] = useState('');

  const showPreview = () => {
    setPreviewText(contentRef.current?.value ?? '');
    setView('preview');
  };

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
        <InlineRow>
          <Label>
            Kind
            <Select name="kind" defaultValue={post?.kind ?? 'ESSAY'}>
              <option value="ESSAY">Essay</option>
              <option value="STORY">Story</option>
              <option value="POEM">Poem</option>
            </Select>
          </Label>
          <Label>
            Published date
            <Input type="date" name="publishedAt" defaultValue={post?.publishedAtDate} />
          </Label>
        </InlineRow>
        <Label>
          Cover image URL (optional, also used for link previews)
          <Input name="coverImage" defaultValue={post?.coverImage ?? ''} placeholder="https://..." />
        </Label>
        <TabsRow>
          <Tab type="button" $active={view === 'write'} onClick={() => setView('write')}>
            Write
          </Tab>
          <Tab type="button" $active={view === 'preview'} onClick={showPreview}>
            Preview
          </Tab>
        </TabsRow>
        {view === 'write' && <MarkdownToolbar textareaRef={contentRef} />}
        {/* The textarea stays mounted (hidden) in preview so its value, undo
            history, and form submission are preserved. */}
        <Label style={view === 'preview' ? { display: 'none' } : undefined}>
          Content
          <TextArea ref={contentRef} name="content" rows={20} defaultValue={post?.content} required />
        </Label>
        {view === 'preview' && (
          <PreviewPane>
            <PostBody content={previewText || '*Nothing to preview yet.*'} />
          </PreviewPane>
        )}
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
