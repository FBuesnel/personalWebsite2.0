'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Container, Header } from '../GlobalStyles';

const StyledHeader = styled(Header)`
  color: ${({ theme }) => theme.text};
  font-weight: 400;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Row = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.border};
  object-fit: cover;
  aspect-ratio: 1 / 1;
  object-position: top;

`;

const Description = styled.p`
  margin-left: 20px;
  font-size: 22px;
  color: ${({ theme }) => theme.secondaryText};

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 20px;
    font-size: 18px;
	text-align: left;
  }
`;

const StyledContainer = styled(Container)`
  min-height: 80vh;
  padding-right: 30%;
  @media (max-width: 768px) {
    padding-right: 10%;
  }
`;

const Section = styled.section`
  margin-top: 4.5rem;
`;

const SectionHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;

  &::after {
    content: '';
    display: block;
    width: 48px;
    height: 3px;
    background: ${({ theme }) => theme.accent};
    margin-top: 0.5rem;
  }
`;

const PostRow = styled.div`
  margin-bottom: 1.5em;
  display: flex;
  align-items: center;
`;

const PostLink = styled(Link)`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.3s;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const PostQuote = styled.blockquote`
  font-style: italic;
  color: ${({ theme }) => theme.secondaryText};
  border-left: 3px solid ${({ theme }) => theme.accent};
  padding-left: 1em;
  margin: 0 0 0 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AllPostsLink = styled(Link)`
  color: ${({ theme }) => theme.secondaryText};
  font-style: italic;
  text-decoration: none;
  transition: color 0.3s;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

export interface RecentPost {
  slug: string;
  title: string;
  quote: string;
}

const HomeClient = ({ recentPosts }: { recentPosts: RecentPost[] }) => {
  return (
    <StyledContainer>
      <StyledHeader>
        Software Engineer with a passion for Computer Science and Literature
      </StyledHeader>
      <Row>
        <ProfileImage src="/images/profilePicture.jpg" alt="Me" />
        <Description>
          Hey, I&apos;m Fynn Buesnel. I&apos;m a student at <b>Boston University</b> pursuing a BA in <b>Computer Science</b> and a BA in <b>Economics</b>, currently a Software Engineer Intern at <b>MirrorTab</b> helping build Haven, an AI-powered browser safety layer. I love fashion, volunteering, teaching, and mobile development with React Native. Check out my experiences and projects!
        </Description>
      </Row>
      {recentPosts.length > 0 && (
        <Section>
          <SectionHeading>Recent writing</SectionHeading>
          {recentPosts.map(post => (
            <PostRow key={post.slug}>
              <PostLink href={`/posts/${post.slug}`}>{post.title}</PostLink>
              <PostQuote>{post.quote}</PostQuote>
            </PostRow>
          ))}
          <AllPostsLink href="/posts">All posts →</AllPostsLink>
        </Section>
      )}
    </StyledContainer>
  );
};

export default HomeClient;
