import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FolderOpen, Sparkles } from 'lucide-react';
import { getApiUrl } from '../config';
import DynamicNoteCard from './DynamicNoteCard';
import StudentContributionModal from './StudentContributionModal';

const DynamicUploadsSection = ({ course, segment }) => {
  const navigate = useNavigate();
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        Loading contributions...
      </div>
    );
  }

  return (
    <div style={{ marginTop: '4rem', padding: '0 1rem' }}>
      {/* Title & Contribute Button Header */}
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
            Dynamic Shared Resources
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.3rem 0 0 0' }}>
            Materials shared by moderators and student contributors
          </p>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            background: 'linear-gradient(135deg, rgba(229, 46, 113, 0.15) 0%, rgba(255, 138, 0, 0.15) 100%)',
            border: '1px solid rgba(229, 46, 113, 0.3)',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.88rem',
            padding: '0.65rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.borderColor = 'rgba(229, 46, 113, 0.6)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(229, 46, 113, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.borderColor = 'rgba(229, 46, 113, 0.3)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <UploadCloud size={16} /> Contribute Notes
        </button>
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
          <p style={{ margin: 0, fontWeight: 600 }}>No dynamic notes uploaded yet for this segment.</p>
          <span style={{ fontSize: '0.8rem' }}>Be the first to contribute by clicking the button above!</span>
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

      {/* Modal */}
      <StudentContributionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchUploads();
        }}
        course={course}
        segment={segment}
      />
    </div>
  );
};

export default DynamicUploadsSection;
