import { redirect } from 'next/navigation';
import { prisma } from '../../lib/db';

export const dynamic = 'force-dynamic';

// The footer's resume icon points here: serves the admin-uploaded resume if
// one exists, otherwise the static PDF bundled with the site.
export async function GET() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'resumeUrl' },
  });
  redirect(setting?.value ?? '/Resume.pdf');
}
