import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { posts } from '../posts/posts';

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

const Posts: React.FC = () => {
  return (
    <div className="container">
      <div className="experienceHeader"><b>Posts</b></div>
      <div className="text-xl pb-5 text-dark-grey">Here I post lots of different things. There includes stories, poetry, and my thoughts on various things I enjoy. If you have any feedback, feel free to send me a message.</div>
      <StyledUL>
        {posts.map(post => (
          <li key={post.id}>
            <StyledLink to={`/posts/${post.id}`}>{post.title}</StyledLink>
          </li>
        ))}
      </StyledUL>
    </div>
  );
};

export default Posts;