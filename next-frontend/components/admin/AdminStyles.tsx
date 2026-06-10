'use client';

import styled from 'styled-components';

export const AdminCard = styled.div`
  background: ${({ theme }) => theme.secondaryBackground};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const AdminForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${({ theme }) => theme.secondaryText};
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const Input = styled.input`
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  outline: none;
  padding: 10px;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
  }
`;

export const TextArea = styled.textarea`
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  outline: none;
  padding: 10px;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
  }
`;

export const Select = styled.select`
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  outline: none;
  padding: 10px;
`;

export const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  align-self: flex-start;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.background};
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
`;

export const DangerButton = styled(Button)`
  &:hover {
    background: #b3403a;
    color: #fff;
  }
`;

export const InlineRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const Notice = styled.p`
  color: ${({ theme }) => theme.accent};
  font-weight: bold;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  margin: 1.5rem 0 1rem 0;
`;

export const Collapsible = styled.details`
  background: ${({ theme }) => theme.secondaryBackground};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;

  summary {
    cursor: pointer;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    font-size: 1.1rem;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.6rem;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: '▸';
      color: ${({ theme }) => theme.accent};
      display: inline-block;
      transition: transform 0.3s ease;
    }
  }

  &[open] summary::before {
    transform: rotate(90deg);
  }

  form {
    margin-top: 1rem;
  }
`;
