'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { AdminCard, InlineRow, Button } from './AdminStyles';
import DeleteButton from './DeleteButton';
import { deletePost } from '../../app/admin/posts/actions';

const PostTitle = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.md};
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

const NewBar = styled(InlineRow)`
  margin-bottom: ${({ theme }) => theme.space[5]};
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
      <NewBar>
        <Button as={Link} href="/admin/posts/new">
          + New Post
        </Button>
      </NewBar>
      {posts.map(post => (
        <AdminCard key={post.id}>
          <InlineRow>
            <PostTitle href={`/admin/posts/${post.id}`} title="Edit post">
              {post.title}
            </PostTitle>
            <Meta>
              /posts/{post.slug}
              {post.published ? '' : ' (hidden)'}
            </Meta>
            <DeleteButton action={deletePost} fields={{ id: post.id }} prompt={`Delete "${post.title}"?`} />
          </InlineRow>
        </AdminCard>
      ))}
    </>
  );
};

export default PostsAdminList;
