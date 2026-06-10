'use client';

import { RefObject } from 'react';
import styled from 'styled-components';
import {
  FaBold,
  FaItalic,
  FaHeading,
  FaQuoteRight,
  FaListUl,
  FaLink,
  FaImage,
  FaAlignCenter,
  FaAlignRight,
  FaIndent,
  FaMinus,
} from 'react-icons/fa';

// Sticks just below the frosted site navbar while the long content
// textarea scrolls underneath.
const Bar = styled.div`
  position: sticky;
  top: 80px;
  z-index: 2;
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  padding: 0.5rem;
  background: ${({ theme }) => theme.secondaryBackground};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
`;

const ToolButton = styled.button`
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  padding: 0.45rem 0.6rem;
  color: ${({ theme }) => theme.secondaryText};
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.background};
  }
`;

const Gap = styled.span`
  width: 0.5rem;
`;

interface MarkdownToolbarProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

const MarkdownToolbar = ({ textareaRef }: MarkdownToolbarProps) => {
  const edit = (
    transform: (selected: string) => { text: string; selectStart: number; selectEnd: number }
  ) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: start, selectionEnd: end, value } = ta;
    const selected = value.slice(start, end);
    const { text, selectStart, selectEnd } = transform(selected);
    ta.focus();
    ta.setSelectionRange(start, end);
    // insertText goes through the browser's editing pipeline, so cmd+Z can
    // undo it - assigning ta.value directly would wipe the undo stack.
    const inserted = document.execCommand('insertText', false, text);
    if (!inserted) {
      ta.value = value.slice(0, start) + text + value.slice(end);
    }
    ta.setSelectionRange(start + selectStart, start + selectEnd);
  };

  const surround = (before: string, after = before, placeholder = 'text') =>
    edit(selected => {
      const inner = selected || placeholder;
      return {
        text: before + inner + after,
        selectStart: before.length,
        selectEnd: before.length + inner.length,
      };
    });

  const prefixLines = (prefix: string) =>
    edit(selected => {
      const inner = selected || 'text';
      const text = inner
        .split('\n')
        .map(line => prefix + line)
        .join('\n');
      return { text, selectStart: 0, selectEnd: text.length };
    });

  const block = (name: string) =>
    edit(selected => {
      const inner = selected || 'text';
      const text = `:::${name}\n${inner}\n:::\n`;
      return {
        text,
        selectStart: name.length + 4,
        selectEnd: name.length + 4 + inner.length,
      };
    });

  const insert = (text: string, selectStart: number, selectEnd: number) =>
    edit(() => ({ text, selectStart, selectEnd }));

  return (
    <Bar>
      <ToolButton type="button" title="Bold" onClick={() => surround('**')}>
        <FaBold />
      </ToolButton>
      <ToolButton type="button" title="Italic" onClick={() => surround('*')}>
        <FaItalic />
      </ToolButton>
      <ToolButton type="button" title="Heading" onClick={() => prefixLines('## ')}>
        <FaHeading />
      </ToolButton>
      <Gap />
      <ToolButton type="button" title="Quote" onClick={() => prefixLines('> ')}>
        <FaQuoteRight />
      </ToolButton>
      <ToolButton type="button" title="List" onClick={() => prefixLines('- ')}>
        <FaListUl />
      </ToolButton>
      <ToolButton type="button" title="Indent" onClick={() => block('indent')}>
        <FaIndent />
      </ToolButton>
      <Gap />
      <ToolButton type="button" title="Center" onClick={() => block('center')}>
        <FaAlignCenter />
      </ToolButton>
      <ToolButton type="button" title="Align right" onClick={() => block('right')}>
        <FaAlignRight />
      </ToolButton>
      <Gap />
      <ToolButton
        type="button"
        title="Link"
        onClick={() => insert('[text](https://)', 1, 5)}
      >
        <FaLink />
      </ToolButton>
      <ToolButton
        type="button"
        title="Image (alt text becomes the caption)"
        onClick={() => insert('![caption](https://)', 2, 9)}
      >
        <FaImage />
      </ToolButton>
      <ToolButton
        type="button"
        title="Divider"
        onClick={() => insert('\n---\n', 1, 4)}
      >
        <FaMinus />
      </ToolButton>
    </Bar>
  );
};

export default MarkdownToolbar;
