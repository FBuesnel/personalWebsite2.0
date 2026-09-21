'use client';

import { useActionState } from 'react';
import styled from 'styled-components';
import { AdminCard, AdminForm, Input, Button, Label, Notice, InlineRow } from './AdminStyles';
import { uploadPostImage } from '../../app/admin/posts/actions';

const Outputs = styled.div`
  margin-top: ${({ theme }) => theme.space[3]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

// Uploads a photo to Blob storage and hands back ready-to-paste markdown.
// The alt text renders as a caption under the image on the post page.
const PostImageUploader = () => {
  const [result, formAction, pending] = useActionState(uploadPostImage, undefined);
  const isUrl = result?.startsWith('http');

  return (
    <AdminCard>
      <AdminForm action={formAction}>
        <InlineRow>
          <Label>
            Image upload
            <Input type="file" name="file" accept="image/*" required />
          </Label>
          <Button type="submit" disabled={pending}>
            {pending ? 'Uploading...' : 'Upload'}
          </Button>
        </InlineRow>
      </AdminForm>
      {result && !isUrl && <Notice>{result}</Notice>}
      {isUrl && (
        <Outputs>
          <Label>
            Content markdown (alt text becomes the caption)
            <Input readOnly value={`![caption](${result})`} onFocus={e => e.currentTarget.select()} />
          </Label>
          <Label>
            Cover URL
            <Input readOnly value={result} onFocus={e => e.currentTarget.select()} />
          </Label>
        </Outputs>
      )}
    </AdminCard>
  );
};

export default PostImageUploader;
