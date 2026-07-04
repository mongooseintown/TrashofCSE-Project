import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Home, Terminal, LayoutDashboard, Sun, Moon, Zap } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark');
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new Event('theme-change'));
  };

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
          <Link to="/compiler" className="nav-link" title="Compiler">
            <Terminal size={24} />
          </Link>
          <Link to="/eee" className="nav-link" title="EEE">
            <Zap size={24} />
          </Link>
          <Link to="/dashboard" className="nav-link" title="Dashboard">
            <LayoutDashboard size={24} />
          </Link>
          <button className="btn-nav-theme-toggle" onClick={toggleTheme} title="Toggle Mode">
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
