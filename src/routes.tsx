// filepath: src/routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Posts from './pages/Posts';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import Portfolio from './pages/Portfolio';
import Post from './components/Post';

const AppRoutes: React.FC = () => (
    <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path="/posts/:id" element={<Post />} />
    </Routes>
);

export default AppRoutes;