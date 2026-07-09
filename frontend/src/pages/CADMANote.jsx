import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import './PVCellNote.css';

const CADMANote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/computer-architecture/segment-08/interfacing')} 
          className="note-back-btn"
          title="Back to Interfacing Hub"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Direct Memory Access (DMA)</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        <div className="note-image-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', gap: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px dashed rgba(255, 255, 255, 0.08)' }}>
          <Clock size={48} style={{ color: 'var(--accent-teal)', opacity: 0.8 }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 650, color: 'var(--text-primary)', margin: 0 }}>
            Notes Under Construction
          </h2>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '400px', lineHeight: 1.6 }}>
            Handwritten notes, diagrams, and lecture slides for Direct Memory Access (DMA) are currently being processed. Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CADMANote;
