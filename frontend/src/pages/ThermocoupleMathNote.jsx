import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reusing identical full-page note presentation styles

const ThermocoupleMathNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/eee/segment-08')} 
          className="note-back-btn"
          title="Back to Segment 08 Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Thermocouple's Math</h1>
      </div>

      {/* Note Images List */}
      <div className="note-images-list">
        <div className="note-image-card">
          <span className="note-image-caption">Thermocouple EMF Math Problem & Solution</span>
          <div className="note-img-wrapper">
            <img 
              src="/eee-thermocouple-math.png" 
              alt="Thermocouple Math Solved Example" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermocoupleMathNote;
