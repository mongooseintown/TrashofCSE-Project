import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CALogicConventionNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/computer-architecture/segment-05/introduction')} 
          className="note-back-btn"
          title="Back to Introduction Hub"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Logic Convention & Clocking Methodology</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        {/* Q1 Section */}
        <div className="note-image-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--text-primary)', marginBottom: '1rem', padding: '0 1rem' }}>
            Question: Explain the logic elements for multicycle datapath. Show and define how the elements handle edge-triggered clocking. (Autumn 2025)
          </h2>
          <div className="note-img-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img 
              src="/ca-logic-elements-new-q.png" 
              alt="Explain the logic elements for multicycle datapath. Show and define how the elements handle edge-triggered clocking. (Autumn 2025)" 
              className="note-handnote-img" 
            />
            <div style={{ width: '100%', height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '1rem 0' }}></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)', alignSelf: 'flex-start', padding: '0 1rem' }}>
              Answer:
            </h3>
            <img 
              src="/ca-logic-elements-ans1.png" 
              alt="Answer description for combinational and state logic elements with edge-triggered clocking" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CALogicConventionNote;
