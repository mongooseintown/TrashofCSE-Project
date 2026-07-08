import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CAHardwareChangesNote = () => {
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
        <h1>Hardware/Multiplexer Changes</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        <div className="note-image-card">
          <div className="note-img-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src="/ca-hardware-changes.png" 
              alt="Multiplexer and hardware changes required in a multicycle datapath" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAHardwareChangesNote;
