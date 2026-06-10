'use client';

import { useActionState } from 'react';
import styled from 'styled-components';
import { AdminCard, AdminForm, Input, Button, Label, Notice } from './AdminStyles';
import { uploadResume } from '../../app/admin/resume/actions';

const ResumeLink = styled.a`
  color: ${({ theme }) => theme.accent};
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    text-decoration: underline;
  }
`;

const CurrentLine = styled.p`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.secondaryText};
`;

const ResumeAdmin = ({ currentUrl }: { currentUrl: string | null }) => {
  const [message, formAction, pending] = useActionState(uploadResume, undefined);

  return (
    <AdminCard>
      <CurrentLine>
        Current:{' '}
        <ResumeLink href="/resume" target="_blank" rel="noopener noreferrer">
          /resume
        </ResumeLink>
        {currentUrl ? ' (uploaded)' : ' (static fallback)'}
      </CurrentLine>
      <AdminForm action={formAction}>
        <Label>
          New resume (PDF)
          <Input type="file" name="file" accept="application/pdf" required />
        </Label>
        <Button type="submit" disabled={pending}>
          {pending ? 'Uploading...' : 'Upload'}
        </Button>
        {message && <Notice>{message}</Notice>}
      </AdminForm>
    </AdminCard>
  );
};

export default ResumeAdmin;
