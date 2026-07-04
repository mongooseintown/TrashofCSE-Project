import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './EEE.css';

const EEESegment08 = () => {
  const navigate = useNavigate();

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          onClick={() => navigate('/eee')} 
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
          <p>Explore all topics and previous questions under EEE Segment 08.</p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        {/* Card 9: RTD Previous Questions */}
        <div className="product-card" onClick={() => navigate('/eee/rtd-pq')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/rtd-cover.png" 
              alt="RTD Previous Questions" 
              className="card-img" 
              style={{ filter: 'hue-rotate(240deg) brightness(0.9)' }} 
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
            <h3>RTD Previous Questions</h3>
            <span className="card-sub">Exam Question Board</span>
            <p className="card-desc">
              Review and practice real previous exam questions on Resistance Temperature Detectors (RTD).
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/rtd-pq');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 10: Piezo Electric Sensor Transducer Previous Questions */}
        <div className="product-card" onClick={() => navigate('/eee/piezo-electric-pq')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/piezo-electric-cover.png" 
              alt="Piezo Electric Sensor Transducer Previous Questions" 
              className="card-img" 
              style={{ filter: 'hue-rotate(60deg) brightness(0.9)' }} 
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
            <h3>Piezo Electric Sensor Transducer Previous Questions</h3>
            <span className="card-sub">Exam Question Board</span>
            <p className="card-desc">
              Review and practice real previous exam questions on Piezo Electric Sensor Transducers.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/piezo-electric-pq');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 11: Transducer Previous Questions */}
        <div className="product-card" onClick={() => navigate('/eee/transducer-pq')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/transducer-cover.png" 
              alt="Transducer Previous Questions" 
              className="card-img" 
              style={{ filter: 'hue-rotate(180deg) brightness(0.9)' }} 
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
            <h3>Transducer Previous Questions</h3>
            <span className="card-sub">Exam Question Board</span>
            <p className="card-desc">
              Review and practice real previous exam questions on Transducers.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/transducer-pq');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 12: DVM Previous Questions */}
        <div className="product-card" onClick={() => navigate('/eee/dvm-pq')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/dvm-cover.png" 
              alt="DVM Previous Questions" 
              className="card-img" 
              style={{ filter: 'hue-rotate(240deg) brightness(0.9)' }} 
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
            <h3>DVM Previous Questions</h3>
            <span className="card-sub">Exam Question Board</span>
            <p className="card-desc">
              Review and practice real previous exam questions on Digital Voltmeters (DVM).
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/dvm-pq');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 8: PV Cell Previous Questions */}
        <div className="product-card" onClick={() => navigate('/eee/pv-cell-pq')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/pv-cell-cover.png" 
              alt="PV Cell Previous Questions" 
              className="card-img" 
              style={{ filter: 'hue-rotate(130deg) brightness(0.9)' }} 
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
            <h3>PV Cell Previous Questions</h3>
            <span className="card-sub">Exam Question Board</span>
            <p className="card-desc">
              Review and practice real previous exam questions on Photovoltaic (PV) and Solar Cell operation principles.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/pv-cell-pq');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 13: Opto-Electronics Previous Questions */}
        <div className="product-card" onClick={() => navigate('/eee/opto-electronics-pq')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/opto-electronics-cover.png" 
              alt="Opto-Electronics Previous Questions" 
              className="card-img" 
              style={{ filter: 'hue-rotate(0deg) brightness(0.9)' }} 
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
            <h3>Opto-Electronics Previous Questions</h3>
            <span className="card-sub">Exam Question Board</span>
            <p className="card-desc">
              Review and practice real previous exam questions on Optoelectronic Devices.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/opto-electronics-pq');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 14: Strain Gauge Previous Questions */}
        <div className="product-card" onClick={() => navigate('/eee/strain-gauge-pq')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/strain-gauge-cover.png" 
              alt="Strain Gauge Previous Questions" 
              className="card-img" 
              style={{ filter: 'hue-rotate(90deg) brightness(0.9)' }} 
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
            <h3>Strain Gauge Previous Questions</h3>
            <span className="card-sub">Exam Question Board</span>
            <p className="card-desc">
              Review and practice real previous exam questions on Strain Gauges and Gauge Factors.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/strain-gauge-pq');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EEESegment08;
