import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CABusesNote = () => {
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
        <h1>System Buses</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        {/* Card 1: Data, Address, and Control Bus Explanation */}
        <div className="note-image-card">
          <span className="note-image-caption">System Bus Functional Groups: Data, Address, and Control Bus</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-buses-ans.png" 
              alt="System Bus Functional Groups" 
              className="note-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CABusesNote;
