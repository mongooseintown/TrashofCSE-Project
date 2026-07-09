import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reuses notes layout styling

const CADMANote = () => {
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
        <h1>Direct Memory Access (DMA)</h1>
      </div>

      {/* Note Content List */}
      <div className="note-images-list">
        {/* Card 1: Question 1 */}
        <div className="note-image-card">
          <span className="note-image-caption">DMA Purpose, Scope & Mechanisms Question (Autumn 2025, 2023)</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-dma-q.png" 
              alt="DMA Board Question 1" 
              className="note-img"
              style={{ maxHeight: '180px', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Card 2: Answer 1 */}
        <div className="note-image-card">
          <span className="note-image-caption">DMA Definition, Purpose & Basic Mechanism Solution</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-dma-ans.png" 
              alt="DMA Definition & Mechanism Solution" 
              className="note-img"
            />
          </div>
        </div>

        {/* Card 3: Question 2 */}
        <div className="note-image-card">
          <span className="note-image-caption">DMA Controller Configuration Question (Spring 2024, Autumn 2023)</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-dma-q2.png" 
              alt="DMA Board Question 2" 
              className="note-img"
              style={{ maxHeight: '180px', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Card 4: Answer 2 */}
        <div className="note-image-card">
          <span className="note-image-caption">DMA Controller Definition & Block Diagram Solution</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-dma-ans2.png" 
              alt="DMA Controller Block Diagram" 
              className="note-img"
            />
          </div>
        </div>

        {/* Card 5: Answer 3 */}
        <div className="note-image-card">
          <span className="note-image-caption">DMA Controller Configuration: Type-1 & Type-2 Schemes</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-dma-ans3.png" 
              alt="DMA Controller Configuration Type-1 and Type-2" 
              className="note-img"
            />
          </div>
        </div>

        {/* Card 6: Answer 6 */}
        <div className="note-image-card">
          <span className="note-image-caption">DMA Controller Configuration: Type-3 Separated Bus Scheme</span>
          <div className="note-image-wrapper">
            <img 
              src="/ca-dma-ans4.png" 
              alt="DMA Controller Configuration Type-3" 
              className="note-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CADMANote;
