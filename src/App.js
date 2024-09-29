// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Your Home component
import Store from './pages/Store'; // Your Store component
import AboutUs from './pages/AboutUs'; // Your About Us component
import Footer from './components/Footer'; // Import the Footer component
import AmorphousChat from './AmorphousChat';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <Footer />
        <AmorphousChat/>
      </div>
    </Router>
  );
};

export default App;
