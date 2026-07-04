import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, ShieldAlert } from 'lucide-react';

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0b0c0e',
      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1.2px, transparent 1.2px)',
      backgroundSize: '20px 20px',
      color: '#ffffff',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      padding: '2rem',
      position: 'relative'
    }}>
      {/* Top Header Actions */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        {user && (
          <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
            Signed in as: <strong style={{ color: '#ffffff' }}>{user.fullName}</strong>
          </span>
        )}
        <button 
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#ff5555',
            padding: '0.6rem 1.2rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 85, 85, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 85, 85, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>

      {/* Main Center Message Box */}
      <div style={{
        maxWidth: '550px',
        textAlign: 'center',
        background: '#131417',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '28px',
        padding: '3.5rem 2.5rem',
        boxShadow: '0 40px 80px -15px rgba(0, 0, 0, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        {/* Visual Animated Gear Icon Container */}
        <div style={{
          position: 'relative',
          width: '80px',
          height: '80px',
          background: 'rgba(255, 91, 34, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#ff5b22',
          marginBottom: '1rem'
        }}>
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

        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 700,
          letterSpacing: '-0.5px',
          margin: 0,
          background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Dashboard Workspace
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 179, 0, 0.06)',
          border: '1px solid rgba(255, 179, 0, 0.15)',
          padding: '0.6rem 1.2rem',
          borderRadius: '12px',
          color: '#ffb300',
          fontSize: '0.85rem',
          fontWeight: 600
        }}>
          <ShieldAlert size={16} />
          DEVELOPMENT MODE ACTIVE
        </div>

        <p style={{
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '1rem',
          lineHeight: '1.7',
          margin: '0.5rem 0 0 0',
          fontWeight: 300
        }}>
          Our core CSE analytics panels, visualization workspaces, and study maps are currently under constructor optimization. Check back soon for full feature rollout.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
