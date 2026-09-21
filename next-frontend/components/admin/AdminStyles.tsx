'use client';

import styled from 'styled-components';
import Link from 'next/link';

export const AdminCard = styled.div<{ $interactive?: boolean }>`
  background: ${({ theme }) => theme.secondaryBackground};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space[5]};
  margin-bottom: ${({ theme }) => theme.space[5]};
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease,
    transform 0.3s ease;

  ${({ $interactive, theme }) =>
    $interactive &&
    `
    cursor: pointer;
    &:hover {
      border-color: ${theme.accent};
      box-shadow: 0 4px 18px ${theme.shadow};
      transform: translateY(-2px);
    }
  `}
`;

export const AdminForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: bold;
  color: ${({ theme }) => theme.secondaryText};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
`;

export const Input = styled.input`
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontSize.base};
  outline: none;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};

  &:focus {
    border-color: ${({ theme }) => theme.accent};
  }

  /* Only flags after the user has interacted, never on first paint */
  &:user-invalid {
    border-color: ${({ theme }) => theme.danger};
  }

  @media (pointer: coarse) {
    min-height: 44px;
  }
`;

export const TextArea = styled.textarea`
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontSize.base};
  outline: none;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
  }

  /* Manual resize is awkward on touch; let rows drive height there */
  @media (pointer: coarse) {
    resize: none;
  }
`;

export const Select = styled.select`
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontSize.base};
  outline: none;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};

  &:focus {
    border-color: ${({ theme }) => theme.accent};
  }

  @media (pointer: coarse) {
    min-height: 44px;
  }
`;

export const Button = styled.button`
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[5]};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;
  align-self: flex-start;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.background};
  }

  &:disabled {
    opacity: 0.55;
    pointer-events: none;
    cursor: default;
  }

  @media (pointer: coarse) {
    min-height: 44px;
  }
`;

// Ghost button for non-primary, non-destructive actions (Edit, Cancel, Add)
export const SecondaryButton = styled(Button)`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  padding: calc(${({ theme }) => theme.space[3]} - 2px) calc(${({ theme }) => theme.space[5]} - 2px);

  &:hover {
    background: transparent;
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }
`;

export const DangerButton = styled(Button)`
  &:hover {
    background: ${({ theme }) => theme.danger};
    color: ${({ theme }) => theme.dangerText};
  }
`;

// Compact row delete; expands to a comfortable hit area on touch screens
export const SmallDelete = styled(DangerButton)`
  margin-left: auto;
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSize.xs};

  @media (pointer: coarse) {
    min-height: 40px;
    min-width: 44px;
  }
`;

// Shared icon-only control (eye toggles, etc.) with a comfortable hit area
export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1;
  padding: ${({ theme }) => theme.space[1]};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.secondaryText};
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }

  @media (pointer: coarse) {
    min-height: 44px;
    min-width: 44px;
  }
`;

export const BackLink = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.secondaryText};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.space[3]};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

export const InlineRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  align-items: center;
  flex-wrap: wrap;
`;

export const Notice = styled.p`
  color: ${({ theme }) => theme.accent};
  font-weight: bold;
  margin: ${({ theme }) => theme.space[3]} 0 0 0;
`;

export const EmptyState = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  font-style: italic;
  margin: ${({ theme }) => theme.space[4]} 0;
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.text};
  margin: ${({ theme }) => theme.space[6]} 0 ${({ theme }) => theme.space[4]} 0;
`;

export const Collapsible = styled.details`
  background: ${({ theme }) => theme.secondaryBackground};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[5]};
  margin-bottom: ${({ theme }) => theme.space[4]};

  summary {
    cursor: pointer;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    font-size: ${({ theme }) => theme.fontSize.md};
    list-style: none;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[2]};
    transition: color 0.2s ease;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: '▸';
      color: ${({ theme }) => theme.accent};
      display: inline-block;
      transition: transform 0.3s ease;
    }

    &:hover {
      color: ${({ theme }) => theme.accent};
    }
  }

  &[open] summary::before {
    transform: rotate(90deg);
  }

  form {
    margin-top: ${({ theme }) => theme.space[4]};
  }
`;
