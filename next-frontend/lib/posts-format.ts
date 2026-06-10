// Deterministic helpers shared by post pages. No locale-dependent formatting
// (Vercel runs in UTC; toLocaleDateString causes hydration mismatches).
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// publishedAt is stored at UTC noon, so UTC date parts are always the
// intended calendar day.
export function formatPostDate(date: Date): string {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

export function readMinutes(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const KIND_LABELS = {
  STORY: 'Story',
  POEM: 'Poem',
  ESSAY: 'Essay',
} as const;

export type PostKindLabel = keyof typeof KIND_LABELS;
