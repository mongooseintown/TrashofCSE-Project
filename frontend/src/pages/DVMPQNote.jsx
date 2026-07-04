import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const DVMPQNote = () => {
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
        <h1>DVM Previous Questions</h1>
      </div>

      {/* Note Images List (Serially) */}
      <div className="note-images-list">
        <div className="note-image-card">
          <span className="note-image-caption">
            Question 1
          </span>
          <div className="note-img-wrapper" style={{ flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img 
              src="/eee-dvm-pq-1.png" 
              alt="Explain the construction of a Digital Voltmeter (DVM) with the help of a functional block diagram." 
              className="note-handnote-img" 
            />
            <div style={{ alignSelf: 'flex-start', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', borderLeft: '2px solid var(--text-secondary)', paddingLeft: '0.5rem' }}>
              Solution:
            </div>
            <img 
              src="/eee-dvm-pq-ans-1.png" 
              alt="DVM functional block diagram" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-dvm-pq-ans-2.png" 
              alt="DVM construction notes" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">
            Question 2
          </span>
          <div className="note-img-wrapper" style={{ flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <img 
              src="/eee-dvm-pq-2.png" 
              alt="Describe the working principle (or operation) of a Digital Voltmeter (DVM)." 
              className="note-handnote-img" 
            />
            <div style={{ alignSelf: 'flex-start', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', borderLeft: '2px solid var(--text-secondary)', paddingLeft: '0.5rem' }}>
              Solution:
            </div>
            <img 
              src="/eee-dvm-pq-ans-3.png" 
              alt="DVM functional block diagram" 
              className="note-handnote-img" 
            />
            <img 
              src="/eee-dvm-pq-ans-4.png" 
              alt="DVM working principle flow diagram" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DVMPQNote;
