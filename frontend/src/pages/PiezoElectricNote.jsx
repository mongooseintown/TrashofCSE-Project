import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reusing identical full-page note presentation styles

const PiezoElectricNote = () => {
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
        <h1>Piezo-electric Sensor Transducer Note</h1>
      </div>

      {/* Note Images List */}
      <div className="note-images-list">
        <div className="note-image-card">
          <span className="note-image-caption">Part 1: Definition, Cross-Section schematic, and Working Principle</span>
          <div className="note-img-wrapper">
            <img 
              src="/piezo-electric-1.png" 
              alt="Piezo-electric Notes Part 1" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Part 2: Mathematical Formulation and applied force proportionality</span>
          <div className="note-img-wrapper">
            <img 
              src="/piezo-electric-2.png" 
              alt="Piezo-electric Notes Part 2" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PiezoElectricNote;
