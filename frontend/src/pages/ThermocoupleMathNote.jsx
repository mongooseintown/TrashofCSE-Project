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
          onClick={() => navigate('/eee')} 
          className="note-back-btn"
          title="Back to EEE Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Thermocouple & Thermistor Related Math Note</h1>
      </div>

      {/* Note Images List (Swapped Order) */}
      <div className="note-images-list">
        <div className="note-image-card">
          <span className="note-image-caption">Part 1: Thermocouple EMF Formula and Variables Definition</span>
          <div className="note-img-wrapper">
            <img 
              src="/thermocouple-math-2.png" 
              alt="Thermocouple Math Formula" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Part 2: Thermocouple EMF Calculation Math Problem and Solution</span>
          <div className="note-img-wrapper">
            <img 
              src="/thermocouple-math-1.png" 
              alt="Thermocouple Math Solution" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermocoupleMathNote;
