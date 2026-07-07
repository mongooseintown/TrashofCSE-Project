import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import './EEE.css';

const EEESegment07 = () => {
  const navigate = useNavigate();

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          onClick={() => navigate('/eee')} 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1>Segment 07 Portal</h1>
          <p>Explore all topics and previous questions under EEE Segment 07.</p>
        </div>
      </div>

      {/* Under Construction / Lock Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 2rem',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        textAlign: 'center',
        marginTop: '2rem',
        gap: '1.5rem',
      }}>
        <div style={{
          background: 'rgba(235, 94, 40, 0.1)',
          color: '#eb5e28',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(235, 94, 40, 0.2)',
        }}>
          <Lock size={36} />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Segment 07 Portal is Locked
        </h2>
        <p style={{ maxWidth: '450px', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
          Materials for Alternating Current & Circuit Analysis are currently being compiled. They will be unlocked shortly.
        </p>
      </div>
    </div>
  );
};

export default EEESegment07;
