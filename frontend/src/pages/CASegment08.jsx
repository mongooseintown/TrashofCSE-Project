import DynamicUploadsSection from '../components/DynamicUploadsSection';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './EEE.css';

const CASegment08 = () => {
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
          <h1>Segment 08 Portal</h1>
          <p>Interfacing Processors and Peripherals (Interrupt, DMA, Buses)</p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid" style={{ marginTop: '2.5rem' }}>
        {/* Card 1: DMA */}
        <div className="product-card" onClick={() => navigate('/computer-architecture/segment-08/dma')}>
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">CSE</div>
            <img 
              src="/ca-cache-cover.png" 
              alt="Direct Memory Access (DMA)" 
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
            <h3>Direct Memory Access (DMA)</h3>
            <span className="card-sub">Purpose, Scope & Mechanisms</span>
            <p className="card-desc">
              Understand how DMA enables high-speed peripheral data transfer directly to/from main memory without CPU intervention. Includes Autumn 2025 and 2023 questions.
            </p>
          </div>
          <div className="card-footer-row">
            <span className="price-pill">DMA</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/computer-architecture/segment-08/dma');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 2: Handshaking Protocol */}
        <div className="product-card" onClick={() => navigate('/computer-architecture/segment-08/handshaking-protocol')}>
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">CSE</div>
            <img 
              src="/ca-io-cover.png" 
              alt="Handshaking Protocol" 
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
            <h3>Handshaking Protocol</h3>
            <span className="card-sub">Asynchronous Data Transfer</span>
            <p className="card-desc">
              Study the handshaking protocol steps, source/destination initiated asynchronous transfers, timing diagrams, and read request examples.
            </p>
          </div>
          <div className="card-footer-row">
            <span className="price-pill">Protocol</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/computer-architecture/segment-08/handshaking-protocol');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 3: Synchronous and Asynchronous */}
        <div className="product-card" onClick={() => navigate('/computer-architecture/segment-08/sync-async')}>
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">CSE</div>
            <img 
              src="/ca-clocking-cover.png" 
              alt="Synchronous and Asynchronous Bus" 
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
            <h3>Synchronous and Asynchronous</h3>
            <span className="card-sub">Bus Differences & Bandwidth</span>
            <p className="card-desc">
              Compare synchronous vs asynchronous bus lines, characteristics table, and solve bandwidth mathematical word problems.
            </p>
          </div>
          <div className="card-footer-row">
            <span className="price-pill">Buses</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/computer-architecture/segment-08/sync-async');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 4: I/O Interface */}
        <div className="product-card" onClick={() => navigate('/computer-architecture/segment-08/io-interface')}>
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">CSE</div>
            <img 
              src="/ca-intro-cover.png" 
              alt="I/O Interface Schemes" 
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
            <h3>I/O Interface</h3>
            <span className="card-sub">Memory-Mapped vs Isolated I/O</span>
            <p className="card-desc">
              Explore schemes used by CPU to communicate with interfaces: Memory-Mapped I/O and Isolated (Port-Mapped) I/O with pros & cons.
            </p>
          </div>
          <div className="card-footer-row">
            <span className="price-pill">Interface</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/computer-architecture/segment-08/io-interface');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 5: Buses */}
        <div className="product-card" onClick={() => navigate('/computer-architecture/segment-08/buses')}>
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">CSE</div>
            <img 
              src="/ca-hardware-cover.png" 
              alt="System Buses" 
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
            <h3>Buses</h3>
            <span className="card-sub">Data, Address & Control Buses</span>
            <p className="card-desc">
              Understand the system bus functional groups, detailing bidirectional Data Bus, unidirectional Address Bus, and Control Bus lines.
            </p>
          </div>
          <div className="card-footer-row">
            <span className="price-pill">Buses</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/computer-architecture/segment-08/buses');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 6: Define Terms */}
        <div className="product-card" onClick={() => navigate('/computer-architecture/segment-08/define-terms')}>
          <div className="card-img-container">
            <span className="card-tag-badge">New</span>
            <div className="card-logo-badge">CSE</div>
            <img 
              src="/ca-design-cover.png" 
              alt="Define Terms" 
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
            <h3>Define Terms</h3>
            <span className="card-sub">Interrupts, DMA, I/O & RAID</span>
            <p className="card-desc">
              Get brief, clear, and comprehensive definitions of essential terms: Interrupts, DMA, I/O Devices, and RAID technology.
            </p>
          </div>
          <div className="card-footer-row">
            <span className="price-pill">Definitions</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/computer-architecture/segment-08/define-terms');
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <DynamicUploadsSection course="ca" segment="08" />
    </div>
  );
};

export default CASegment08;
