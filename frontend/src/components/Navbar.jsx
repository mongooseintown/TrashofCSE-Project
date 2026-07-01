import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Home, Terminal, LogIn, Cpu } from 'lucide-react';

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
          <Link to="/" className="nav-link" title="Home">
            <Home size={24} />
          </Link>
          <Link to="/compilersegment-04" className="nav-link" title="Compiler Segment 04">
            <Terminal size={24} />
          </Link>
          <Link to="/compilersegment-08" className="nav-link" title="Compiler Segment 08">
            <Cpu size={24} />
          </Link>
          <Link to="/login" className="nav-link" title="Login">
            <LogIn size={24} />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
