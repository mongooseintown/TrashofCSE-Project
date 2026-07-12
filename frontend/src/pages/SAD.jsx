import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, ArrowUpRight } from 'lucide-react';
import './EEE.css';
import './SAD.css';

const SAD = () => {
  const navigate = useNavigate();

  const segments = [
    {
      id: '04',
      title: 'Segment 04',
      sub: 'Requirements & Modeling',
      desc: 'Requirement gathering, DFDs, Use Case analysis, and feasibility assessment.',
      locked: true,
      pill: 'SAD-3611'
    },
    {
      id: '05',
      title: 'Segment 05',
      sub: 'System Design Phase',
      desc: 'Software design specification, UML schemas, Class diagrams, and design methodologies.',
      locked: true,
      pill: 'SAD-3611'
    },
    {
      id: '06',
      title: 'Segment 06',
      sub: 'Testing & Implementation',
      desc: 'System installation, verification procedures, validation models, and maintenance.',
      locked: true,
      pill: 'SAD-3611'
    },
    {
      id: '07',
      title: 'Segment 07',
      sub: 'Object-Oriented SAD',
      desc: 'Modern system design using OOD structures, sequence diagrams, and frameworks.',
      locked: true,
      pill: 'SAD-3611'
    },
    {
      id: '08',
      title: 'Segment 08',
      sub: 'System Implementation & Support',
      desc: 'Coding, testing, installation, user documentation, training, and support workflows.',
      locked: false,
      pill: 'SAD-3611'
    }
  ];

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          onClick={() => navigate('/dashboard')} 
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
          <h1>System Analysis & Design (SAD)</h1>
          <p>Explore System Development Life Cycles, Object Modeling & Implementation notes.</p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid" style={{ marginTop: '2.5rem' }}>
        {segments.map((seg) => (
          <div 
            key={seg.id} 
            className={`product-card ${seg.locked ? 'sad-locked' : ''}`}
            onClick={() => !seg.locked && navigate(`/system-analysis-design/segment-${seg.id}`)}
            style={seg.locked ? { pointerEvents: 'auto', cursor: 'not-allowed' } : { cursor: 'pointer' }}
          >
            {/* Lock Overlay for locked segments */}
            {seg.locked && (
              <div className="sad-locked-overlay">
                <div className="sad-lock-circle">
                  <Lock size={30} />
                </div>
                <span className="sad-lock-label">Locked</span>
              </div>
            )}

            {/* Cover Image */}
            <div className="card-img-container">
              <span className="card-tag-badge">{seg.locked ? 'Locked' : 'New'}</span>
              <div className="card-logo-badge">CSE</div>
              <img 
                src="/logo.png" 
                alt={seg.title} 
                className="card-img" 
                style={{ objectFit: 'contain', padding: '1.5rem' }}
              />
              <div className="card-dots">
                <span className="active"></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            {/* Details Section */}
            <div className="card-details-section">
              <h3>{seg.title}</h3>
              <span className="card-sub">{seg.sub}</span>
              <p className="card-desc">{seg.desc}</p>
            </div>

            {/* Footer Row */}
            <div className="card-footer-row">
              <span className="price-pill">{seg.pill}</span>
              {seg.locked ? (
                <span className="buy-pill-btn" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                  <Lock size={14} /> Locked
                </span>
              ) : (
                <button 
                  className="buy-pill-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/system-analysis-design/segment-${seg.id}`);
                  }}
                >
                  Open Notes <ArrowUpRight size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SAD;
