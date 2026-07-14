import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download, ExternalLink } from 'lucide-react';
import { getApiUrl } from '../config';

const DynamicSegmentViewer = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(getApiUrl('/api/materials'), {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const found = data.find(m => m._id === materialId);
          setMaterial(found || null);
        }
      } catch (err) {
        console.error('Failed to fetch material:', err);
      }
      setLoading(false);
    };
    fetchMaterial();
  }, [materialId]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)'
      }}>
        Loading...
      </div>
    );
  }

  if (!material) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        gap: '1rem'
      }}>
        <p>Material not found or pending review.</p>
        <button onClick={() => navigate(-1)} style={{
          background: 'var(--button-bg, rgba(255,255,255,0.05))',
          color: 'var(--text-primary)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '0.6rem 1.5rem',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>Go Back</button>
      </div>
    );
  }

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
          onClick={() => navigate(-1)}
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
            flexShrink: 0,
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: 800,
            margin: 0,
            background: 'linear-gradient(135deg, #ff8a00, #e52e71)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {material.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.4rem 0 0 0', fontSize: '0.95rem' }}>
            Segment {material.segment} • {material.contentType.replace('-', ' ')} • {material.files.length} file(s)
          </p>
        </div>
      </div>

      {/* Files displayed serially */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        {material.files.map((file, idx) => (
          <div key={idx} style={{
            background: 'var(--card-bg, #111319)',
            border: '1px solid var(--card-border, rgba(255,255,255,0.06))',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }}>
            {/* File label */}
            <div style={{
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #ff8a00, #e52e71)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '50px',
                }}>
                  {idx + 1} / {material.files.length}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
                  {file.filename}
                </span>
              </div>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.8rem',
                  textDecoration: 'none'
                }}
              >
                {file.fileType === 'pdf' ? <><Download size={14} /> Download</> : <><ExternalLink size={14} /> Open</>}
              </a>
            </div>

            {/* File content */}
            {file.fileType === 'image' ? (
              <img
                src={file.url}
                alt={file.filename}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 2rem',
                gap: '1rem',
              }}>
                <FileText size={48} strokeWidth={1} style={{ color: '#3b82f6' }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  PDF Document — {file.filename}
                </p>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#3b82f6',
                    color: '#fff',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Download size={16} /> Open PDF
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicSegmentViewer;
