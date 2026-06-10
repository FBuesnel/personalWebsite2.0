'use server';

import { revalidatePath } from 'next/cache';
import { ExperienceSection } from '@prisma/client';
import { prisma } from '../../../lib/db';
import { requireAdmin } from '../../../lib/admin';

function parseEntry(formData: FormData) {
  const companyUrl = String(formData.get('companyUrl') ?? '').trim();
  return {
    title: String(formData.get('title') ?? '').trim(),
    subtitle: String(formData.get('subtitle') ?? '').trim(),
    imageUrl: String(formData.get('imageUrl') ?? '').trim(),
    companyUrl: companyUrl || null,
    // One bullet per line in the textarea
    bullets: String(formData.get('bullets') ?? '')
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean),
    section:
      formData.get('section') === 'EDUCATION'
        ? ExperienceSection.EDUCATION
        : ExperienceSection.EXPERIENCE,
    published: formData.get('published') === 'on',
  };
}

export async function saveExperience(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const data = parseEntry(formData);
  if (!data.title || !data.subtitle) return;

  if (id) {
    await prisma.experienceEntry.update({ where: { id }, data });
  } else {
    // New entries go to the end of their section; drag to reposition.
    const last = await prisma.experienceEntry.findFirst({
      where: { section: data.section },
      orderBy: { sortOrder: 'desc' },
    });
    await prisma.experienceEntry.create({
      data: { ...data, sortOrder: (last?.sortOrder ?? -1) + 1 },
    });
  }
  revalidatePath('/experience');
  revalidatePath('/admin/experience');
}

export async function reorderExperience(ids: string[]) {
  await requireAdmin();
  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.experienceEntry.update({ where: { id }, data: { sortOrder: index } })
    )
  );
  revalidatePath('/experience');
  revalidatePath('/admin/experience');
}

export async function toggleExperiencePublished(id: string) {
  await requireAdmin();
  const entry = await prisma.experienceEntry.findUnique({ where: { id } });
  if (!entry) return;
  await prisma.experienceEntry.update({
    where: { id },
    data: { published: !entry.published },
  });
  revalidatePath('/experience');
  revalidatePath('/admin/experience');
}

export async function deleteExperience(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) return;
  await prisma.experienceEntry.delete({ where: { id } });
  revalidatePath('/experience');
  revalidatePath('/admin/experience');
}
