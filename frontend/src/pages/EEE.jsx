import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './EEE.css';

const EEE = () => {
  const navigate = useNavigate();

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header">
        <h1>EEE Study Portal</h1>
        <p>Interactive study cards and lecture notes modeled after modern designs.</p>
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        {/* PV Cell Product-Style Card */}
        <div className="product-card" onClick={() => navigate('/eee/pv-cell')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">Best Seller</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/pv-cell-cover.png" 
              alt="Photovoltaic Solar Cell" 
              className="card-img" 
            />

            {/* Pagination dots mimicking Nike card pagination */}
            <div className="card-dots">
              <span className="active"></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Card Content details */}
          <div className="card-details-section">
            <h3>Photovoltaic Cell (PV Cell)</h3>
            <span className="card-sub">Solar Energy Conversion</span>
            <p className="card-desc">
              Explore the detailed physical layer structure, depletion boundary behavior, and voltage setup mechanisms.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/pv-cell');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EEE;
