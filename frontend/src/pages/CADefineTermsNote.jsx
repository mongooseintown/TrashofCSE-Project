import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CADefineTermsNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/computer-architecture/segment-08')} 
          className="note-back-btn"
          title="Back to Segment 08 Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Define Terms</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        {/* Card 1: Definition of Key Terms: Interrupts, DMA, I/O, RAID */}
        <div className="note-image-card">
          <span className="note-image-caption">Definitions: Interrupts, DMA, I/O Devices, and RAID</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-definitions-ans.png" 
              alt="Key Terms Definitions" 
              className="note-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CADefineTermsNote;
