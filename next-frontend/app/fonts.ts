import localFont from 'next/font/local';

// Baskerville is the site-wide font (set on <html> via globals.css).
// Garamond and Montserrat TTFs live in app/fonts/ if needed later.
export const baskerville = localFont({
  src: [
    { path: './fonts/LibreBaskerville-Regular.ttf', weight: '400' },
    { path: './fonts/LibreBaskerville-Bold.ttf', weight: '700' },
  ],
  variable: '--font-baskerville',
});
