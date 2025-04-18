import { useParams } from 'react-router-dom';
import { posts } from '../posts/posts';
import post1 from '../posts/post1.md';
import { useEffect, useState } from 'react';
import formatmd from '../helpers/formatmd';

import { Container } from '../styles/GlobalStyles';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(post => post.id === id);
  const [postMarkdown, setPostMarkdown] = useState<string | null>(null);

  useEffect(() => {
    fetch(post1)
      .then((response) => response.text())
      .then((text) => {
        // Logs a string of Markdown content.
        // Now you could use e.g. <rexxars/react-markdown> to render it.
        // console.log(text);
        setPostMarkdown(text);
      });
  }, []);

  if (!post) {
    return <div>Post not found</div>;
  }

  console.log(post.content);
  return (
    <Container>
      <div>{formatmd(postMarkdown)}</div>
    </Container>
  );
};

export default Post;