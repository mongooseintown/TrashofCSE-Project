import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Sun, Moon, LogOut, Menu, X } from 'lucide-react';
import NotificationPanel from './NotificationPanel';

import { getApiUrl } from '../config';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new Event('theme-change'));
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(getApiUrl('/api/auth/logout'), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (err) {
        console.error('Logout request failed:', err);
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('profile-update'));
    navigate('/');
  };

  return (
    <div className={`glass-nav-container ${isOpen ? 'is-nav-open' : ''}`}>
      <nav className={`glass-nav ${isOpen ? 'is-open' : ''}`}>
        
        {/* Top Row: Brand & Mobile Menu Trigger */}
        <div className="nav-top-row">
          <div className="nav-logo-group" onClick={() => navigate('/')}>
            <div className="nav-logo">
              <img src="/logo.png" alt="Logo" />
            </div>
            <span className="nav-brand-text">TrashofCSE</span>
          </div>

          <button className="nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        
        {/* Unfolding Menu Content */}
        <div className="nav-menu-content">
          {/* Center Links */}
          <div className="nav-links">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/feed" className="nav-link">Feed</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
              </>
            ) : (
              <>
                <a href="/#features" className="nav-link">Features</a>
                <a href="/#achievements" className="nav-link">Benefits</a>
                <a href="/#pricing" className="nav-link">Pricing</a>
                <a href="/#faq" className="nav-link">FAQ</a>
              </>
            )}

            {isLoggedIn && <NotificationPanel />}
            
            <button className="btn-nav-theme-toggle" onClick={toggleTheme} title="Toggle Mode">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span className="theme-toggle-text-mobile">Toggle Theme</span>
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
        </div>

      </nav>
    </div>
  );
};

export default Navbar;
