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
          onClick={() => navigate('/computer-architecture/segment-05')} 
          className="note-back-btn"
          title="Back to Segment 05 Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Logic Elements & Execution Steps</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        {/* Q1 Card */}
        <div className="note-image-card" style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--text-primary)', marginBottom: '1rem', padding: '0 1rem' }}>
            Question 1:
          </h2>
          <div className="note-img-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src="/ca-logic-elements-q1.png" 
              alt="Explain the logic elements for multicycle datapath. (Autumn 2025)" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        {/* Q2 Card */}
        <div className="note-image-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--text-primary)', marginBottom: '1rem', padding: '0 1rem' }}>
            Question 2:
          </h2>
          <div className="note-img-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src="/ca-logic-elements-q2.png" 
              alt="How does the execution of different instruction types differ in multi-cycle datapath. Show the steps. (Spring 2025)" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CALogicElementsNote;
