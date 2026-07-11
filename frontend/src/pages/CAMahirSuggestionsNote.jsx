import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Maximize2, Minimize2, Download, ExternalLink } from 'lucide-react';
import './PVCellNote.css';
import './CATLBNote.css';

const CAMahirSuggestionsNote = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFullscreen]);

  return (
    <div className="note-page-container">
      {/* Header Row */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/computer-architecture/segment-06')} 
          className="note-back-btn"
        >
          <ArrowLeft size={16} /> Back to Segment 06
        </button>
        <div>
          <h1>Suggestions from Mahir Sir & Solve</h1>
        </div>
      </div>

      {/* Info Badge */}
      <div className="tlb-info-badge">
        <InfoIcon />
        <span>You can read the PDF directly below. Click the "Fullscreen" button to open the PDF viewer in a full view!</span>
      </div>

      {/* Embedded PDF Viewer Container */}
      <div className="tlb-pdf-container">
        <div className="tlb-pdf-header-controls">
          <span className="pdf-filename">Suggestions from Mahir Sir & Solve.pdf</span>
          <div className="pdf-header-actions">
            <button 
              className="pdf-action-btn" 
              onClick={() => setIsFullscreen(true)} 
              title="Toggle Fullscreen View"
            >
              <Maximize2 size={16} />
              <span>Fullscreen</span>
            </button>
            <a 
              href="/ca-seg06-suggestions.pdf" 
              download="CA_Segment06_Mahir_Suggestions_Solve.pdf" 
              className="pdf-action-btn" 
              title="Download PDF"
            >
              <Download size={16} />
              <span>Download</span>
            </a>
            <a 
              href="/ca-seg06-suggestions.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="pdf-action-btn" 
              title="Open in New Tab"
            >
              <ExternalLink size={16} />
              <span>Open Link</span>
            </a>
          </div>
        </div>

        {/* Embedded PDF iframe */}
        <div className="pdf-frame-wrapper">
          <iframe 
            src="/ca-seg06-suggestions.pdf#toolbar=1" 
            title="Mahir Sir Suggestions & Solve PDF"
            width="100%" 
            height="700px" 
            className="tlb-pdf-iframe"
          />
        </div>

        <div className="pdf-fallback-footer">
          <p>
            Having trouble viewing the PDF? 
            <a href="/ca-seg06-suggestions.pdf" target="_blank" rel="noopener noreferrer"> Click here to open it directly</a> or 
            <a href="/ca-seg06-suggestions.pdf" download="CA_Segment06_Mahir_Suggestions_Solve.pdf"> download it</a>.
          </p>
        </div>
      </div>

      {/* Fullscreen Overlay PDF Viewer */}
      {isFullscreen && (
        <div className="pdf-fullscreen-overlay">
          <div className="fullscreen-header">
            <span className="fullscreen-title">Suggestions from Mahir Sir & Solve.pdf - Document Viewer</span>
            <div className="fullscreen-actions">
              <a 
                href="/ca-seg06-suggestions.pdf" 
                download="CA_Segment06_Mahir_Suggestions_Solve.pdf" 
                className="fullscreen-action-btn"
                title="Download PDF"
              >
                <Download size={18} />
              </a>
              <button 
                className="fullscreen-close-btn" 
                onClick={() => setIsFullscreen(false)} 
                title="Close Fullscreen (Esc)"
              >
                <Minimize2 size={20} />
                <span>Exit Fullscreen</span>
              </button>
            </div>
          </div>
          <div className="fullscreen-body">
            <iframe 
              src="/ca-seg06-suggestions.pdf#toolbar=1" 
              title="Mahir Sir Suggestions & Solve PDF Fullscreen"
              width="100%" 
              height="100%" 
              className="fullscreen-iframe"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Internal icon component
const InfoIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="lucide lucide-info"
    style={{ color: '#60a5fa', flexShrink: 0 }}
  >
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </svg>
);

export default CAMahirSuggestionsNote;
