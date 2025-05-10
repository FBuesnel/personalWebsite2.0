import { useParams } from 'react-router-dom';
import { posts } from '../posts/posts';
import { useEffect, useState } from 'react';
import formatmd from '../helpers/formatmd';

import { Container } from '../styles/GlobalStyles';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(post => post.id === id);
  const [postContent, setPostContent] = useState<string | null>(null);

  useEffect(() => {
    if (post?.content) {
      fetch(post.content)
        .then((response) => response.text())
        .then((text) => {
          setPostContent(text);
        });
    }
  }, [post]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Container>
      <div>{formatmd(postContent)}</div>
    </Container>
  );
};

export default Post;