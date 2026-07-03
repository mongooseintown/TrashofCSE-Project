import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reusing identical full-page note presentation styles

const CompilerSegment07 = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container">
      {/* Header Row with Back Button */}
      <div className="note-header-row">
        <button 
          onClick={() => navigate('/compiler')} 
          className="note-back-btn"
          title="Back to Compiler Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Compiler Segment 07 Previous Questions</h1>
      </div>

      {/* Note Images List (Serially) */}
      <div className="note-images-list">
        <div className="note-image-card">
          <span className="note-image-caption">Q1: Activation tree definition for a function</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q1.png" 
              alt="Activation tree definition" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Q2: Activation tree drawing task for C factorial function (n=8)</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q2.png" 
              alt="Factorial activation tree question" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Q3: Heap and stack memory allocation strategies</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q3.png" 
              alt="Heap & stack allocation explanation" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Q4: Control stack role & Activation tree drawing task</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q4.png" 
              alt="Control stack & Activation tree question" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Q5: Intermediate code generation (Syntax tree, 3AC, Triples, Quadruples, DAG)</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q5.png" 
              alt="Intermediate code generation translations question" 
              className="note-handnote-img" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompilerSegment07;
