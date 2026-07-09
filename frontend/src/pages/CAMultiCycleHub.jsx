import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './EEE.css';

const CAMultiCycleHub = () => {
  const navigate = useNavigate();

  const cardsData = [
    {
      title: 'Single-cycle vs. Multi-cycle Difference',
      subtitle: 'Processor Datapath Comparison',
      desc: 'Understand the core differences in datapath structures, execution times, hardware sharing, and temporary registers.',
      cover: '/ca-datapath-cover.png',
      path: '/computer-architecture/single-vs-multi-cycle',
      pill: 'Difference'
    },
    {
      title: 'Temporary Registers',
      subtitle: 'Temporary Registers & Purpose',
      desc: 'Explore the functional roles and need for Instruction, Memory Data, A, B, and ALUOut registers in multicycle execution.',
      cover: '/ca-temp-regs-cover.png',
      path: '/computer-architecture/temp-registers',
      pill: 'Registers'
    },
    {
      title: 'Hardware/Multiplexer Changes',
      subtitle: 'Mux and Input Scaling',
      desc: 'Analyze changes needed for ALU input multiplexers to scale from a single-cycle to a shared multicycle datapath.',
      cover: '/ca-hardware-cover.png',
      path: '/computer-architecture/hardware-changes',
      pill: 'Mux'
    },
    {
      title: 'Multi-cycle Datapath Design (Figure)',
      subtitle: 'Structural Processor Schematics',
      desc: 'View comprehensive visual diagrams showing unified hardware memory, registers, and interconnect buses.',
      cover: '/ca-design-cover.png',
      path: '/computer-architecture/datapath-design',
      pill: 'Schematic'
    },
    {
      title: 'Control Signals',
      subtitle: 'Control Unit Line Mapping',
      desc: 'Review control flags, multiplexer selectors, register write enables, and state signals in multicycle execution.',
      cover: '/ca-control-cover.png',
      path: '/computer-architecture/control-signals',
      pill: 'Control'
    },
    {
      title: 'Execution Steps',
      subtitle: 'Execution Steps & States',
      desc: 'Step through instruction phases (fetch, decode, execute) and finite state machine logical transitions.',
      cover: '/ca-logic-cover.png',
      path: '/computer-architecture/logic-elements',
      pill: 'Execution'
    }
  ];

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          onClick={() => navigate('/computer-architecture/segment-05')} 
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
          <h1>Multi-Cycle</h1>
          <p>Explore all topics and lecture notes under Multi-Cycle Datapath & Control.</p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid" style={{ marginTop: '2rem' }}>
        {cardsData.map((card, idx) => (
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
              <span className="card-sub">{card.subtitle}</span>
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

export default CAMultiCycleHub;
