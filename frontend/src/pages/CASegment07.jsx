import DynamicUploadsSection from '../components/DynamicUploadsSection';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './EEE.css';

const CASegment07 = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Locality of Reference',
      sub: 'Temporal vs Spatial Locality Proofs',
      desc: 'Learn about Locality of Reference principles, array iteration optimization benefits, and how CPU cache lines handle spatial cache hits.',
      path: '/computer-architecture/segment-07/locality',
      cover: '/ca-clocking-cover.png',
      pill: 'Locality'
    },
    {
      title: 'Cache Memory & Terminology',
      sub: 'Core Mechanisms, Hit/Miss & Hierarchy Layers',
      desc: 'Explore the Temporal/Spatial Locality principles, Cache hierarchy levels (L1, L2, L3), Hit rates, Miss penalties, and the 3Cs miss model.',
      path: '/computer-architecture/segment-07/cache-memory',
      cover: '/ca-cache-cover.png',
      pill: 'Cache Memory'
    },
    {
      title: 'Cache Mapping Architectures',
      sub: 'Direct-Mapped, Associative & Set-Associative',
      desc: 'Study Cache Mapping classifications, block mapping math problem solutions, tag calculation formulas, and comparative details.',
      path: '/computer-architecture/segment-07/cache-mapping',
      cover: '/ca-cache-cover.png',
      pill: 'Cache Mapping'
    },
    {
      title: 'Virtual Memory',
      sub: 'Concepts, Page Tables & Visual Diagrams',
      desc: 'Study Virtual Memory fundamentals, mapping tables translating virtual-to-physical RAM addresses, and core benefits.',
      path: '/computer-architecture/segment-07/virtual-memory',
      cover: '/ca-virtual-cover.png',
      pill: 'Virtual Memory'
    },
    {
      title: 'Page Fault',
      sub: 'Mechanisms & How To Reduce Page Faults',
      desc: 'Analyze the high cost of page faults, temporal/spatial locality benefits, write-back schemes, LRU replacements, and how the OS resolves them.',
      path: '/computer-architecture/segment-07/page-fault',
      cover: '/ca-pipeline-cover.png',
      pill: 'Page Fault'
    },
    {
      title: 'Translation Lookaside Buffer (TLB)',
      sub: 'Paging, Flowchart & Miss Handling',
      desc: 'Understand the Translation Lookaside Buffer (TLB) cache structure, working principles, Paging translation flowcharts, and step-by-step miss resolution.',
      path: '/computer-architecture/segment-07/tlb',
      cover: '/ca-virtual-cover.png',
      pill: 'TLB Cache'
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
          <h1>Segment 07 Portal</h1>
          <p>Memory Organization & Cache Systems</p>
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
      <DynamicUploadsSection course="ca" segment="07" />
    </div>
  );
};

export default CASegment07;
