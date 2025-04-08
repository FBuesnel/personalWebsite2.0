import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';
import { posts } from '../posts/posts';

import { Container } from '../styles/GlobalStyles';
import styled from 'styled-components';

const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 2.5rem;
  font-weight: 600;
`;

const StyledP = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1.2rem;
`;

const CustomH1: React.FC = (props) => <StyledH1 {...props} />;
const CustomP: React.FC = (props) => <StyledP {...props} />;

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(post => post.id === id);
  const [content, setContent] = React.useState('');

  useEffect(() => {
    if (post) {
      fetch(post.content)
        .then(response => response.text())
        .then(text => setContent(text));
    }
  }, [post]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Container>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: CustomH1,
          p: CustomP,
          // Add more elements as needed
        }}
      >
        {content}
      </ReactMarkdown>
    </Container>
  );
};

export default Post;