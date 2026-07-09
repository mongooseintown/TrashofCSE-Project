import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CALogicElementsNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/computer-architecture/segment-05/multi-cycle')} 
          className="note-back-btn"
          title="Back to Multi-Cycle Hub"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Execution Steps</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        {/* Q2 Section */}
        <div className="note-image-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--text-primary)', marginBottom: '1rem', padding: '0 1rem' }}>
            Question: How does the execution of different instruction types differ in multi-cycle datapath. Show the steps. (Spring 2025)
          </h2>
          <div className="note-img-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img 
              src="/ca-logic-elements-q2.png" 
              alt="How does the execution of different instruction types differ in multi-cycle datapath. Show the steps. (Spring 2025)" 
              className="note-handnote-img" 
            />
            <div style={{ width: '100%', height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '1rem 0' }}></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)', alignSelf: 'flex-start', padding: '0 1rem' }}>
              Answer:
            </h3>
            <img 
              src="/ca-logic-elements-ans2.png" 
              alt="Answer description for MIPS instruction execution steps" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CALogicElementsNote;
