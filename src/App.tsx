import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Index from './pages/Index';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import Portfolio from './pages/Portfolio';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/Contact' element={<Contact />} />
                <Route path='/Blogs' element={<Blogs />} />
                <Route path='/Experience' element={<Experience />} />
                <Route path='/Portfolio' element={<Portfolio />} />
            </Routes>
        </Router>
    );
}
 
export default App;