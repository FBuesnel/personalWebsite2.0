'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/db';
import { requireAdmin } from '../../../lib/admin';

function parseProject(formData: FormData) {
  const githubUrl = String(formData.get('githubUrl') ?? '').trim();
  const websiteUrl = String(formData.get('websiteUrl') ?? '').trim();
  return {
    title: String(formData.get('title') ?? '').trim(),
    subtitle: String(formData.get('subtitle') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    imageUrl: String(formData.get('imageUrl') ?? '').trim(),
    githubUrl: githubUrl || null,
    websiteUrl: websiteUrl || null,
    sortOrder: Number(formData.get('sortOrder') ?? 0),
    published: formData.get('published') === 'on',
  };
}

export async function savePortfolioProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const data = parseProject(formData);
  if (!data.title || !data.description) return;

  if (id) {
    await prisma.portfolioProject.update({ where: { id }, data });
  } else {
    await prisma.portfolioProject.create({ data });
  }
  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
}

export async function deletePortfolioProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) return;
  await prisma.portfolioProject.delete({ where: { id } });
  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
}
