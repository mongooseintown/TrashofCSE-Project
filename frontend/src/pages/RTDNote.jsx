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

      {/* YouTube Video Embed Player */}
      <div className="rtd-video-section" style={{ margin: '0 auto 3rem auto', maxWidth: '850px' }}>
        <span className="note-image-caption" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: '#ff5b22', fontWeight: 'bold', fontSize: '1.1rem' }}>
          {/* YouTube Icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>RTD Working Principle Video Lecture</span>
        </span>
        <div className="rtd-video-embed-container" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--card-border)', boxShadow: '0 15px 35px var(--shadow-primary)' }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe
              src="https://www.youtube.com/embed/3PCswhjLlhA"
              title="RTD Working Principle Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
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
