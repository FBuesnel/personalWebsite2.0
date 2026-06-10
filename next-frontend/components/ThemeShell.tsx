'use client';

import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../lib/theme';
import Navbar from './Navbar';
import Footer from './Footer';
import SecretLogin from './SecretLogin';

const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// The server always renders dark (the default); a stored light preference is
// applied after mount since localStorage doesn't exist during SSR.
const ThemeShell = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppWrapper>
        <SecretLogin />
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        {children}
        <Footer />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default ThemeShell;
