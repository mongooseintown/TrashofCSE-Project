import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CATempRegistersNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/computer-architecture/segment-05/multi-cycle')} 
          className="note-back-btn"
          title="Back to Multi-Cycle Hub"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Temp Registers in Multi-Cycle</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        {/* Q1 Card */}
        <div className="note-image-card" style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--text-primary)', marginBottom: '1rem', padding: '0 1rem' }}>
            Question: What temporary registers are used in multicycle datapath?
          </h2>
          <div className="note-img-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src="/ca-temp-regs-list.png" 
              alt="What temporary registers are used in multicycle datapath" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        {/* Q2 Card */}
        <div className="note-image-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--text-primary)', marginBottom: '1rem', padding: '0 1rem' }}>
            Question: Why are temporary registers used in a multicycle datapath?
          </h2>
          <div className="note-img-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src="/ca-temp-regs-why.png" 
              alt="Why are temporary registers used in a multicycle datapath" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CATempRegistersNote;
