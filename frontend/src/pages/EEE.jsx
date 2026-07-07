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
        {/* Card: EEE Segment 07 */}
        <div className="product-card" onClick={() => navigate('/eee/segment-07')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/eee-seg08-cover.png" 
              alt="EEE Segment 07" 
              className="card-img" 
              style={{ filter: 'hue-rotate(120deg)' }}
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
            <h3>Segment 07</h3>
            <span className="card-sub">Alternating Current & Circuit Analysis</span>
            <p className="card-desc">
              Access lecture notes, circuit theorems, and previous exam questions for EEE Segment 07.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/segment-07');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card: EEE Segment 08 Measurements */}
        <div className="product-card" onClick={() => navigate('/eee/segment-08')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/eee-seg08-cover.png" 
              alt="EEE Segment 08 Measurements" 
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
            <h3>Segment 08</h3>
            <span className="card-sub">Measurements & Transducers</span>
            <p className="card-desc">
              Access all previous exam question notes on RTD, Piezo Electric Sensors, Transducers, DVM, PV Cells, Opto-Electronics, and Strain Gauges.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/segment-08');
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
