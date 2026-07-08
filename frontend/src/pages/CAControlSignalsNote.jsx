import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CAControlSignalsNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/computer-architecture/segment-05')} 
          className="note-back-btn"
          title="Back to Segment 05 Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Control Signals</h1>
      </div>

      {/* Placeholder content */}
      <div className="note-images-list" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="note-image-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px' }}>
          <Clock size={40} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 650, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            No Handnotes Uploaded Yet
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
            The control unit logic tables and control signal descriptions are currently being prepared. Check back soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CAControlSignalsNote;
