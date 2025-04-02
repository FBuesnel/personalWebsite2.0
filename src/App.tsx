import React from 'react';
import { Analytics } from "@vercel/analytics/react"

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';

function App() {
    return (
        <Router>
            <Navbar />
            <AppRoutes />
            <Footer />
            <Analytics />
        </Router>
    );
}

export default App;