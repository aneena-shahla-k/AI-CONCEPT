import './App.css';
import React from "react";
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import About from './pages/About';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;