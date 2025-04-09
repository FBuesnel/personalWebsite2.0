import React, { useState } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './constants/theme';
import { SpeedInsights } from "@vercel/speed-insights/react";
import styled from 'styled-components';

import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';

// Styled wrapper for the entire app
const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <AppWrapper>
                <Router>
                    <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                    <AppRoutes />
                    <Footer />
                    <Analytics />
                    <SpeedInsights />
                </Router>
            </AppWrapper>
        </ThemeProvider>
    );
}

export default App;