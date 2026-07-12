import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './EEE.css';

const SADSegment08 = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Software & Hardware Selection Criteria',
      sub: 'SAD Selection Criteria',
      desc: 'Study handwritten notes on software selection criteria (functionality, compatibility, usability, reliability, security, scalability, vendor support, cost) and hardware selection criteria (performance, reliability, compatibility, expandability, cost, maintenance, energy efficiency, vendor support & warranty, size & ergonomics).',
      path: '/system-analysis-design/segment-08/selection-criteria',
      cover: '/logo.png',
      pill: 'SAD-3611'
    },
    {
      title: 'Security Vulnerabilities and Threats',
      sub: 'SAD Security Issues',
      desc: 'Study handwritten notes on threats definition, types of threats (natural, human, intentional, internal, external, physical, environmental, technical), common security issues (unauthorized access, malware, data breach, DoS attack), system vulnerabilities, and their effects on system resources.',
      path: '/system-analysis-design/segment-08/security-threats',
      cover: '/logo.png',
      pill: 'SAD-3611'
    }
  ];

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          onClick={() => navigate('/system-analysis-design')} 
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
          <p>System Implementation & Security Notes</p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid" style={{ marginTop: '2.5rem' }}>
        {cards.map((card, idx) => (
          <div key={idx} className="product-card" onClick={() => navigate(card.path)}>
            <div className="card-img-container">
              <span className="card-tag-badge">New</span>
              <div className="card-logo-badge">CSE</div>
              <img 
                src={card.cover} 
                alt={card.title} 
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
            <div className="card-details-section">
              <h3>{card.title}</h3>
              <span className="card-sub">{card.sub}</span>
              <p className="card-desc">{card.desc}</p>
            </div>
            <div className="card-footer-row">
              <span className="price-pill">{card.pill}</span>
              <button className="buy-pill-btn" onClick={(e) => {
                e.stopPropagation();
                navigate(card.path);
              }}>
                Open Note <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SADSegment08;
