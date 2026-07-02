import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reusing identical full-page note presentation styles

const StrainGaugeNote = () => {
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
        <h1>Strain Gauge Lecture Note</h1>
      </div>

      {/* Note Images List */}
      <div className="note-images-list">
        <div className="note-image-card">
          <span className="note-image-caption">Part 1: Definition, Stress/Strain, and Wheatstone Bridge Schematic</span>
          <div className="note-img-wrapper">
            <img 
              src="/strain-gauge-1.png" 
              alt="Strain Gauge Notes Part 1" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Part 2: Gauge Factor Derivation and Poisson's Ratio Definition</span>
          <div className="note-img-wrapper">
            <img 
              src="/strain-gauge-2.png" 
              alt="Strain Gauge Notes Part 2" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Part 3: Final Gauge Factor Formulation (GF = 1 + 2 * Poisson's Ratio)</span>
          <div className="note-img-wrapper">
            <img 
              src="/strain-gauge-3.png" 
              alt="Strain Gauge Notes Part 3" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrainGaugeNote;
