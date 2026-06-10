import { auth } from './auth';

// Server actions are directly POST-able regardless of the route proxy, so
// every admin action must call this first (defense in depth).
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  return session;
}
