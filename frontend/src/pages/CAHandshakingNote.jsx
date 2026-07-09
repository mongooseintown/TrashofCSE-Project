import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CAHandshakingNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/computer-architecture/segment-08')} 
          className="note-back-btn"
          title="Back to Segment 08 Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Handshaking Protocol</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        {/* Card 1: Question */}
        <div className="note-image-card">
          <span className="note-image-caption">Handshaking in Asynchronous Communication Question</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-handshake-q.png" 
              alt="Handshaking Board Question" 
              className="note-img"
              style={{ maxHeight: '180px', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Card 2: Note Page 1 */}
        <div className="note-image-card">
          <span className="note-image-caption">Handshaking Protocol Definition & Timing Diagram</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-handshake-ans1.jpg" 
              alt="Handshaking Protocol Definition and Diagram" 
              className="note-img"
            />
          </div>
        </div>

        {/* Card 3: Note Page 2 */}
        <div className="note-image-card">
          <span className="note-image-caption">Handshaking Protocol Execution Steps (1 to 7)</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-handshake-ans2.jpg" 
              alt="Handshaking Protocol Execution Steps" 
              className="note-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAHandshakingNote;
