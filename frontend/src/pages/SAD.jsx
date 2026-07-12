import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, ArrowUpRight } from 'lucide-react';
import './SAD.css';

const SAD = () => {
  const navigate = useNavigate();

  const segments = [
    {
      id: '04',
      title: 'Segment 04',
      sub: 'Requirements & Modeling',
      desc: 'Requirement gathering, DFDs, Use Case analysis, and feasibility assessment.',
      locked: true
    },
    {
      id: '05',
      title: 'Segment 05',
      sub: 'System Design Phase',
      desc: 'Software design specification, UML schemas, Class diagrams, and design methodologies.',
      locked: true
    },
    {
      id: '06',
      title: 'Segment 06',
      sub: 'Testing & Implementation',
      desc: 'System installation, verification procedures, validation models, and maintenance.',
      locked: true
    },
    {
      id: '07',
      title: 'Segment 07',
      sub: 'Object-Oriented SAD',
      desc: 'Modern system design using OOD structures, sequence diagrams, and frameworks.',
      locked: true
    },
    {
      id: '08',
      title: 'Segment 08',
      sub: 'System Implementation & Support',
      desc: 'Coding, testing, installation, user documentation, training, and support workflows.',
      locked: false
    }
  ];

  return (
    <div className="sad-container">
      {/* Page Header */}
      <div className="sad-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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
      <div className="sad-grid">
        {segments.map((seg) => (
          <div 
            key={seg.id} 
            className={`sad-card-4 ${seg.locked ? 'locked' : 'unlocked'}`}
            onClick={() => !seg.locked && navigate('/system-analysis-design/segment-08')}
          >
            {/* Logo/Image Container */}
            <div className="sad-card-img-wrapper">
              <img 
                src="/logo.png" 
                alt="Website Logo" 
                className="sad-card-img" 
                style={seg.locked ? { filter: 'grayscale(1)', opacity: 0.4 } : {}}
              />
            </div>

            {/* Details Section */}
            <div className="sad-card-details">
              <span className="sad-card-sub">{seg.sub}</span>
              <h3 className="sad-card-title">{seg.title}</h3>
              <p className="sad-card-desc">{seg.desc}</p>
            </div>

            {/* Bottom Status / Action Row */}
            <div className="sad-card-footer">
              {seg.locked ? (
                <div className="sad-action-btn">
                  <Lock size={14} /> Locked Segment
                </div>
              ) : (
                <button 
                  className="sad-action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/system-analysis-design/segment-08');
                  }}
                >
                  Open Notes <ArrowUpRight size={14} />
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
