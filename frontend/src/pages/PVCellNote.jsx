import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css';

const PVCellNote = () => {
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
        <h1>PV Cell Lecture Note</h1>
      </div>

      {/* Note Images List (Serially) */}
      <div className="note-images-list">
        <div className="note-image-card">
          <span className="note-image-caption">Part 1: Layer Schematic and Construction Diagram</span>
          <div className="note-img-wrapper">
            <img 
              src="/pv-cell-2.png" 
              alt="PV Cell Layers Schematic Diagram" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Part 2: Working Mechanism & Charge Transitions</span>
          <div className="note-img-wrapper">
            <img 
              src="/pv-cell-1.png" 
              alt="Working Mechanism Details" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PVCellNote;
