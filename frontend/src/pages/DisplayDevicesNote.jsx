import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const DisplayDevicesNote = () => {
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
        <h1>Display Devices (7-Segment)</h1>
      </div>

      {/* Note Images List */}
      <div className="note-images-list">
        {/* Question 1 Section */}
        <div className="note-image-card">
          <span className="note-image-caption">Question 1</span>
          <div className="note-img-wrapper" style={{ flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img 
              src="/eee-7segment-pq-1.png" 
              alt="Common Cathode 7-segment display question" 
              className="note-handnote-img" 
            />
            <div style={{ alignSelf: 'flex-start', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', borderLeft: '2px solid var(--text-secondary)', paddingLeft: '0.5rem' }}>
              Solution:
            </div>
            <img 
              src="/eee-7segment-ans-1a.png" 
              alt="Common Cathode segment schematic diagram" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-7segment-ans-1b.png" 
              alt="Common Cathode truth table" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        {/* Question 2 Section */}
        <div className="note-image-card">
          <span className="note-image-caption">Question 2</span>
          <div className="note-img-wrapper" style={{ flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img 
              src="/eee-7segment-pq-2.png" 
              alt="Common Anode 7-segment display question" 
              className="note-handnote-img" 
            />
            <div style={{ alignSelf: 'flex-start', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', borderLeft: '2px solid var(--text-secondary)', paddingLeft: '0.5rem' }}>
              Solution:
            </div>
            <img 
              src="/eee-7segment-ans-2a.png" 
              alt="Common Anode segment schematic diagram" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-7segment-ans-2b.png" 
              alt="Common Anode truth table" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayDevicesNote;
