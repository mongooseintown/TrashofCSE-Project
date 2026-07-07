import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './EEE.css';

const EEESegment07 = () => {
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
          <h1>Segment 07 Portal</h1>
          <p>Explore all topics and previous questions under EEE Segment 07.</p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid" style={{ marginTop: '2rem' }}>
        {/* Card 1: Generalized Measurement System */}
        <div className="product-card" onClick={() => navigate('/eee/generalized-measurement-system')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/eee-seg08-cover.png" 
              alt="Generalized Measurement System" 
              className="card-img" 
              style={{ filter: 'hue-rotate(200deg) brightness(0.9)' }} 
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
            <h3>Generalized Measurement System</h3>
            <span className="card-sub">Exam Question Board</span>
            <p className="card-desc">
              Study the steps, functional stages, and examples of a generalized measuring system.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/generalized-measurement-system');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 2: Measurement and Instrumentation */}
        <div className="product-card" onClick={() => navigate('/eee/measurement-instrumentation')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/transducer-cover.png" 
              alt="Measurement and Instrumentation" 
              className="card-img" 
              style={{ filter: 'hue-rotate(100deg) brightness(0.9)' }} 
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
            <h3>Measurement and Instrumentation</h3>
            <span className="card-sub">Exam Question Board</span>
            <p className="card-desc">
              Understand the core terms of measurement and instrumentation with board questions.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/measurement-instrumentation');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 3: Types of Errors in Measurement */}
        <div className="product-card" onClick={() => navigate('/eee/types-of-errors')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/eee-seg08-cover.png" 
              alt="Types of Errors in Measurement" 
              className="card-img" 
              style={{ filter: 'hue-rotate(300deg) brightness(0.9)' }} 
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
            <h3>Types of Errors in Measurement</h3>
            <span className="card-sub">Exam Question Board</span>
            <p className="card-desc">
              Learn about systematic errors, random errors, and their types & causes in measurement systems.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/types-of-errors');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 4: Accuracy and Precision */}
        <div className="product-card" onClick={() => navigate('/eee/accuracy-precision')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/transducer-cover.png" 
              alt="Accuracy and Precision" 
              className="card-img" 
              style={{ filter: 'hue-rotate(30deg) brightness(0.95)' }} 
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
            <h3>Accuracy and Precision</h3>
            <span className="card-sub">Exam Question Board</span>
            <p className="card-desc">
              Understand consistency, repeatability, resolution, and expected values in measurements.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/accuracy-precision');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EEESegment07;
