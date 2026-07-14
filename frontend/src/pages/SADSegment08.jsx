import DynamicUploadsSection from '../components/DynamicUploadsSection';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const noteImages = [
  { src: '/sad-seg08-01-selection-criteria.jpg', alt: 'Software & Hardware Selection Criteria' },
  { src: '/sad-seg08-02-threats.jpg', alt: 'Types of Threats with Examples' },
  { src: '/sad-seg08-03-security-issues.jpg', alt: 'Security Issues in Information Systems' },
  { src: '/sad-seg08-04-vulnerabilities.jpg', alt: 'System Vulnerabilities – Hardware, Software, Data' },
  { src: '/sad-seg08-05-vulnerability-vs-threat.jpg', alt: 'Difference Between Security Vulnerability and Security Threat' },
];

const SADSegment08 = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      padding: '6.5rem 2rem 4rem 2rem',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <button
          onClick={() => navigate('/system-analysis-design')}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            margin: 0,
            background: 'linear-gradient(135deg, #ff8a00, #e52e71)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Segment 08 – System Implementation & Security
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.4rem 0 0 0', fontSize: '1rem' }}>
            Handwritten notes on selection criteria, threats, security issues, and vulnerabilities.
          </p>
        </div>
      </div>

      {/* Notes Images – displayed serially */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        {noteImages.map((img, idx) => (
          <div key={idx} style={{
            background: 'var(--card-bg, #111319)',
            border: '1px solid var(--card-border, rgba(255,255,255,0.06))',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }}>
            {/* Image number label */}
            <div style={{
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #ff8a00, #e52e71)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.8rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '50px',
                flexShrink: 0,
              }}>
                {idx + 1} / {noteImages.length}
              </span>
              <span style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '0.9rem', fontWeight: 600 }}>
                {img.alt}
              </span>
            </div>
            {/* Actual note image */}
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <DynamicUploadsSection course="sad" segment="08" />
    </div>
  );
};

export default SADSegment08;
