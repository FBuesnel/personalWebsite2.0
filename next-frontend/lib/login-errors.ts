export function loginErrorMessage(error?: string): string | undefined {
  if (!error) return undefined;
  if (error === 'AccessDenied') {
    return 'This Google account does not have admin access. Try your authorized account.';
  }
  if (error === 'Configuration') {
    return 'Sign-in is unavailable because of a server configuration error.';
  }
  return 'Google sign-in could not be completed. Please try again.';
}
