'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { AdminCard, DangerButton, InlineRow, Button } from './AdminStyles';
import { deletePost } from '../../app/admin/posts/actions';

const PostTitle = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const Meta = styled.span`
  color: ${({ theme }) => theme.secondaryText};
`;

export interface PostListAdminItem {
  id: string;
  slug: string;
  title: string;
  published: boolean;
}

const PostsAdminList = ({ posts }: { posts: PostListAdminItem[] }) => {
  return (
    <>
      <InlineRow style={{ marginBottom: '1.5rem' }}>
        <Button as={Link} href="/admin/posts/new">
          + New Post
        </Button>
      </InlineRow>
      {posts.map(post => (
        <AdminCard key={post.id}>
          <InlineRow>
            <PostTitle href={`/admin/posts/${post.id}`}>{post.title}</PostTitle>
            <Meta>
              /posts/{post.slug}
              {post.published ? '' : ' (hidden)'}
            </Meta>
            <form
              action={deletePost}
              onSubmit={e => {
                if (!confirm(`Delete "${post.title}"?`)) e.preventDefault();
              }}
              style={{ marginLeft: 'auto' }}
            >
              <input type="hidden" name="id" value={post.id} />
              <DangerButton type="submit">Delete</DangerButton>
            </form>
          </InlineRow>
        </AdminCard>
      ))}
    </>
  );
};

export default PostsAdminList;
