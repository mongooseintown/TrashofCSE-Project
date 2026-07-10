import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './EEE.css';

const ComputerArchitecture = () => {
  const navigate = useNavigate();

  const cardsData = [
    {
      title: 'Segment 05',
      subtitle: 'Datapath & Control Design',
      desc: 'Study the differences between single-cycle and multi-cycle datapaths, control unit signals, and operations.',
      cover: '/ca-seg05-cover.png',
      path: '/computer-architecture/segment-05',
      pill: 'CSE-3523',
      badge: 'New',
      badgeColor: 'var(--accent-teal)'
    },
    {
      title: 'Segment 06',
      subtitle: 'Pipelining & Hazards',
      desc: 'Analyze instruction pipelining, execution stages, hazards (structural, data, control), and mitigation schemes like forwarding and stalling.',
      cover: '/ca-seg06-cover.png',
      path: '/computer-architecture/segment-06',
      pill: 'CSE-3523',
      badge: 'New',
      badgeColor: 'var(--accent-teal)'
    },
    {
      title: 'Segment 07',
      subtitle: 'Virtual Memory & TLB',
      desc: 'Learn about Translation Lookaside Buffer (TLB), working principles, flowchart logic, paging operations, and page translation miss scenarios.',
      cover: '/ca-seg07-cover.png',
      path: '/computer-architecture/segment-07',
      pill: 'CSE-3523',
      badge: 'New',
      badgeColor: 'var(--accent-teal)'
    },
    {
      title: 'Segment 08',
      subtitle: 'Interfacing Processors & Peripherals',
      desc: 'Learn about interfacing processors with external peripherals, handling interrupts, direct memory access (DMA), and communication buses.',
      cover: '/ca-seg08-cover.png',
      path: '/computer-architecture/segment-08',
      pill: 'CSE-3523',
      badge: 'New',
      badgeColor: 'var(--accent-teal)'
    },
    {
      title: 'Suggestions From Mahir Shadid Sir',
      subtitle: 'Exam Suggestions & Chapters Guidelines',
      desc: 'Get exam suggestions, chapter-wise highlights, and question guidelines from Mahir Shadid Sir for Computer Architecture course.',
      cover: '/ca-suggestions-cover.png',
      path: '/computer-architecture/suggestions',
      pill: 'Guidelines',
      badge: 'Special',
      badgeColor: '#d4a017'
    },
    {
      title: 'Suggestions From Shafiullah Sir',
      subtitle: 'Exam Q&A & Architecture Guidelines',
      desc: 'Access comprehensive exam preparation questions, topic summaries, and study guidelines from Shafiullah Sir.',
      cover: '/ca-shafiullah-cover.png',
      path: '/computer-architecture/suggestions-shafiullah',
      pill: 'Guidelines',
      badge: 'Special',
      badgeColor: '#d4a017'
    },
    {
      title: 'Guidelines From Amanullah Sir',
      subtitle: 'Semester Final Exam Syllabus',
      desc: 'Review official course outline, Group-A & Group-B topics distribution, and questions credit weight criteria.',
      cover: '/ca-amanullah-cover.png',
      path: '/computer-architecture/guidelines-amanullah',
      pill: 'Syllabus',
      badge: 'Exam',
      badgeColor: '#3b82f6'
    }
  ];

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header">
        <h1>Computer Architecture Portal</h1>
        <p>Interactive study cards, processor datapath notes, and previous questions modeled after modern designs.</p>
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        {cardsData.map((card, idx) => (
          <div key={idx} className="product-card" onClick={() => navigate(card.path)}>
            <div className="card-img-container">
              <span className="card-tag-badge" style={{ background: card.badgeColor }}>
                {card.badge}
              </span>
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

export default ComputerArchitecture;
