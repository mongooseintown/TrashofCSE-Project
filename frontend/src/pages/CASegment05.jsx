import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './EEE.css';

const CASegment05 = () => {
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
          <h1>Segment 05 Portal</h1>
          <p>Explore all topics and lecture notes under Computer Architecture Segment 05.</p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid" style={{ marginTop: '2rem' }}>
        {/* Combined Card: Multi-Cycle */}
        <div className="product-card" onClick={() => navigate('/computer-architecture/segment-05/multi-cycle')}>
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">CSE</div>
            <img 
              src="/ca-multicycle-cover.png" 
              alt="Multi-Cycle Datapath & Control" 
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
            <h3>Multi-Cycle</h3>
            <span className="card-sub">Multi-Cycle Implementation Hub</span>
            <p className="card-desc">
              Explore differences, temporary registers, multiplexer hardware modifications, schematics, control signals, and step-by-step logic execution elements.
            </p>
          </div>
          <div className="card-footer-row">
            <span className="price-pill">6 Topics</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/computer-architecture/segment-05/multi-cycle');
            }}>
              Open Hub <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 2: Suggestions From Mahir Shadid Sir */}
        <div className="product-card" onClick={() => navigate('/computer-architecture/suggestions')}>
          <div className="card-img-container">
            <span className="card-tag-badge" style={{ background: '#d4a017' }}>Special</span>
            <div className="card-logo-badge">CSE</div>
            <img 
              src="/ca-suggestions-cover.png" 
              alt="Suggestions From Mahir Shadid Sir" 
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
            <h3>Suggestions From Mahir Shadid Sir</h3>
            <span className="card-sub">Exam Suggestions & Chapters Guidelines</span>
            <p className="card-desc">
              Get exam suggestions, chapter-wise highlights, and question guidelines from Mahir Shadid Sir for Computer Architecture course.
            </p>
          </div>
          <div className="card-footer-row">
            <span className="price-pill">Guidelines</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/computer-architecture/suggestions');
            }}>
              Open Suggestions <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 3: Suggestions From Shafiullah Sir */}
        <div className="product-card" onClick={() => navigate('/computer-architecture/suggestions-shafiullah')}>
          <div className="card-img-container">
            <span className="card-tag-badge" style={{ background: '#d4a017' }}>Special</span>
            <div className="card-logo-badge">CSE</div>
            <img 
              src="/ca-shafiullah-cover.png" 
              alt="Suggestions From Shafiullah Sir" 
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
            <h3>Suggestions From Shafiullah Sir</h3>
            <span className="card-sub">Exam Q&A & Architecture Guidelines</span>
            <p className="card-desc">
              Access comprehensive exam preparation questions, topic summaries, and study guidelines from Shafiullah Sir.
            </p>
          </div>
          <div className="card-footer-row">
            <span className="price-pill">Guidelines</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/computer-architecture/suggestions-shafiullah');
            }}>
              Open Suggestions <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CASegment05;
