import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CAIOInterfaceNote = () => {
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
        <h1>I/O Interface Schemes</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        {/* Card 1: Memory-Mapped and Isolated I/O Explanation */}
        <div className="note-image-card">
          <span className="note-image-caption">Memory-Mapped I/O vs Isolated (Port-Mapped) I/O Explanation</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-io-interface-ans.png" 
              alt="Memory-Mapped vs Isolated IO Explanation" 
              className="note-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAIOInterfaceNote;
