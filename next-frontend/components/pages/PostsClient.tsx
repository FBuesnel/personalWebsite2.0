'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Container, Header, Description } from '../GlobalStyles';

export interface PostListItem {
  slug: string;
  title: string;
  quote: string;
}

const LinkContainer = styled.div`
  margin-bottom: 2em;
  display: flex;
  align-items: center;
`

const StyledLink = styled(Link)`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`

const StyledBlockquote = styled.blockquote`
  font-style: italic;
  color: #a4998c;
  border-left: 4px solid ${({ theme }) => theme.accent};
  padding-left: 1em;
  margin: 0 0 0 16px;
`;

const StyledContainer = styled(Container)`
  min-height: 80vh;
`;

const PostsClient = ({ posts }: { posts: PostListItem[] }) => {
  return (
    <StyledContainer>
      <Header>Posts</Header>
      <Description>Here I post lots of different things. This includes stories, poetry, and my thoughts on various things I enjoy. If you have any feedback, feel free to send me a message.</Description>
      {posts.map(post => (
        <LinkContainer key={post.slug}>
          <StyledLink href={`/posts/${post.slug}`}>{post.title}</StyledLink>
          <StyledBlockquote>
              {post.quote}
          </StyledBlockquote>
        </LinkContainer>
      ))}
    </StyledContainer>
  );
};

export default PostsClient;
