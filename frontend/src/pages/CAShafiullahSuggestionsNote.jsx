import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CAShafiullahSuggestionsNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/computer-architecture')} 
          className="note-back-btn"
          title="Back to Computer Architecture Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Suggestions from Shafiullah Sir</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        <div className="note-image-card">
          <div className="note-img-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', alignItems: 'center' }}>
            <img 
              src="/ca-shafiullah-suggestions-1.png" 
              alt="Suggestions from Shafiullah Sir - Pipelining" 
              className="note-handnote-img" 
            />
            <img 
              src="/ca-shafiullah-suggestions-2.png" 
              alt="Suggestions from Shafiullah Sir - Cache Memory" 
              className="note-handnote-img" 
            />
            <img 
              src="/ca-shafiullah-suggestions-3.png" 
              alt="Suggestions from Shafiullah Sir - Virtual Memory & TLB" 
              className="note-handnote-img" 
            />
            <img 
              src="/ca-shafiullah-suggestions-4.png" 
              alt="Suggestions from Shafiullah Sir - I/O Interfacing & Buses" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        {/* Professional Note Section */}
        <div style={{
          marginTop: '2.5rem',
          background: 'rgba(255, 170, 0, 0.05)',
          border: '1px solid rgba(255, 170, 0, 0.15)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: '#ffaa00',
        }}>
          <AlertCircle size={24} style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}>
            Note: This list is dynamic and additional topic guidelines or suggestions from Shafiullah Sir may be added here as the semester progresses. Check back regularly for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CAShafiullahSuggestionsNote;
