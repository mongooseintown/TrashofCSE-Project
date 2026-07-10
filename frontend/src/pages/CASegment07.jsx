import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './EEE.css';

const CASegment07 = () => {
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
          <h1>Segment 07 Portal</h1>
          <p>Memory Organization & Virtual Memory Systems</p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid" style={{ marginTop: '2.5rem' }}>
        {/* Card 1: TLB */}
        <div className="product-card" onClick={() => navigate('/computer-architecture/segment-07/tlb')}>
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">CSE</div>
            <img 
              src="/ca-virtual-cover.png" 
              alt="Translation Lookaside Buffer (TLB)" 
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
            <h3>Translation Lookaside Buffer (TLB)</h3>
            <span className="card-sub">Paging, Flowchart & Miss Handling</span>
            <p className="card-desc">
              Understand the Translation Lookaside Buffer (TLB) cache structure, working principles, Paging translation flowcharts, and step-by-step miss resolution.
            </p>
          </div>
          <div className="card-footer-row">
            <span className="price-pill">TLB Cache</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/computer-architecture/segment-07/tlb');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CASegment07;
