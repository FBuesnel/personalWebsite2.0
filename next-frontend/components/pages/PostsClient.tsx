'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Container, Header, Description } from '../GlobalStyles';

export interface PostListItem {
  slug: string;
  title: string;
  quote: string;
  kindLabel: string;
  dateLabel: string;
}

const StyledContainer = styled(Container)`
  min-height: 80vh;
`;

const List = styled.div`
  max-width: 680px;
`;

const Item = styled.div`
  margin-bottom: ${({ theme }) => theme.space[8]};
`;

const MetaLine = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const TitleLink = styled(Link)`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const Quote = styled.blockquote`
  font-style: italic;
  color: ${({ theme }) => theme.secondaryText};
  border-left: 3px solid ${({ theme }) => theme.accent};
  padding-left: ${({ theme }) => theme.space[4]};
  margin: ${({ theme }) => theme.space[3]} 0 0 0;
`;

const PostsClient = ({ posts }: { posts: PostListItem[] }) => {
  return (
    <StyledContainer>
      <Header>Posts</Header>
      <Description>Here I post lots of different things. This includes stories, poetry, and my thoughts on various things I enjoy. If you have any feedback, feel free to send me a message.</Description>
      <List>
        {posts.map(post => (
          <Item key={post.slug}>
            <MetaLine>
              {post.kindLabel} · {post.dateLabel}
            </MetaLine>
            <TitleLink href={`/posts/${post.slug}`}>{post.title}</TitleLink>
            <Quote>{post.quote}</Quote>
          </Item>
        ))}
      </List>
    </StyledContainer>
  );
};

export default PostsClient;
