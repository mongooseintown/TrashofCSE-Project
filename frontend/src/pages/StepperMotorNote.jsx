import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const StepperMotorNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/eee/group-a')} 
          className="note-back-btn"
          title="Back to Group A Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Stepper Motor</h1>
      </div>

      {/* Note Images List */}
      <div className="note-images-list">
        <div className="note-image-card">
          <div className="note-img-wrapper" style={{ flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img 
              src="/eee-stepper-motor-1.png" 
              alt="Stepper Motor Driving Modes Introduction" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-stepper-motor-2.png" 
              alt="Single Coil Excitation Wave Mode Schematic and Truth Table" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-stepper-motor-3.png" 
              alt="Full Step Mode Schematic and Truth Table" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-stepper-motor-4.png" 
              alt="Half-Step Mode Schematic and Truth Table" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperMotorNote;
