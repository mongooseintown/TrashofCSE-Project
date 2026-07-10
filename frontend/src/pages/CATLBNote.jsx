import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw, X, ChevronLeft, ChevronRight, Download, ExternalLink } from 'lucide-react';
import './PVCellNote.css';
import './CATLBNote.css';

const CATLBNote = () => {
  const navigate = useNavigate();

  // PDF Page images
  const pages = [
    { src: '/ca-tlb-page1.png', title: 'TLB Definition & Function (Page 1)' },
    { src: '/ca-tlb-page2.png', title: 'TLB Working Principle (Page 2)' },
    { src: '/ca-tlb-page3.png', title: 'TLB Flowchart & Operation Diagram (Page 3)' },
    { src: '/ca-tlb-page4.png', title: 'TLB Miss Step-by-Step Resolution (Page 4)' },
  ];

  // Fullscreen Viewer Modal State
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  // Keyboard navigation inside the viewer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isViewerOpen) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        closeViewer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isViewerOpen, activeIndex]);

  const openViewer = (index) => {
    setActiveIndex(index);
    setZoom(1);
    setIsViewerOpen(true);
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    document.body.style.overflow = 'auto'; // Unlock background scroll
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === pages.length - 1 ? 0 : prev + 1));
    setZoom(1); // Reset zoom on page flip
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
    setZoom(1); // Reset zoom on page flip
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  return (
    <div className="note-page-container">
      {/* Header Row */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/computer-architecture/segment-07')} 
          className="note-back-btn"
        >
          <ArrowLeft size={16} /> Back to Segment 07
        </button>
        <div>
          <h1>Translation Lookaside Buffer (TLB) Notes</h1>
        </div>
      </div>

      {/* Info Badge */}
      <div className="tlb-info-badge">
        <InfoIcon />
        <span>Click on any page below to open the interactive fullscreen PDF-style document viewer!</span>
      </div>

      {/* Pages list layout */}
      <div className="note-images-list">
        {pages.map((page, idx) => (
          <div key={idx} className="note-image-card pointer-cursor" onClick={() => openViewer(idx)}>
            <div className="note-image-caption-row">
              <span className="note-image-caption">{page.title}</span>
              <span className="click-to-expand">Click to expand</span>
            </div>
            <div className="note-image-wrapper">
              <img 
                src={page.src} 
                alt={page.title} 
                className="note-img note-preview-img" 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Fullscreen PDF-Style Document Viewer Modal */}
      {isViewerOpen && (
        <div className="pdf-viewer-overlay">
          {/* Top Control Bar */}
          <div className="pdf-viewer-header">
            <span className="viewer-title">{pages[activeIndex].title}</span>
            
            <div className="viewer-controls">
              {/* Zoom Buttons */}
              <button onClick={handleZoomOut} className="control-btn" title="Zoom Out">
                <ZoomOut size={18} />
              </button>
              <span className="zoom-percentage">{Math.round(zoom * 100)}%</span>
              <button onClick={handleZoomIn} className="control-btn" title="Zoom In">
                <ZoomIn size={18} />
              </button>
              <button onClick={handleResetZoom} className="control-btn" title="Reset Zoom">
                <RotateCcw size={16} />
              </button>
              
              <div className="control-divider"></div>

              {/* Download / Open in tab */}
              <a href={pages[activeIndex].src} download className="control-btn" title="Download Image">
                <Download size={18} />
              </a>
              <a href={pages[activeIndex].src} target="_blank" rel="noopener noreferrer" className="control-btn" title="Open in New Tab">
                <ExternalLink size={18} />
              </a>

              <div className="control-divider"></div>

              {/* Close button */}
              <button onClick={closeViewer} className="control-btn close-btn" title="Close (Esc)">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main Viewer Body (Image container) */}
          <div className="pdf-viewer-body">
            {/* Left Page Arrow */}
            <button className="nav-arrow left" onClick={handlePrev} title="Previous Page (←)">
              <ChevronLeft size={36} />
            </button>

            {/* Document display frame */}
            <div className="pdf-viewer-image-container">
              <img
                src={pages[activeIndex].src}
                alt={pages[activeIndex].title}
                className="viewer-main-img"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>

            {/* Right Page Arrow */}
            <button className="nav-arrow right" onClick={handleNext} title="Next Page (→)">
              <ChevronRight size={36} />
            </button>
          </div>

          {/* Footer page tracker */}
          <div className="pdf-viewer-footer">
            <span>Page {activeIndex + 1} of {pages.length}</span>
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

export default CATLBNote;
