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
        {/* Card 1: PV Cell Product-Style Card */}
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

        {/* Card 2: Opto-electronics Product-Style Card */}
        <div className="product-card" onClick={() => navigate('/eee/opto-electronics')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">Popular</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/opto-electronics-cover.png" 
              alt="Opto-electronics device" 
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
            <h3>Opto-electronics</h3>
            <span className="card-sub">Light & Device Interaction</span>
            <p className="card-desc">
              Study the core definition and application of electronics devices that detect, emit, or interact with light signals.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/opto-electronics');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 3: Strain Gauge Product-Style Card */}
        <div className="product-card" onClick={() => navigate('/eee/strain-gauge')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">Popular</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/strain-gauge-cover.png" 
              alt="Strain Gauge sensor grid" 
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
            <h3>Strain Gauge</h3>
            <span className="card-sub">Deformation & Resistance</span>
            <p className="card-desc">
              Understand resistance changes under mechanical stress, Wheatstone bridge configurations, and mathematical Gauge Factor derivations.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/strain-gauge');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 4: Transducer Product-Style Card */}
        <div className="product-card" onClick={() => navigate('/eee/transducer')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">Popular</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/transducer-cover.png" 
              alt="Energy transducer schematic" 
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
            <h3>Transducers</h3>
            <span className="card-sub">Energy Form Conversion</span>
            <p className="card-desc">
              Explore the definition of electrical transducers, active sensing mechanisms, and classifications between Primary and Secondary transducers.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/transducer');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 5: Piezo-electric Sensor Product-Style Card */}
        <div className="product-card" onClick={() => navigate('/eee/piezo-electric')}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">Popular</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/piezo-electric-cover.png" 
              alt="Piezoelectric crystal sensor schematic" 
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
            <h3>Piezo-electric Sensor</h3>
            <span className="card-sub">Piezoelectric Transduction</span>
            <p className="card-desc">
              Explore charge displacement on ionic crystal surfaces under applied force, working principle parameters, and proportionality derivations.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/eee/piezo-electric');
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
