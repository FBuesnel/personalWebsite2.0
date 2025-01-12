import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Index from './pages/Index';
import Posts from './pages/Posts';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import Portfolio from './pages/Portfolio';

import Post from './components/Post';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/Contact' element={<Contact />} />
                <Route path='/Posts' element={<Posts />} />
                <Route path='/Experience' element={<Experience />} />
                <Route path='/Portfolio' element={<Portfolio />} />
                <Route path="/posts/:id" element={<Post />} />
            </Routes>
        </Router>
    );
}
 
export default App;