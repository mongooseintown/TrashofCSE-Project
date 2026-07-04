import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reusing identical full-page note presentation styles

const RTDNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/eee')} 
          className="note-back-btn"
          title="Back to EEE Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>RTD (Resistance Temperature Detector) Note</h1>
      </div>

      {/* YouTube Video Link Button */}
      <div className="youtube-video-container" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'flex-start' }}>
        <a 
          href="https://www.youtube.com/watch?v=3PCswhjLlhA" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: '#ff0000',
            color: '#ffffff',
            padding: '0.8rem 1.6rem',
            borderRadius: '14px',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(255, 0, 0, 0.25)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#cc0000';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(255, 0, 0, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ff0000';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 0, 0, 0.25)';
          }}
        >
          {/* YouTube SVG Icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>Watch RTD Working Principle Video</span>
        </a>
      </div>

      {/* Note Images List */}
      <div className="note-images-list">
        <div className="note-image-card">
          <span className="note-image-caption">Part 1: RTD Principle, Polynomial Fit, and Wheatstone Bridge Co-relation</span>
          <div className="note-img-wrapper">
            <img 
              src="/rtd-1.png" 
              alt="RTD Notes Part 1" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Part 2: Construction Schematic of RTD Probe and Connection Bridge</span>
          <div className="note-img-wrapper">
            <img 
              src="/rtd-2.png" 
              alt="RTD Notes Part 2" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RTDNote;
