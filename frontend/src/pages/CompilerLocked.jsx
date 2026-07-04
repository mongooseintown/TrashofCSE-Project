import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, ArrowRight, Zap, LayoutDashboard } from 'lucide-react';

const CompilerLocked = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0b0c0e',
      backgroundImage: 'radial-gradient(rgba(255, 91, 34, 0.03) 1.2px, transparent 1.2px)',
      backgroundSize: '20px 20px',
      color: '#ffffff',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      padding: '2rem'
    }}>
      {/* Locked Alert Box */}
      <div style={{
        maxWidth: '550px',
        textAlign: 'center',
        background: '#131417',
        border: '1px solid rgba(255, 91, 34, 0.15)',
        borderRadius: '28px',
        padding: '3.5rem 2.5rem',
        boxShadow: '0 40px 80px -15px rgba(255, 91, 34, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        position: 'relative'
      }}>
        {/* Glow Ring behind lock */}
        <div style={{
          position: 'absolute',
          top: '3.5rem',
          width: '80px',
          height: '80px',
          background: 'rgba(255, 91, 34, 0.15)',
          filter: 'blur(20px)',
          borderRadius: '50%',
          zIndex: 0
        }} />

        {/* Lock Icon Container */}
        <div style={{
          position: 'relative',
          width: '80px',
          height: '80px',
          background: 'rgba(255, 91, 34, 0.1)',
          border: '1px solid rgba(255, 91, 34, 0.3)',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#ff5b22',
          marginBottom: '1rem',
          zIndex: 1
        }}>
          <Lock size={36} />
        </div>

        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 700,
          letterSpacing: '-0.5px',
          margin: 0,
          background: 'linear-gradient(135deg, #ffffff 0%, #ff5b22 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Portal Restricted
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 85, 85, 0.06)',
          border: '1px solid rgba(255, 85, 85, 0.15)',
          padding: '0.6rem 1.2rem',
          borderRadius: '12px',
          color: '#ff5555',
          fontSize: '0.85rem',
          fontWeight: 600
        }}>
          <ShieldAlert size={16} />
          ADMINISTRATOR ACCESS ONLY
        </div>

        <p style={{
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '1rem',
          lineHeight: '1.7',
          margin: '0.5rem 0 0 0',
          fontWeight: 300
        }}>
          Access to the Compiler Portal is restricted to the administrator account. Regular student profiles are permitted to explore the EEE segment and dashboard resource guides.
        </p>

        {/* Action CTAs */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          <button 
            onClick={() => navigate('/eee')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              background: 'linear-gradient(135deg, #ff5b22 0%, #ff3b00 100%)',
              border: 'none',
              borderRadius: '14px',
              color: '#ffffff',
              padding: '0.9rem 1.8rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255, 91, 34, 0.25)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 91, 34, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 91, 34, 0.25)';
            }}
          >
            <Zap size={18} />
            Explore EEE Portal
            <ArrowRight size={16} />
          </button>

          <button 
            onClick={() => navigate('/dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              color: '#ffffff',
              padding: '0.8rem 1.8rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            <LayoutDashboard size={18} />
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompilerLocked;
