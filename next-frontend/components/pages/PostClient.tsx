'use client';

import formatmd from '../formatmd';
import { Container } from '../GlobalStyles';

const PostClient = ({ text }: { text: string }) => {
  return (
    <Container>
      <div>{formatmd(text)}</div>
    </Container>
  );
};

export default PostClient;
