import React, { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import './EEE.css';

const EEE = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header">
        <h1>EEE Study Portal</h1>
        <p>Interactive study cards and lecture notes modeled after modern designs.</p>
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        {/* PV Cell Product-Style Card */}
        <div className="product-card" onClick={() => setIsModalOpen(true)}>
          {/* Card Top Image Cover */}
          <div className="card-img-container">
            <span className="card-tag-badge">Best Seller</span>
            <div className="card-logo-badge">EEE</div>
            
            <img 
              src="/pv-cell-cover.png" 
              alt="Photovoltaic Solar Cell" 
              className="card-img" 
            />

            {/* Pagination dots mimicking Nike card pagination */}
            <div className="card-dots">
              <span className="active"></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Card Content details */}
          <div className="card-details-section">
            <h3>Photovoltaic Cell (PV Cell)</h3>
            <span className="card-sub">Solar Energy Conversion</span>
            <p className="card-desc">
              Explore the detailed physical layer structure, depletion boundary behavior, and voltage setup mechanisms.
            </p>
          </div>

          {/* Card Footer row */}
          <div className="card-footer-row">
            <span className="price-pill">EEE 101</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}>
              Open Note <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal containing handwritten notes serially */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <h2>PV Cell - Handwritten Lecture Notes</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)} title="Close">
                <X size={20} />
              </button>
            </div>

            {/* Modal notes body displaying images serially */}
            <div className="modal-notes-body">
              <div className="handnote-image-container">
                <span className="handnote-image-title">Part 1: Layer Schematic and Construction Diagram</span>
                <img 
                  src="/pv-cell-2.png" 
                  alt="PV Cell Schematic Diagram" 
                  className="modal-handnote-img" 
                />
              </div>

              <div className="handnote-image-container">
                <span className="handnote-image-title">Part 2: Working Mechanism & Charge Transitions</span>
                <img 
                  src="/pv-cell-1.png" 
                  alt="Working Mechanism Details" 
                  className="modal-handnote-img" 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EEE;
