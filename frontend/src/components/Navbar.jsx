import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Sun, Moon, LogOut } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark');
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    setIsLoggedIn(!!(token && storedUser));
  }, [location]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new Event('theme-change'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="glass-nav-container">
      <nav className="glass-nav">
        {/* Left Logo branding */}
        <div className="nav-logo-group" onClick={() => navigate(isLoggedIn ? '/dashboard' : '/')}>
          <div className="nav-logo">
            <img src="/logo.png" alt="Logo" />
          </div>
          <span className="nav-brand-text">TrashofCSE</span>
        </div>
        
        {/* Center Links */}
        <div className="nav-links">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/eee" className="nav-link">EEE</Link>
              <Link to="/compiler" className="nav-link">Compiler</Link>
            </>
          ) : (
            <>
              <a href="/#features" className="nav-link">Features</a>
              <a href="/#achievements" className="nav-link">Benefits</a>
              <a href="/#pricing" className="nav-link">Pricing</a>
              <a href="/#faq" className="nav-link">FAQ</a>
            </>
          )}
          
          <button className="btn-nav-theme-toggle" onClick={toggleTheme} title="Toggle Mode">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Right CTA Button */}
        <div className="nav-actions">
          {isLoggedIn ? (
            <button className="btn-nav-logout" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          ) : (
            <Link to="/login" className="btn-nav-logout" style={{ textDecoration: 'none' }}>
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
