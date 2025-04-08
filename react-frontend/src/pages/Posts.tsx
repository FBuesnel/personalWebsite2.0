import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { posts } from '../posts/posts';

import { Container, Header, Description } from '../styles/GlobalStyles';

const StyledUL = styled.ul`
  list-style-type: list;
  padding: 0;
  li {
    &:hover {
      color: #514c4a;
      a { color: #514c4a; }
    }
  }
`

const StyledLink = styled(Link)`
  font-size: 16px;
  color: #a4998c;
  cursor: pointer;
`

const StyledContainer = styled(Container)`
  min-height: 80vh;
  padding-right: 30%;
`;

const Posts: React.FC = () => {
  return (
    <StyledContainer>
      <Header>Posts</Header>
      <Description>Here I post lots of different things. This includes stories, poetry, and my thoughts on various things I enjoy. If you have any feedback, feel free to send me a message.</Description>
      <StyledUL>
        {posts.map(post => (
          <li key={post.id}>
            <StyledLink to={`/posts/${post.id}`}>{post.title}</StyledLink>
          </li>
        ))}
      </StyledUL>
    </StyledContainer>
  );
};

export default Posts;