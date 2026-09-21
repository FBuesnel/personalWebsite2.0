'use client';

import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// Lightweight optimistic-success feedback. Call flash() after a mutation
// resolves; render <SavedNote> while `saved` is true. Auto-dismisses, and the
// fade is disabled under prefers-reduced-motion by the global rule.

export function useSavedFlash(ms = 1600) {
  const [saved, setSaved] = useState(false);

  const flash = useCallback(() => {
    setSaved(false);
    // next tick so the element re-mounts and the animation replays
    requestAnimationFrame(() => setSaved(true));
  }, []);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), ms);
    return () => clearTimeout(t);
  }, [saved, ms]);

  return [saved, flash] as const;
}

const fadeOut = `
  @keyframes saved-note-out {
    0% { opacity: 1; }
    70% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

export const SavedNote = styled.span`
  ${fadeOut}
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.accent};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  animation: saved-note-out 1.6s ease forwards;
`;
