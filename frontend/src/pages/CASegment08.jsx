import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import './EEE.css';

const CASegment08 = () => {
  const navigate = useNavigate();

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          onClick={() => navigate('/computer-architecture')} 
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
          <h1>Segment 08 Portal</h1>
          <p>Interfacing Processors and Peripherals (Interrupt, DMA)</p>
        </div>
      </div>

      {/* Main Empty State Container */}
      <div style={{
        marginTop: '3.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '260px'
      }}>
        <div className="product-card" style={{
          width: '100%',
          maxWidth: '520px',
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px dashed rgba(255, 255, 255, 0.08)',
          cursor: 'default',
          transform: 'none',
          boxShadow: 'none'
        }}>
          <Clock size={44} style={{ color: 'var(--accent-teal)', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--text-primary)', margin: 0 }}>
            No Notes Uploaded Yet
          </h3>
          <p style={{
            margin: 0,
            fontSize: '0.92rem',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            lineHeight: 1.6,
            fontWeight: 300
          }}>
            Study sheets, handnotes, and question answers for Interfacing, Interrupts, and DMA have not been uploaded for Segment 08. They will appear here once updated by the moderator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CASegment08;
