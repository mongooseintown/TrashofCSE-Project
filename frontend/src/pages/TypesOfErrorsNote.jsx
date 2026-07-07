import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const TypesOfErrorsNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/eee/segment-07')} 
          className="note-back-btn"
          title="Back to Segment 07 Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Types of Errors in Measurement</h1>
      </div>

      {/* Note Images List (Serially) */}
      <div className="note-images-list">
        {/* Question 1: Systematic Errors */}
        <div className="note-image-card">
          <span className="note-image-caption">
            Question 1
          </span>
          <div className="note-img-wrapper" style={{ flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img 
              src="/eee-systematic-errors-pq-1.png" 
              alt="Briefly explain systematic errors" 
              className="note-handnote-img" 
            />
            <div style={{ alignSelf: 'flex-start', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', borderLeft: '2px solid var(--text-secondary)', paddingLeft: '0.5rem' }}>
              Solution:
            </div>
            <img 
              src="/eee-systematic-errors-ans-1a.png" 
              alt="Systematic Errors Definition and Types Diagram" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-systematic-errors-ans-1b.png" 
              alt="Systematic Errors Detailed Explanation" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypesOfErrorsNote;
