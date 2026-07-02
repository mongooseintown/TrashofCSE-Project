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
