// Date keys are YYYY-MM-DD in America/Los_Angeles. Computed via Intl so the
// server's UTC runtime can never shift the day (LUMINA convention).
const PT_FORMAT = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Los_Angeles',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function ptDateKey(date: Date): string {
  return PT_FORMAT.format(date);
}

export function ptToday(): string {
  return ptDateKey(new Date());
}

export function ptLastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    days.push(ptDateKey(new Date(Date.now() - i * 24 * 60 * 60 * 1000)));
  }
  return days;
}
