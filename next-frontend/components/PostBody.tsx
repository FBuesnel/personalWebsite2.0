'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import styled from 'styled-components';

// :::center / :::right / :::indent container directives -> styled divs.
// The editor toolbar inserts these for alignment, which markdown lacks.
function remarkAlignDirectives() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, (node: any) => {
      if (
        node.type === 'containerDirective' &&
        ['center', 'right', 'indent'].includes(node.name)
      ) {
        node.data = node.data ?? {};
        node.data.hName = 'div';
        node.data.hProperties = { className: [`md-${node.name}`] };
      }
    });
  };
}

// The post's reading surface: real markdown (images, links, lists, quotes)
// rendered into the site's serif voice.
const Body = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.85;
  color: ${({ theme }) => theme.text};

  p {
    margin: 0 0 ${({ theme }) => theme.space[4]} 0;
  }

  em {
    color: ${({ theme }) => theme.secondaryText};
  }

  h1,
  h2 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: bold;
    margin: ${({ theme }) => theme.space[6]} 0 ${({ theme }) => theme.space[3]} 0;
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: bold;
    margin: ${({ theme }) => theme.space[5]} 0 ${({ theme }) => theme.space[3]} 0;
  }

  blockquote {
    font-style: italic;
    color: ${({ theme }) => theme.secondaryText};
    border-left: 4px solid ${({ theme }) => theme.accent};
    padding-left: ${({ theme }) => theme.space[4]};
    margin: ${({ theme }) => theme.space[5]} 0;
  }

  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ul,
  ol {
    margin: 0 0 ${({ theme }) => theme.space[4]} 0;
    padding-left: ${({ theme }) => theme.space[6]};
  }

  li {
    margin-bottom: ${({ theme }) => theme.space[2]};
  }

  hr {
    border: none;
    width: 64px;
    height: 3px;
    background: ${({ theme }) => theme.accent};
    margin: ${({ theme }) => theme.space[8]} auto;
    border-radius: 2px;
  }

  img {
    display: block;
    width: 100%;
    border-radius: 10px;
    margin: ${({ theme }) => theme.space[6]} 0 ${({ theme }) => theme.space[2]} 0;
  }

  .md-center {
    text-align: center;
  }

  .md-right {
    text-align: right;
  }

  .md-indent {
    padding-left: ${({ theme }) => theme.space[6]};
  }
`;

const Caption = styled.span`
  display: block;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-style: italic;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: ${({ theme }) => theme.space[5]};
`;

const PostBody = ({ content }: { content: string }) => {
  return (
    <Body>
      <ReactMarkdown
        // remark-breaks keeps single line breaks as written - essential for poems
        remarkPlugins={[remarkGfm, remarkBreaks, remarkDirective, remarkAlignDirectives]}
        components={{
          // Images: alt text doubles as a caption beneath the photo
          img: ({ src, alt }) => (
            <>
              <img src={typeof src === 'string' ? src : undefined} alt={alt ?? ''} />
              {alt && <Caption>{alt}</Caption>}
            </>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Body>
  );
};

export default PostBody;
