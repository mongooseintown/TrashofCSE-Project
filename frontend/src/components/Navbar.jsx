import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Sun, Moon, LogOut } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Force a theme-change event or logout redirect
    navigate('/');
  };

  return (
    <div className="glass-nav-container">
      <nav className="glass-nav">
        {/* Left Logo branding */}
        <div className="nav-logo-group" onClick={() => navigate('/dashboard')}>
          <div className="nav-logo">
            <img src="/logo.png" alt="Logo" />
          </div>
          <span className="nav-brand-text">TrashofCSE</span>
        </div>
        
        {/* Center Links */}
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/eee" className="nav-link">EEE Portal</Link>
          <Link to="/compiler" className="nav-link">Compiler</Link>
          
          <button className="btn-nav-theme-toggle" onClick={toggleTheme} title="Toggle Mode">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Right CTA Button (Matches the Download button style) */}
        <div className="nav-actions">
          <button className="btn-nav-logout" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
