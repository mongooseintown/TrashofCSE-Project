import React from 'react';
import './EEE.css';

const EEE = () => {
  const steps = [
    "When light reaches the p-n junction (depletion region), the light photons can easily enter in the junction through very thin n-type layers.",
    "The light energy in the form of photons, supplies sufficient energy to the junction to create a number of electron-hole pairs.",
    "This light breaks the equilibrium condition of the junctions.",
    "The free electron in the depletion region can quickly come to the n-type side of the junction.",
    "The hole in the depletion region can quickly come to the p-type side of the junction.",
    "The newly created free electron come on the n-type side and the newly created hole come to the p-type side."
  ];

  return (
    <div className="eee-container">
      {/* Page Header */}
      <div className="eee-header">
        <h1>EEE Study Portal</h1>
        <p>Interactive engineering concept visualization cards and lecture resources.</p>
      </div>

      {/* Flashcard Container */}
      <div className="flashcard-container">
        <div className="flashcard">
          {/* Card Header */}
          <div className="flashcard-header">
            <span className="flashcard-title">Photovoltaic (PV) Cell Working Principle</span>
            <span className="flashcard-tag">Concept Card</span>
          </div>

          {/* Card Images (Top Section) */}
          <div className="flashcard-images-section">
            <div className="images-row">
              <div className="pv-image-wrapper" title="PV Cell Layers Diagram">
                <img 
                  src="/pv-cell-2.png" 
                  alt="PV Cell Layers Diagram" 
                  className="pv-cell-img" 
                />
              </div>
              <div className="pv-image-wrapper" title="Working Principle Handwritten Scan">
                <img 
                  src="/pv-cell-1.png" 
                  alt="Working Principle Handwritten Scan" 
                  className="pv-cell-img" 
                />
              </div>
            </div>
          </div>

          {/* Card Text Description (Bottom Section) */}
          <div className="flashcard-text-section">
            <h3 className="concept-subtitle">Working Mechanism Overview</h3>
            <ol className="working-steps">
              {steps.map((step, index) => (
                <li key={index}>
                  <div className="step-num">{index + 1}</div>
                  <div className="step-desc">{step}</div>
                </li>
              ))}
            </ol>

            <div className="concept-summary">
              <strong>P-n junction behavior:</strong> The P-n junction acts like a small battery cell. Finally, a photo voltage is set up. If a small load is connected across the junction, a tiny electric current flows through the circuit.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EEE;
