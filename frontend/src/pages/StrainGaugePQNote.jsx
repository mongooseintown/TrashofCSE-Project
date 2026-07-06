import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const StrainGaugePQNote = () => {
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
        <h1>Strain Gauge Previous Questions</h1>
      </div>

      {/* Note Images List (Serially) */}
      <div className="note-images-list">
        <div className="note-image-card">
          <div className="note-img-wrapper">
            <img 
              src="/eee-strain-gauge-pq-1.png" 
              alt="Strain Gauge PQ Page 1" 
              className="note-handnote-img" 
            />
          </div>
        </div>
        <div className="note-image-card">
          <div className="note-img-wrapper">
            <img 
              src="/eee-strain-gauge-pq-2.png" 
              alt="Strain Gauge PQ Page 2" 
              className="note-handnote-img" 
            />
          </div>
        </div>
        <div className="note-image-card">
          <div className="note-img-wrapper">
            <img 
              src="/eee-strain-gauge-pq-3.png" 
              alt="Strain Gauge PQ Page 3" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrainGaugePQNote;
