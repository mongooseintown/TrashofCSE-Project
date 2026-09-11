import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, Sparkles } from 'lucide-react';
import { getApiUrl } from '../config';
import DynamicNoteCard from './DynamicNoteCard';

const DynamicUploadsSection = ({ course, segment }) => {
  const navigate = useNavigate();
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUploads = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl(`/api/materials?course=${course}&segment=${segment}`), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUploads(data);
      }
    } catch (err) {
      console.error('Error fetching dynamic uploads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, [course, segment]);

  if (loading) {
    return (
      <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading resources...
      </div>
    );
  }

  return (
    <div style={{ marginTop: '4rem', padding: '0 1rem' }}>
      {/* Title Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        paddingBottom: '1rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: '#fff'
          }}>
            <FolderOpen size={20} className="glow-icon" style={{ color: '#e52e71' }} /> 
            Course Resources
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.3rem 0 0 0' }}>
            Reference materials and curated solutions
          </p>
        </div>
      </div>

      {/* Grid List */}
      {uploads.length === 0 ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px dashed rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '4rem 2rem',
          textAlign: 'center',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.8rem'
        }}>
          <Sparkles size={32} style={{ color: '#e52e71', opacity: 0.6 }} />
          <p style={{ margin: 0, fontWeight: 600 }}>No materials uploaded yet for this segment.</p>
        </div>
      ) : (
        <div className="products-grid">
          {uploads.map((upload) => (
            <DynamicNoteCard
              key={upload._id}
              upload={upload}
              onClick={() => navigate(`/materials/view/${upload._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicUploadsSection;
