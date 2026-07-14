import DynamicUploadsSection from '../components/DynamicUploadsSection';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './EEE.css';

const CASegment06 = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Suggestions from Shafiul Sir and Solve',
      sub: 'Shafiul Sir Suggestions & Solutions',
      desc: 'Study pipelining definition, working principles, MIPS instruction execution timing charts, benefits, limitations, and hazard explanations recommended by Shafiul Sir.',
      path: '/computer-architecture/segment-06/shafiul-suggestions-solve',
      cover: '/ca-seg06-cover.png',
      pill: 'Suggestions & Solve'
    },
    {
      title: 'Suggestions from Mahir Sir and Solve',
      sub: 'Mahir Sir Suggestions & Solutions',
      desc: 'Access pipelining lecture slides, timing diagrams, example problems, and MIPS pipelined execution solutions recommended by Mahir Sir.',
      path: '/computer-architecture/segment-06/mahir-suggestions-solve',
      cover: '/ca-seg06-cover.png',
      pill: 'Suggestions & Solve'
    },
    {
      title: 'Previous Question and Solve',
      sub: 'MIPS Pipelining Exam Q&A Solve',
      desc: 'Study past exam questions on MIPS 5-stage pipelining, execution delays, speedup calculations, pipeline hazards (structural, data, control), stalls, forwarding, and instruction reordering.',
      path: '/computer-architecture/segment-06/previous-question-solve',
      cover: '/ca-seg06-cover.png',
      pill: 'Exam Q&A Solve'
    }
  ];

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
          <h1>Segment 06 Portal</h1>
          <p>Instruction Pipelining & Execution Hazards</p>
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
      <DynamicUploadsSection course="ca" segment="06" />
    </div>
  );
};

export default CASegment06;
