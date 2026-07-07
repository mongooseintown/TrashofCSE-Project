import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css';

const TypesOfErrorsNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
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

      <div className="note-images-list">
        <div className="note-image-card">
          <div className="note-img-wrapper" style={{ flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img 
              src="/eee-types-errors-1.png" 
              alt="Types of Errors in Measurement - Part 1" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-types-errors-2.png" 
              alt="Types of Errors in Measurement - Part 2" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-types-errors-3.png" 
              alt="Types of Errors in Measurement - Part 3" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypesOfErrorsNote;
