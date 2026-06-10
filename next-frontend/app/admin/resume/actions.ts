'use server';

import { put } from '@vercel/blob';
import { prisma } from '../../../lib/db';
import { requireAdmin } from '../../../lib/admin';

export async function uploadResume(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireAdmin();

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return 'BLOB_READ_WRITE_TOKEN is not set. Create a Blob store in the Vercel dashboard (Storage tab) and add the token to your env.';
  }

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return 'Please choose a PDF file.';
  }
  if (file.type !== 'application/pdf') {
    return 'The resume must be a PDF.';
  }

  const blob = await put('resume/Resume.pdf', file, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/pdf',
    cacheControlMaxAge: 300,
  });

  await prisma.siteSetting.upsert({
    where: { key: 'resumeUrl' },
    update: { value: blob.url },
    create: { key: 'resumeUrl', value: blob.url },
  });

  return 'Resume updated! The footer link now serves the new file.';
}
