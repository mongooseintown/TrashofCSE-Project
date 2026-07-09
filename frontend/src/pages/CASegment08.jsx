import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './EEE.css';

const CASegment08 = () => {
  const navigate = useNavigate();

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          onClick={() => navigate('/computer-architecture')} 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1>Segment 08 Portal</h1>
          <p>Interfacing Processors and Peripherals (Interrupt, DMA)</p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid" style={{ marginTop: '2.5rem' }}>
        {/* Card: DMA */}
        <div className="product-card" onClick={() => navigate('/computer-architecture/segment-08/dma')}>
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">CSE</div>
            <img 
              src="/ca-cache-cover.png" 
              alt="Direct Memory Access (DMA)" 
              className="card-img" 
            />
            <div className="card-dots">
              <span className="active"></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="card-details-section">
            <h3>Direct Memory Access (DMA)</h3>
            <span className="card-sub">Purpose, Scope & Mechanisms</span>
            <p className="card-desc">
              Understand how DMA enables high-speed peripheral data transfer directly to/from main memory without CPU intervention. Includes Autumn 2025 and 2023 questions.
            </p>
          </div>
          <div className="card-footer-row">
            <span className="price-pill">DMA</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/computer-architecture/segment-08/dma');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CASegment08;
