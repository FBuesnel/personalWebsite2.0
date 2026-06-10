'use server';

import { revalidatePath } from 'next/cache';
import { ExperienceSection } from '@prisma/client';
import { prisma } from '../../../lib/db';
import { requireAdmin } from '../../../lib/admin';

function parseEntry(formData: FormData) {
  return {
    title: String(formData.get('title') ?? '').trim(),
    subtitle: String(formData.get('subtitle') ?? '').trim(),
    imageUrl: String(formData.get('imageUrl') ?? '').trim(),
    // One bullet per line in the textarea
    bullets: String(formData.get('bullets') ?? '')
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean),
    section:
      formData.get('section') === 'EDUCATION'
        ? ExperienceSection.EDUCATION
        : ExperienceSection.EXPERIENCE,
    sortOrder: Number(formData.get('sortOrder') ?? 0),
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
    await prisma.experienceEntry.create({ data });
  }
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
