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

      {/* Note Images List (All 14 questions serially, one below another) */}
      <div className="note-images-list">
        {/* SET A - Questions 1 to 5 */}
        <div className="note-image-card">
          <span className="note-image-caption">Q1: Activation tree definition for a function</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q1.png" 
              alt="Activation tree definition" 
              className="note-handnote-img" 
            />
          </div>
          <div style={{ marginTop: '1.5rem', borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '1.5rem' }}>
            <span className="note-image-caption" style={{ color: '#ff5b22', fontWeight: 'bold' }}>Answer / Solution:</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-activation-tree-ans.jpg" 
                alt="Activation tree answer" 
                className="note-handnote-img" 
              />
            </div>
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
          <div style={{ marginTop: '1.5rem', borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '1.5rem' }}>
            <span className="note-image-caption" style={{ color: '#ff5b22', fontWeight: 'bold' }}>Answer / Solution (Purpose of Activation Tree):</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-activation-tree-purpose.png" 
                alt="Purpose of activation tree answer" 
                className="note-handnote-img" 
              />
            </div>
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

        {/* SET B - Questions 6 to 10 */}
        <div className="note-image-card">
          <span className="note-image-caption">Q6: Translate expression (a + b * c / e + b * c) to quadruple, triple, indirect triple and polish notation</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q6.png" 
              alt="Expression translation question" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Q7: What is the activation tree in the run-time environment of a compiler for a function?</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q7.png" 
              alt="Activation tree definition question" 
              className="note-handnote-img" 
            />
          </div>
          <div style={{ marginTop: '1.5rem', borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '1.5rem' }}>
            <span className="note-image-caption" style={{ color: '#ff5b22', fontWeight: 'bold' }}>Answer / Solution:</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-activation-tree-ans.jpg" 
                alt="Activation tree answer" 
                className="note-handnote-img" 
              />
            </div>
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Q8: Draw the activation tree for C Fibonacci function (n=7)</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q8.png" 
              alt="Fibonacci activation tree question" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Q9: Explain the memory allocation strategies for the run-time environment</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q9.png" 
              alt="Memory allocation strategies question" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Q10: Translate the arithmetic expression 'x + x * (y - z) + (y - z) * w' into Syntax tree, Three-address code, Triples, DAG, Quadruples</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q10.png" 
              alt="Intermediate code generation translations question" 
              className="note-handnote-img" 
            />
          </div>
        </div>

        {/* SET C - Questions 11 to 14 */}
        <div className="note-image-card">
          <span className="note-image-caption">Q11: Activation tree & memory strategies + Factorial function drawing (n=6)</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q11.png" 
              alt="Factorial activation tree drawing question n=6" 
              className="note-handnote-img" 
            />
          </div>
          <div style={{ marginTop: '1.5rem', borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '1.5rem' }}>
            <span className="note-image-caption" style={{ color: '#ff5b22', fontWeight: 'bold' }}>Answer / Solution (Activation Tree Definition):</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-activation-tree-ans.jpg" 
                alt="Activation tree answer" 
                className="note-handnote-img" 
              />
            </div>
            
            <span className="note-image-caption" style={{ color: '#ff5b22', fontWeight: 'bold', marginTop: '1.5rem', display: 'block' }}>Answer / Solution (Memory Allocation Strategies):</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-mem-strategies-ans.jpg" 
                alt="Memory allocation strategies answer" 
                className="note-handnote-img" 
              />
            </div>

            <span className="note-image-caption" style={{ color: '#ff5b22', fontWeight: 'bold', marginTop: '1.5rem', display: 'block' }}>Answer / Solution (Factorial Function Activation Tree Drawing n=6):</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-factorial-activation-ans.jpg" 
                alt="Factorial function activation tree drawing answer" 
                className="note-handnote-img" 
              />
            </div>
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Q12: Translate arithmetic expression (o := x * (-y) + x * (-y) + x*y) to Syntax tree, 3AC, Triples, DAG, Quadruples</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q12.png" 
              alt="Expression translation question 2" 
              className="note-handnote-img" 
            />
          </div>
          <div style={{ marginTop: '1.5rem', borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '1.5rem' }}>
            <span className="note-image-caption" style={{ color: '#ff5b22', fontWeight: 'bold' }}>Answer / Solution:</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-expr-dag-ans.jpg" 
                alt="Expression syntax tree and DAG answer" 
                className="note-handnote-img" 
              />
            </div>
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Q13: Explain two strategies for dynamic storage allocation</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q13.png" 
              alt="Dynamic storage allocation question" 
              className="note-handnote-img" 
            />
          </div>
          <div style={{ marginTop: '1.5rem', borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '1.5rem' }}>
            <span className="note-image-caption" style={{ color: '#ff5b22', fontWeight: 'bold' }}>Answer / Solution:</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-dynamic-storage-ans.jpg" 
                alt="Dynamic storage allocation answer" 
                className="note-handnote-img" 
              />
            </div>
          </div>
        </div>

        <div className="note-image-card">
          <span className="note-image-caption">Q14: Translate expression (a + b*c/e + b*c) to quadruple, triple and indirect triple</span>
          <div className="note-img-wrapper">
            <img 
              src="/cg-seg7-q14.png" 
              alt="Expression translation question 3" 
              className="note-handnote-img" 
            />
          </div>
          <div style={{ marginTop: '1.5rem', borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '1.5rem' }}>
            <span className="note-image-caption" style={{ color: '#ff5b22', fontWeight: 'bold' }}>Answer / Solution:</span>
            <div className="note-img-wrapper">
              <img 
                src="/cg-seg7-expression-ans.jpg" 
                alt="Expression translation answer" 
                className="note-handnote-img" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompilerSegment07;
