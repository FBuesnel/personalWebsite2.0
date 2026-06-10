'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// The hidden door: type "bench" anywhere on the site to reach the login page.
// (A nod to "Places I want to go back to, before I die".)
const SECRET = 'bench';

const SecretLogin = () => {
  const router = useRouter();

  useEffect(() => {
    let buffer = '';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key.length !== 1) return;
      buffer = (buffer + event.key.toLowerCase()).slice(-SECRET.length);
      if (buffer === SECRET) {
        buffer = '';
        router.push('/login');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router]);

  return null;
};

export default SecretLogin;
