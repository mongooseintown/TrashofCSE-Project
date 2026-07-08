import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CAControlSignalsNote = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/computer-architecture/segment-05')} 
          className="note-back-btn"
          title="Back to Segment 05 Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Control Signals</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        {/* Datapath Card */}
        <div className="note-image-card" style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--text-primary)', marginBottom: '1rem', padding: '0 1rem' }}>
            A Multicycle Implementation (With the additional multiplexers)
          </h2>
          <div className="note-img-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src="/ca-control-datapath.png" 
              alt="MIPS Multicycle Datapath implementation schematic diagram" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        {/* How Control Unit Generates Signals Card */}
        <div className="note-image-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--text-primary)', marginBottom: '1rem', padding: '0 1rem' }}>
            How Control Unit Generates Signals
          </h2>
          <div className="note-img-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src="/ca-control-signals-desc.png" 
              alt="How Control Unit Generates Signals detailed list" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAControlSignalsNote;
