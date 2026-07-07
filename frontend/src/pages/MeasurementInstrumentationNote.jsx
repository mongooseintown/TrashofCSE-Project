import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const MeasurementInstrumentationNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/eee/segment-07')} 
          className="note-back-btn"
          title="Back to Segment 07 Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Measurement and Instrumentation</h1>
      </div>

      {/* Note Images List (Serially) */}
      <div className="note-images-list">
        <div className="note-image-card">
          <span className="note-image-caption">
            Question 1
          </span>
          <div className="note-img-wrapper" style={{ flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img 
              src="/eee-measurement-pq-1.png" 
              alt="What is Measurement / What do you understand by the term measurement and instrumentation?" 
              className="note-handnote-img" 
            />
            <div style={{ alignSelf: 'flex-start', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', borderLeft: '2px solid var(--text-secondary)', paddingLeft: '0.5rem' }}>
              Solution:
            </div>
            <img 
              src="/eee-measurement-pq-ans-1a.png" 
              alt="Definition of Measurement" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-measurement-pq-ans-1b.png" 
              alt="Definition of Instrumentation" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementInstrumentationNote;
