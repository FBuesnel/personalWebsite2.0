'use client';

import { useActionState } from 'react';
import { AdminCard, AdminForm, Input, Button, Label, Notice } from './AdminStyles';
import { uploadResume } from '../../app/admin/resume/actions';

const ResumeAdmin = ({ currentUrl }: { currentUrl: string | null }) => {
  const [message, formAction, pending] = useActionState(uploadResume, undefined);

  return (
    <AdminCard>
      <p style={{ marginBottom: '1rem' }}>
        Current resume:{' '}
        <a href="/resume" target="_blank" rel="noopener noreferrer">
          /resume
        </a>{' '}
        {currentUrl ? '(uploaded file)' : '(static fallback bundled with the site)'}
      </p>
      <AdminForm action={formAction}>
        <Label>
          New resume (PDF)
          <Input type="file" name="file" accept="application/pdf" required />
        </Label>
        <Button type="submit" disabled={pending}>
          {pending ? 'Uploading...' : 'Upload Resume'}
        </Button>
        {message && <Notice>{message}</Notice>}
      </AdminForm>
    </AdminCard>
  );
};

export default ResumeAdmin;
