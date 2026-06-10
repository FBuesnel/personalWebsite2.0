'use client';

import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { SessionProvider } from 'next-auth/react';
import { cssVarTheme } from '../lib/theme';
import Navbar from './Navbar';
import Footer from './Footer';
import SecretLogin from './SecretLogin';

const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

// Colors come from CSS variables keyed by html[data-theme] (set pre-paint in
// layout.tsx), so this state only drives the toggle icon.
const ThemeShell = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    setIsDarkMode(document.documentElement.dataset.theme !== 'light');
  }, []);

  const toggleTheme = () => {
    const next = isDarkMode ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SessionProvider>
      <ThemeProvider theme={cssVarTheme}>
        <AppWrapper>
          <SecretLogin />
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          {children}
          <Footer />
        </AppWrapper>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default ThemeShell;
