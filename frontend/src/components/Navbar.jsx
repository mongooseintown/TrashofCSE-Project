import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { getApiUrl } from '../config';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    setIsLoggedIn(!!(token && storedUser));
  }, [location]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(getApiUrl('/api/auth/logout'), {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
      } catch (err) {}
    }
    try { await signOut(auth); } catch (err) {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('profile-update'));
    navigate('/login');
  };

  return (
    <nav className="idraft-nav">
      <div className="idraft-nav-inner">
        <div className="idraft-nav-brand" onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}>
          <img src="/logo.png" alt="Logo" className="idraft-nav-logo" />
          <span className="idraft-nav-name">TrashofCSE</span>
        </div>

        <button className="idraft-nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={`idraft-nav-menu ${isOpen ? 'open' : ''}`}>
          {isLoggedIn && (
            <div className="idraft-nav-links">
              <Link to="/dashboard" className={`idraft-nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
              <Link to="/feed" className={`idraft-nav-link ${location.pathname === '/feed' ? 'active' : ''}`}>Feed</Link>
              <Link to="/profile" className={`idraft-nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
            </div>
          )}

          <div className="idraft-nav-actions">
            {isLoggedIn ? (
              <button className="idraft-nav-logout" onClick={handleLogout}>
                <LogOut size={16} /> Log Out
              </button>
            ) : (
              <Link to="/login" className="idraft-nav-signin">Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
