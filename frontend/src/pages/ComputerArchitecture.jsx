import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, ShieldAlert } from 'lucide-react';
import './EEE.css';

const ComputerArchitecture = () => {
  const navigate = useNavigate();

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header">
        <h1>Computer Architecture</h1>
        <p>CSE-3523 · Study materials, notes, and resources for Computer Architecture.</p>
      </div>

      {/* Under Construction Card */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        gap: '1.2rem',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: '3rem 2.5rem',
          maxWidth: '500px',
          width: '100%',
        }}>
          <Settings 
            size={40} 
            style={{ 
              color: 'rgba(255,255,255,0.4)', 
              marginBottom: '1rem',
              animation: 'spin 4s linear infinite' 
            }} 
          />
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: '20px',
            padding: '0.3rem 0.8rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#8b5cf6',
            marginBottom: '1rem',
          }}>
            <ShieldAlert size={12} />
            COMING SOON
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.6rem' }}>
            Under Construction
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Study cards and lecture notes for Computer Architecture are being prepared. Check back soon for segment-wise content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComputerArchitecture;
