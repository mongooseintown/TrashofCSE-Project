import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="glass-nav-container">
      <nav className="glass-nav">
        {/* Left Logo */}
        <div className="nav-logo">
          <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.4)' }} />
        </div>
        
        {/* Center Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/compilersegment-04" className="nav-link">Compiler</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </div>
        
        {/* Right Hamburger Menu Icon Placeholder */}
        <button className="nav-menu-btn" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
