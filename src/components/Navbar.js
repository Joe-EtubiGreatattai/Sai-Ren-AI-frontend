// src/components/Navbar.js

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="logo">
        <h1 className="animated-logo">Ludin Store</h1>
      </div>
      <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={toggleMenu}>Home</Link>
        </li>
        <li>
          <Link to="/store" className={location.pathname === '/store' ? 'active' : ''} onClick={toggleMenu}>Store</Link>
        </li>
        <li>
          <Link to="/about-us" className={location.pathname === '/about-us' ? 'active' : ''} onClick={toggleMenu}>About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
