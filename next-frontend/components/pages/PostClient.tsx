'use client';

import styled from 'styled-components';
import Link from 'next/link';
import PostBody from '../PostBody';
import { Container } from '../GlobalStyles';

const Article = styled.article`
  max-width: 680px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space[6]} 0 ${({ theme }) => theme.space[8]} 0;
`;

const MetaLine = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: bold;
  letter-spacing: -0.015em;
  color: ${({ theme }) => theme.text};
  margin-bottom: ${({ theme }) => theme.space[5]};
`;

const Cover = styled.img`
  display: block;
  width: 100%;
  border-radius: 10px;
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const Divider = styled.div`
  width: 64px;
  height: 3px;
  border-radius: 2px;
  background: ${({ theme }) => theme.accent};
  margin: ${({ theme }) => theme.space[8]} 0 ${({ theme }) => theme.space[5]} 0;
`;

const BackLink = styled(Link)`
  font-style: italic;
  color: ${({ theme }) => theme.secondaryText};
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

export interface PostViewData {
  title: string;
  kindLabel: string;
  dateLabel: string;
  readMins: number;
  showReadTime: boolean;
  coverImage: string | null;
  content: string;
}

const PostClient = ({ post }: { post: PostViewData }) => {
  return (
    <Container>
      <Article>
        <MetaLine>
          {post.kindLabel} · {post.dateLabel}
          {post.showReadTime && ` · ${post.readMins} min read`}
        </MetaLine>
        <Title>{post.title}</Title>
        {post.coverImage && <Cover src={post.coverImage} alt="" />}
        <PostBody content={post.content} />
        <Divider />
        <BackLink href="/posts">← All posts</BackLink>
      </Article>
    </Container>
  );
};

export default PostClient;
