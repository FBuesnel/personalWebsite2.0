// The actual palette values live in app/globals.css as CSS custom properties
// keyed by html[data-theme]. styled-components receive these var() references,
// so theme switching is pure CSS - no flash, no re-render, pages stay static.
export const cssVarTheme = {
    background: 'var(--background)',
    secondaryBackground: 'var(--secondary-background)',
    text: 'var(--text)',
    accent: 'var(--accent)',
    secondaryText: 'var(--secondary-text)',
    border: 'var(--border)',
    shadow: 'var(--shadow)',
};

export type AppTheme = typeof cssVarTheme;
