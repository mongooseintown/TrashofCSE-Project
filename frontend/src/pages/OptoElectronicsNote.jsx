import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reusing identical full-page note presentation styles

const OptoElectronicsNote = () => {
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
        <h1>Opto-electronics Lecture Note</h1>
      </div>

      {/* Note Images List */}
      <div className="note-images-list">
        <div className="note-image-card">
          <span className="note-image-caption">Opto-electronics Definition & Core Principle</span>
          <div className="note-img-wrapper">
            <img 
              src="/opto-electronics-1.png" 
              alt="Opto-electronics handwritten notes" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptoElectronicsNote;
