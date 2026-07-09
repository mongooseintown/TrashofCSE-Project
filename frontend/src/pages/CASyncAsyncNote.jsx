import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CASyncAsyncNote = () => {
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
        <h1>Synchronous and Asynchronous Bus</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        {/* Card 1: Question 1 */}
        <div className="note-image-card">
          <span className="note-image-caption">Synchronous vs Asynchronous Bus Difference Question</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-sync-async-q.png" 
              alt="Synchronous vs Asynchronous Bus Difference Question" 
              className="note-img"
              style={{ maxHeight: '180px', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Card 2: Note Page 1 */}
        <div className="note-image-card">
          <span className="note-image-caption">Difference Table between Synchronous and Asynchronous Bus</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-sync-async-ans1.png" 
              alt="Difference Table Synchronous vs Asynchronous Bus" 
              className="note-img"
            />
          </div>
        </div>

        {/* Card 3: Note Page 2 */}
        <div className="note-image-card">
          <span className="note-image-caption">Synchronous vs Asynchronous Bus Bandwidth Math Comparison</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-sync-async-ans2.png" 
              alt="Synchronous vs Asynchronous Bus Bandwidth Math Comparison" 
              className="note-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CASyncAsyncNote;
