import React from 'react';
import { FileText, Image, BookOpen, GraduationCap, Lightbulb, Award } from 'lucide-react';
import './DynamicNoteCard.css';

const contentTypeConfig = {
  pdf: { label: "Sir's PDF", icon: <FileText size={14} />, color: '#3b82f6' },
  handnote: { label: 'Handnote', icon: <BookOpen size={14} />, color: '#8b5cf6' },
  slides: { label: 'Slides', icon: <Image size={14} />, color: '#f59e0b' },
  'topper-note': { label: 'Topper Note', icon: <Award size={14} />, color: '#10b981' },
  suggestion: { label: 'Suggestion', icon: <Lightbulb size={14} />, color: '#ef4444' },
  'pq-solve': { label: 'Prev. Q. Solve', icon: <GraduationCap size={14} />, color: '#06b6d4' },
};

const examTypeLabels = {
  mid: 'Mid Term',
  final: 'Final',
  regular: 'Regular'
};

const DynamicNoteCard = ({ upload, onClick }) => {
  const config = contentTypeConfig[upload.contentType] || contentTypeConfig.pdf;
  const firstFile = upload.files?.[0];
  const isImageContent = upload.files?.some(f => f.fileType === 'image');
  const coverUrl = isImageContent && firstFile ? firstFile.url : null;

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(diff / 3600000);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(diff / 86400000);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      className="product-card"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Cover Image */}
      <div className="card-img-container">
        <span className="card-tag-badge" style={{ background: config.color }}>
          {config.icon} {config.label}
        </span>
        <div className="card-logo-badge">
          {examTypeLabels[upload.examType]?.charAt(0) || 'R'}
        </div>
        {coverUrl ? (
          <img src={coverUrl} alt={upload.title} className="card-img" />
        ) : (
          <div
            className="card-img"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${config.color}22, ${config.color}08)`,
              fontSize: '3rem',
              color: config.color,
            }}
          >
            <FileText size={64} strokeWidth={1} />
          </div>
        )}
        <div className="card-dots">
          {upload.files?.map((_, i) => (
            <span key={i} className={i === 0 ? 'active' : ''}></span>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="card-details-section">
        <h3>{upload.title}</h3>
        <span className="card-sub">
          Segment {upload.segment} • {examTypeLabels[upload.examType] || upload.examType}
        </span>
        <p className="card-desc">
          {upload.description || `${config.label} uploaded ${timeAgo(upload.createdAt)}`}
        </p>
      </div>

      {/* Footer */}
      <div className="card-footer-row">
        <span className="price-pill">
          {upload.files?.length || 0} file{upload.files?.length !== 1 ? 's' : ''}
        </span>
        <button className="buy-pill-btn" onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
          View Notes
        </button>
      </div>
    </div>
  );
};

export default DynamicNoteCard;
