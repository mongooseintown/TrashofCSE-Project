import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './EEE.css';

const CAInterfacingHub = () => {
  const navigate = useNavigate();

  const cardsData = [
    {
      title: 'CPU-I/O Interfacing Schemes',
      subtitle: 'Memory-Mapped vs Isolated I/O',
      desc: 'Understand how the CPU communicates with peripheral devices using Memory-Mapped I/O and Isolated (Port-Mapped) I/O schemes.',
      cover: '/ca-intro-cover.png',
      path: '/computer-architecture/interfacing-schemes',
      pill: 'Interfacing'
    },
    {
      title: 'Interrupts',
      subtitle: 'Interrupt Handling & Mechanism',
      desc: 'Learn about hardware interrupts, ISR (Interrupt Service Routines), interrupt priorities, daisy chaining, and vector interrupts.',
      cover: '/ca-clocking-cover.png',
      path: '/computer-architecture/interrupts',
      pill: 'Interrupts'
    },
    {
      title: 'Direct Memory Access (DMA)',
      subtitle: 'High-Speed Block Data Transfer',
      desc: 'Study how DMA Controllers transfer data directly between I/O peripherals and main memory without continuous CPU intervention.',
      cover: '/ca-control-cover.png',
      path: '/computer-architecture/dma',
      pill: 'DMA'
    },
    {
      title: 'Buses & Protocols',
      subtitle: 'System Bus Communication',
      desc: 'Explore Data, Address, and Control bus functional groups, synchronous vs asynchronous bus designs, and handshaking protocols.',
      cover: '/ca-hardware-cover.png',
      path: '/computer-architecture/buses-protocols',
      pill: 'Buses'
    }
  ];

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button 
          onClick={() => navigate('/computer-architecture/segment-08')} 
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
          <h1>Interfacing Processors & Peripherals (Interrupt, DMA)</h1>
          <p>Explore all topics and lecture notes under Interfacing, Interrupts, and DMA.</p>
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

export default CAInterfacingHub;
