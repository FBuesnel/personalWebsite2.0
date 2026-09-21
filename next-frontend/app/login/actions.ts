'use server';

import { AuthError } from 'next-auth';
import { googleEnabled, signIn } from '../../lib/auth';
import { loginErrorMessage } from '../../lib/login-errors';

export async function googleLogin(): Promise<string | undefined> {
  if (!googleEnabled) return 'Google sign-in is not configured.';

  try {
    await signIn('google', { redirectTo: '/admin/experience' });
  } catch (error) {
    if (error instanceof AuthError) return loginErrorMessage(error.type);
    // A successful sign-in throws Next.js's redirect; let it reach the browser.
    throw error;
  }
}
