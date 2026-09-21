'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { DangerButton, SmallDelete } from './AdminStyles';

// Clean, themed, keyboard-friendly replacement for native confirm() on delete
// actions. First click arms an inline "Delete? yes / no"; Yes calls the server
// action (which revalidates), No cancels. Esc also cancels while armed.

const Wrap = styled.span<{ $push: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  ${({ $push }) => $push && 'margin-left: auto;'}
`;

const Prompt = styled.span`
  color: ${({ theme }) => theme.secondaryText};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const Confirm = styled(DangerButton)`
  align-self: auto;
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  background: ${({ theme }) => theme.danger};
  color: ${({ theme }) => theme.dangerText};

  @media (pointer: coarse) {
    min-height: 40px;
  }
`;

const Cancel = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.secondaryText};
  font-size: ${({ theme }) => theme.fontSize.sm};
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.text};
  }

  @media (pointer: coarse) {
    min-height: 40px;
  }
`;

interface DeleteButtonProps {
  // Server action that takes FormData (e.g. deleteBook, deleteEntry)
  action: (formData: FormData) => void | Promise<void>;
  // Hidden fields the action reads, e.g. { id: book.id }
  fields: Record<string, string>;
  // Compact "x" glyph (for dense rows) vs a full "Delete" button
  compact?: boolean;
  label?: string;
  prompt?: string;
  // Push the control to the right edge of its row (matches old marginLeft:auto)
  push?: boolean;
}

const DeleteButton = ({
  action,
  fields,
  compact = false,
  label = 'Delete',
  prompt = 'Delete?',
  push = true,
}: DeleteButtonProps) => {
  const router = useRouter();
  const [armed, setArmed] = useState(false);
  const [pending, startTransition] = useTransition();

  const run = () => {
    startTransition(async () => {
      const fd = new FormData();
      for (const [key, value] of Object.entries(fields)) fd.append(key, value);
      await action(fd);
      setArmed(false);
      // Ensure the current view reflects the deletion even when the action
      // revalidates a different route than the one we are on.
      router.refresh();
    });
  };

  if (!armed) {
    const Trigger = compact ? SmallDelete : DangerButton;
    return (
      <Trigger
        type="button"
        aria-label={label}
        onClick={() => setArmed(true)}
        style={push && !compact ? { marginLeft: 'auto' } : undefined}
      >
        {compact ? '×' : label}
      </Trigger>
    );
  }

  return (
    <Wrap
      $push={push}
      onKeyDown={e => {
        if (e.key === 'Escape') setArmed(false);
      }}
    >
      <Prompt>{prompt}</Prompt>
      <Confirm type="button" disabled={pending} onClick={run} autoFocus>
        {pending ? '...' : 'Yes'}
      </Confirm>
      <Cancel type="button" onClick={() => setArmed(false)}>
        No
      </Cancel>
    </Wrap>
  );
};

export default DeleteButton;
