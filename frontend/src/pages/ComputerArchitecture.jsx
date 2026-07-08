import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './EEE.css';

const ComputerArchitecture = () => {
  const navigate = useNavigate();

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header">
        <h1>Computer Architecture Portal</h1>
        <p>Interactive study cards, processor datapath notes, and previous questions modeled after modern designs.</p>
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        {/* Card: Segment 05 */}
        <div className="product-card" onClick={() => navigate('/computer-architecture/segment-05')}>
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">CSE</div>
            <img 
              src="/ca-seg05-cover.png" 
              alt="Segment 05" 
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
            <h3>Segment 05</h3>
            <span className="card-sub">Datapath & Control Design</span>
            <p className="card-desc">
              Study the differences between single-cycle and multi-cycle datapaths, control unit signals, and operations.
            </p>
          </div>
          <div className="card-footer-row">
            <span className="price-pill">CSE-3523</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/computer-architecture/segment-05');
            }}>
              Open Segment <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerArchitecture;
