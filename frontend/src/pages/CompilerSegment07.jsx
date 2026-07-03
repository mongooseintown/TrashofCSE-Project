import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PVCellNote.css'; // Reusing identical full-page note presentation styles

const CompilerSegment07 = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('setA');

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

      {/* Premium Tab Selector for Question Sets */}
      <div style={{
        display: 'flex',
        gap: '0.8rem',
        margin: '0.5rem 0 2.5rem 0',
        padding: '4px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '14px',
        width: 'fit-content',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('setA')}
          style={{
            padding: '0.8rem 1.6rem',
            background: activeTab === 'setA' ? 'linear-gradient(135deg, #ff5b22 0%, #ff7242 100%)' : 'transparent',
            color: activeTab === 'setA' ? '#ffffff' : 'rgba(255,255,255,0.6)',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            boxShadow: activeTab === 'setA' ? '0 4px 15px rgba(255, 91, 34, 0.25)' : 'none'
          }}
        >
          Question Set A
        </button>
        <button
          onClick={() => setActiveTab('setB')}
          style={{
            padding: '0.8rem 1.6rem',
            background: activeTab === 'setB' ? 'linear-gradient(135deg, #ff5b22 0%, #ff7242 100%)' : 'transparent',
            color: activeTab === 'setB' ? '#ffffff' : 'rgba(255,255,255,0.6)',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            boxShadow: activeTab === 'setB' ? '0 4px 15px rgba(255, 91, 34, 0.25)' : 'none'
          }}
        >
          Question Set B
        </button>
        <button
          onClick={() => setActiveTab('setC')}
          style={{
            padding: '0.8rem 1.6rem',
            background: activeTab === 'setC' ? 'linear-gradient(135deg, #ff5b22 0%, #ff7242 100%)' : 'transparent',
            color: activeTab === 'setC' ? '#ffffff' : 'rgba(255,255,255,0.6)',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            boxShadow: activeTab === 'setC' ? '0 4px 15px rgba(255, 91, 34, 0.25)' : 'none'
          }}
        >
          Question Set C
        </button>
      </div>

      {/* Note Images List based on selected Set */}
      {activeTab === 'setA' && (
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
      )}

      {activeTab === 'setB' && (
        <div className="note-images-list">
          <div className="note-image-card">
            <span className="note-image-caption">Q1: Translate expression (a + b * c / e + b * c) to quadruple, triple, indirect triple and polish notation</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-q6.png" 
                alt="Expression translation question" 
                className="note-handnote-img" 
              />
            </div>
          </div>

          <div className="note-image-card">
            <span className="note-image-caption">Q2: What is the activation tree in the run-time environment of a compiler for a function?</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-q7.png" 
                alt="Activation tree definition question" 
                className="note-handnote-img" 
              />
            </div>
          </div>

          <div className="note-image-card">
            <span className="note-image-caption">Q3: Draw the activation tree for C Fibonacci function (n=7)</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-q8.png" 
                alt="Fibonacci activation tree question" 
                className="note-handnote-img" 
              />
            </div>
          </div>

          <div className="note-image-card">
            <span className="note-image-caption">Q4: Explain the memory allocation strategies for the run-time environment</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-q9.png" 
                alt="Memory allocation strategies question" 
                className="note-handnote-img" 
              />
            </div>
          </div>

          <div className="note-image-card">
            <span className="note-image-caption">Q5: Translate the arithmetic expression 'x + x * (y - z) + (y - z) * w' into Syntax tree, Three-address code, Triples, DAG, Quadruples</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-q10.png" 
                alt="Intermediate code generation translations question" 
                className="note-handnote-img" 
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'setC' && (
        <div className="note-images-list">
          <div className="note-image-card">
            <span className="note-image-caption">Q1: Activation tree & memory strategies + Factorial function drawing (n=6)</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-q11.png" 
                alt="Factorial activation tree drawing question n=6" 
                className="note-handnote-img" 
              />
            </div>
          </div>

          <div className="note-image-card">
            <span className="note-image-caption">Q2: Translate arithmetic expression (o := x * (-y) + x * (-y) + x*y) to Syntax tree, 3AC, Triples, DAG, Quadruples</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-q12.png" 
                alt="Expression translation question 2" 
                className="note-handnote-img" 
              />
            </div>
          </div>

          <div className="note-image-card">
            <span className="note-image-caption">Q3: Explain two strategies for dynamic storage allocation</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-q13.png" 
                alt="Dynamic storage allocation question" 
                className="note-handnote-img" 
              />
            </div>
          </div>

          <div className="note-image-card">
            <span className="note-image-caption">Q4: Translate expression (a + b*c/e + b*c) to quadruple, triple and indirect triple</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-q14.png" 
                alt="Expression translation question 3" 
                className="note-handnote-img" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompilerSegment07;
