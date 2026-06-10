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
    // New projects go to the end; drag to reposition.
    const last = await prisma.portfolioProject.findFirst({
      orderBy: { sortOrder: 'desc' },
    });
    await prisma.portfolioProject.create({
      data: { ...data, sortOrder: (last?.sortOrder ?? -1) + 1 },
    });
  }
  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
}

export async function reorderPortfolio(ids: string[]) {
  await requireAdmin();
  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.portfolioProject.update({ where: { id }, data: { sortOrder: index } })
    )
  );
  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
}

export async function togglePortfolioPublished(id: string) {
  await requireAdmin();
  const project = await prisma.portfolioProject.findUnique({ where: { id } });
  if (!project) return;
  await prisma.portfolioProject.update({
    where: { id },
    data: { published: !project.published },
  });
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
