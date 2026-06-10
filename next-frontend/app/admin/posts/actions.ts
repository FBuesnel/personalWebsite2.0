'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { put } from '@vercel/blob';
import { PostKind } from '@prisma/client';
import { prisma } from '../../../lib/db';
import { requireAdmin } from '../../../lib/admin';

export async function savePost(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const slug = String(formData.get('slug') ?? '').trim().toLowerCase();
  const title = String(formData.get('title') ?? '').trim();
  const quote = String(formData.get('quote') ?? '').trim();
  const content = String(formData.get('content') ?? '');
  const published = formData.get('published') === 'on';
  const kindRaw = String(formData.get('kind') ?? '');
  const kind = (Object.values(PostKind) as string[]).includes(kindRaw)
    ? (kindRaw as PostKind)
    : PostKind.ESSAY;
  const coverImageRaw = String(formData.get('coverImage') ?? '').trim();
  const coverImage = coverImageRaw || null;
  // Stored at UTC noon so the calendar day never shifts with timezones
  const publishedAtRaw = String(formData.get('publishedAt') ?? '').trim();
  const publishedAt = /^\d{4}-\d{2}-\d{2}$/.test(publishedAtRaw)
    ? new Date(`${publishedAtRaw}T12:00:00Z`)
    : undefined;

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return 'Slug must be lowercase letters, numbers, and hyphens only.';
  }
  if (!title || !content) {
    return 'Title and content are required.';
  }

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing && existing.id !== id) {
    return `Slug "${slug}" is already used by another post.`;
  }

  const data = {
    slug,
    title,
    quote,
    content,
    published,
    kind,
    coverImage,
    ...(publishedAt ? { publishedAt } : {}),
  };
  let oldSlug: string | undefined;
  if (id) {
    const current = await prisma.post.findUnique({ where: { id } });
    oldSlug = current?.slug;
    await prisma.post.update({ where: { id }, data });
  } else {
    await prisma.post.create({ data });
  }

  revalidatePath('/');
  revalidatePath('/posts');
  revalidatePath(`/posts/${slug}`);
  if (oldSlug && oldSlug !== slug) revalidatePath(`/posts/${oldSlug}`);
  revalidatePath('/sitemap.xml');
  revalidatePath('/admin/posts');
  redirect('/admin/posts');
}

export async function uploadPostImage(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireAdmin();

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return 'BLOB_READ_WRITE_TOKEN is not set - connect the Blob store in Vercel.';
  }

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return 'Choose an image file.';
  }
  if (!file.type.startsWith('image/')) {
    return 'The file must be an image.';
  }

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, '-');
  const blob = await put(`posts/${Date.now()}-${safeName}`, file, {
    access: 'public',
    contentType: file.type,
  });
  return blob.url;
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) return;
  const post = await prisma.post.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/posts');
  revalidatePath(`/posts/${post.slug}`);
  revalidatePath('/sitemap.xml');
  revalidatePath('/admin/posts');
}
