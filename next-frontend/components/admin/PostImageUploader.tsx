'use client';

import { useActionState } from 'react';
import { AdminCard, AdminForm, Input, Button, Label, Notice, InlineRow } from './AdminStyles';
import { uploadPostImage } from '../../app/admin/posts/actions';

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
            Upload an image (for the content or as cover)
            <Input type="file" name="file" accept="image/*" required />
          </Label>
          <Button type="submit" disabled={pending}>
            {pending ? 'Uploading...' : 'Upload'}
          </Button>
        </InlineRow>
      </AdminForm>
      {result && !isUrl && <Notice>{result}</Notice>}
      {isUrl && (
        <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Label>
            Paste into content (alt text becomes the caption)
            <Input readOnly value={`![caption](${result})`} onFocus={e => e.currentTarget.select()} />
          </Label>
          <Label>
            Or use as cover image URL
            <Input readOnly value={result} onFocus={e => e.currentTarget.select()} />
          </Label>
        </div>
      )}
    </AdminCard>
  );
};

export default PostImageUploader;
