import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, ShieldAlert } from 'lucide-react';
import './Dashboard.css';

import { getApiUrl } from '../config';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

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
    window.dispatchEvent(new Event('profile-update'));
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Main Center Message Box */}
      <div className="dashboard-card">
        {/* Visual Animated Gear Icon Container */}
        <div className="gear-icon-container">
          <Settings 
            size={40} 
            className="spinning-gear-animation"
            style={{
              animation: 'spin 4s linear infinite'
            }}
          />
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>

        <h1 className="dashboard-title">
          Dashboard Workspace
        </h1>

        <div className="dev-mode-badge">
          <ShieldAlert size={16} />
          DEVELOPMENT MODE ACTIVE
        </div>

        <p className="dashboard-description">
          Our CSE analytics panels, visualization workspaces, and study maps are currently under constructor optimization. Check back soon for full feature rollout.
        </p>

        {/* User Card Actions & Logout Info (Inside Card) */}
        <div className="dashboard-actions">
          {user && (
            <span className="signed-in-text">
              Signed in as: <strong>{user.fullName}</strong>
            </span>
          )}
          
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={16} />
            Log Out Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
