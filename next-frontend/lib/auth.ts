import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { authConfig } from './auth.config';

// Single-admin, Google-only auth. Requires AUTH_GOOGLE_ID/AUTH_GOOGLE_SECRET;
// only the comma-separated Google accounts in ADMIN_EMAILS may sign in -
// every other account is rejected by the signIn callback.

export const googleEnabled = Boolean(
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
);

const allowedAdminEmails = () =>
  (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: googleEnabled ? [Google] : [],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ account, profile }) {
      if (account?.provider !== 'google') return false;
      const email = profile?.email?.toLowerCase();
      return Boolean(email && allowedAdminEmails().includes(email));
    },
  },
});
