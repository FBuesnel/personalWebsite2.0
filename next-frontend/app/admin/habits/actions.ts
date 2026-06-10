'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../../../lib/db';
import { requireAdmin } from '../../../lib/admin';

export async function toggleHabitLog(habitId: string, date: string) {
  await requireAdmin();
  const existing = await prisma.habitLog.findUnique({
    where: { habitId_date: { habitId, date } },
  });
  if (existing) {
    await prisma.habitLog.delete({ where: { id: existing.id } });
  } else {
    await prisma.habitLog.create({ data: { habitId, date, done: true } });
  }
  revalidatePath('/admin');
  revalidatePath('/admin/habits');
}

export async function createHabit(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get('name') ?? '').trim();
  if (!name) return;
  const last = await prisma.habit.findFirst({ orderBy: { sortOrder: 'desc' } });
  await prisma.habit.create({
    data: { name, sortOrder: (last?.sortOrder ?? -1) + 1 },
  });
  revalidatePath('/admin');
  revalidatePath('/admin/habits');
}

export async function updateHabit(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const name = String(formData.get('name') ?? '').trim();
  const active = formData.get('active') === 'on';
  if (!id || !name) return;
  await prisma.habit.update({ where: { id }, data: { name, active } });
  revalidatePath('/admin');
  revalidatePath('/admin/habits');
}

export async function deleteHabit(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) return;
  await prisma.habit.delete({ where: { id } });
  revalidatePath('/admin');
  revalidatePath('/admin/habits');
}
