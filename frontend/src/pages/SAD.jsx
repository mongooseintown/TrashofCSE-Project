import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Lock, HelpCircle } from 'lucide-react';
import './SAD.css';

const SAD = () => {
  const navigate = useNavigate();

  // Segment 8 active slide control state
  const [activeSlide, setActiveSlide] = useState(0);

  // Slides thumbnail list for Segment 08
  const seg08Slides = [
    { src: '/sad-seg08-cover.png', label: 'Cover' },
    { src: '/logo.png', label: 'Outline' },
    { src: '/sad-seg08-cover.png', label: 'Implementation' }
  ];

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : seg08Slides.length - 1));
  };

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev < seg08Slides.length - 1 ? prev + 1 : 0));
  };

  const segments = [
    {
      id: '04',
      title: 'Segment 04',
      sub: 'Requirements & Modeling',
      desc: 'Requirement gathering, DFDs, Use Case analysis, and feasibility assessment.',
      locked: true,
      price: '$139.99',
      originalPrice: '$169.99',
      cover: '/logo.png',
      pill: 'SAD-3611'
    },
    {
      id: '05',
      title: 'Segment 05',
      sub: 'System Design Phase',
      desc: 'Software design specification, UML schemas, Class diagrams, and design methodologies.',
      locked: true,
      price: '$139.99',
      originalPrice: '$169.99',
      cover: '/logo.png',
      pill: 'SAD-3611'
    },
    {
      id: '06',
      title: 'Segment 06',
      sub: 'Testing & Implementation',
      desc: 'System installation, verification procedures, validation models, and maintenance.',
      locked: true,
      price: '$139.99',
      originalPrice: '$169.99',
      cover: '/logo.png',
      pill: 'SAD-3611'
    },
    {
      id: '07',
      title: 'Segment 07',
      sub: 'Object-Oriented SAD',
      desc: 'Modern system design using OOD structures, sequence diagrams, and frameworks.',
      locked: true,
      price: '$139.99',
      originalPrice: '$169.99',
      cover: '/logo.png',
      pill: 'SAD-3611'
    },
    {
      id: '08',
      title: 'Segment 08',
      sub: 'System Implementation & Support',
      desc: 'Coding, testing, installation, user documentation, training, and support workflows.',
      locked: false,
      price: '$139.99',
      originalPrice: '$169.99',
      cover: seg08Slides[activeSlide].src,
      pill: 'SAD-3611'
    }
  ];

  return (
    <div className="sad-container">
      {/* Header */}
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

      {/* Grid */}
      <div className="sad-grid">
        {segments.map((seg) => {
          if (seg.locked) {
            return (
              <div key={seg.id} className="sad-card-4 locked">
                {/* Lock Action Button (Top Right) */}
                <div className="sad-card-action-btn is-locked" title="Locked Segment">
                  <Lock size={18} />
                </div>

                {/* Locked Overlay */}
                <div className="sad-locked-overlay">
                  <div className="sad-locked-badge">
                    <Lock size={12} />
                    <span>LOCKED</span>
                  </div>
                </div>

                {/* Image Wrapper */}
                <div className="sad-card-img-wrapper">
                  <img src={seg.cover} alt={seg.title} className="sad-card-img" style={{ filter: 'grayscale(1)' }} />
                </div>

                {/* Dummy Thumbnail Row */}
                <div className="sad-thumb-row" style={{ opacity: 0.3 }}>
                  <div className="sad-thumb-item active"><div style={{ width: '80%', height: '80%', background: '#ff6b35', opacity: 0.2, borderRadius: '4px' }} /></div>
                  <div className="sad-thumb-item"><div style={{ width: '80%', height: '80%', background: '#fff', opacity: 0.1, borderRadius: '4px' }} /></div>
                  <div className="sad-thumb-item"><div style={{ width: '80%', height: '80%', background: '#fff', opacity: 0.1, borderRadius: '4px' }} /></div>
                </div>

                {/* Details */}
                <div className="sad-card-details">
                  <span className="sad-card-sub">{seg.sub}</span>
                  <h3 className="sad-card-title">{seg.title}</h3>
                </div>

                {/* Price Info */}
                <div className="sad-card-price-row">
                  <span className="sad-price-current">{seg.price}</span>
                  <span className="sad-price-original">{seg.originalPrice}</span>
                </div>

                {/* Quantity Style Selector (Muted / Locked) */}
                <div className="sad-card-footer">
                  <div className="sad-counter-container" style={{ opacity: 0.5 }}>
                    <button className="sad-counter-btn" disabled>-</button>
                    <span className="sad-counter-value">Locked</span>
                    <button className="sad-counter-btn" disabled>+</button>
                  </div>
                </div>
              </div>
            );
          } else {
            // Unlocked Segment 8
            return (
              <div 
                key={seg.id} 
                className="sad-card-4 unlocked" 
                onClick={() => navigate('/system-analysis-design/segment-08')}
              >
                {/* Heart Action Button (Top Right) */}
                <button 
                  className="sad-card-action-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Added to your favorite study segments!');
                  }}
                  title="Favorite Segment"
                >
                  <Heart size={18} fill="#ff6b35" />
                </button>

                {/* Image Wrapper */}
                <div className="sad-card-img-wrapper">
                  <img src={seg.cover} alt={seg.title} className="sad-card-img" />
                </div>

                {/* Active Thumbnail Slide Selector */}
                <div className="sad-thumb-row">
                  {seg08Slides.map((slide, sIdx) => (
                    <div 
                      key={sIdx} 
                      className={`sad-thumb-item ${activeSlide === sIdx ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide(sIdx);
                      }}
                      title={slide.label}
                    >
                      <img src={slide.src} alt={slide.label} className="sad-thumb-img" />
                    </div>
                  ))}
                </div>

                {/* Details */}
                <div className="sad-card-details">
                  <span className="sad-card-sub">{seg.sub}</span>
                  <h3 className="sad-card-title">{seg.title}</h3>
                </div>

                {/* Price Info */}
                <div className="sad-card-price-row">
                  <span className="sad-price-current">{seg.price}</span>
                  <span className="sad-price-original">{seg.originalPrice}</span>
                </div>

                {/* Quantity Style Selector (Active) */}
                <div className="sad-card-footer">
                  <div className="sad-counter-container">
                    <button 
                      className="sad-counter-btn" 
                      onClick={handlePrevSlide}
                      title="Previous Preview"
                    >
                      -
                    </button>
                    <span className="sad-counter-value">
                      Page {activeSlide + 1}
                    </span>
                    <button 
                      className="sad-counter-btn" 
                      onClick={handleNextSlide}
                      title="Next Preview"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SAD;
