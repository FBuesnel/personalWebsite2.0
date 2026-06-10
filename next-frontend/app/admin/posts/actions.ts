'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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

  const data = { slug, title, quote, content, published };
  let oldSlug: string | undefined;
  if (id) {
    const current = await prisma.post.findUnique({ where: { id } });
    oldSlug = current?.slug;
    await prisma.post.update({ where: { id }, data });
  } else {
    await prisma.post.create({ data });
  }

  revalidatePath('/posts');
  revalidatePath(`/posts/${slug}`);
  if (oldSlug && oldSlug !== slug) revalidatePath(`/posts/${oldSlug}`);
  revalidatePath('/sitemap.xml');
  revalidatePath('/admin/posts');
  redirect('/admin/posts');
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) return;
  const post = await prisma.post.delete({ where: { id } });
  revalidatePath('/posts');
  revalidatePath(`/posts/${post.slug}`);
  revalidatePath('/sitemap.xml');
  revalidatePath('/admin/posts');
}
