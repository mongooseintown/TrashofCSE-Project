import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const PiezoElectricPQNote = () => {
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
        <h1>Piezo Electric Sensor Transducer Previous Questions</h1>
      </div>

      {/* Note Images List (Serially) */}
      <div className="note-images-list">
        <div className="note-image-card">
          <span className="note-image-caption">
            Question 1
          </span>
          <div className="note-img-wrapper" style={{ flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img 
              src="/eee-piezo-electric-pq-new-1.png" 
              alt="Explain the working principle of Piezoelectric sensor with appropriate figure." 
              className="note-handnote-img" 
            />
            <div style={{ alignSelf: 'flex-start', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', borderLeft: '2px solid var(--text-secondary)', paddingLeft: '0.5rem' }}>
              Solution:
            </div>
            <img 
              src="/eee-piezo-pq-ans-1a.png" 
              alt="Piezoelectric Sensor Diagram" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-piezo-pq-ans-1b.png" 
              alt="Working Principle Part 1" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-piezo-pq-ans-1c.png" 
              alt="Working Principle Part 2" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-piezo-pq-ans-1d.png" 
              alt="Working Principle Part 3" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-piezo-pq-ans-1e.png" 
              alt="Working Principle Part 4" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PiezoElectricPQNote;
