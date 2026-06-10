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
    // Type + spacing scales (defined in globals.css). Use these instead of
    // hardcoded px/rem so sizes stay consistent site-wide.
    fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
    },
    space: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        12: 'var(--space-12)',
    },
};

export type AppTheme = typeof cssVarTheme;
