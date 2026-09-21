'use client';

import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './AdminStyles';

// Drop-in submit for any <form action={serverAction}>. Reflects the form's
// pending state automatically (disabled + working label) with no per-form
// wiring, so server-action forms get loading feedback for free.
const SubmitButton = ({
  children = 'Save',
  pendingLabel = 'Saving...',
}: {
  children?: ReactNode;
  pendingLabel?: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? pendingLabel : children}
    </Button>
  );
};

export default SubmitButton;
