import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './CompilerHub.css';

const CompilerHub = () => {
  const navigate = useNavigate();

  return (
    <div className="compiler-hub-container">
      {/* Page Header */}
      <div className="compiler-hub-header">
        <h1>Compiler Study Portal</h1>
        <p>Interactive roadmaps, optimized basic block notes, and segment previous year questions.</p>
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        {/* Card 1: Compiler Segment 04 */}
        <div className="product-card" onClick={() => navigate('/compilersegment-04')}>
          <div className="card-img-container">
            <span className="card-tag-badge">Roadmap</span>
            <div className="card-logo-badge">CSE</div>
            
            <img 
              src="/compiler-seg04-cover.png" 
              alt="Compiler Segment 04" 
              className="card-img" 
            />

            <div className="card-dots">
              <span className="active"></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="card-details-section">
            <h3>Compiler Segment 04</h3>
            <span className="card-sub">Syntax Analysis & Parsing</span>
            <p className="card-desc">
              Explore Lexical analysis, Top-down parsing, LL(1) grammars, first & follow sets, and error recovery models.
            </p>
          </div>

          <div className="card-footer-row">
            <span className="price-pill">CSE 310</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/compilersegment-04');
            }}>
              Open Roadmap <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 2: Compiler Segment 06 */}
        <div className="product-card" onClick={() => navigate('/compiler/segment-06')}>
          <div className="card-img-container">
            <span className="card-tag-badge" style={{ background: '#a855f7', borderColor: '#b86ff8' }}>Syntax-Directed</span>
            <div className="card-logo-badge">CSE</div>
            
            <img 
              src="/compiler-seg06-cover.png" 
              alt="Compiler Segment 06" 
              className="card-img" 
            />

            <div className="card-dots">
              <span className="active"></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="card-details-section">
            <h3>Compiler Segment 06</h3>
            <span className="card-sub">Syntax-Directed Translation</span>
            <p className="card-desc">
              Explore attribute grammars, parse tree annotations, synthesized and inherited attributes, SDDs, and SDT translation schemes.
            </p>
          </div>

          <div className="card-footer-row">
            <span className="price-pill">CSE 310</span>
            <button className="buy-pill-btn" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #b86ff8 100%)' }} onClick={(e) => {
              e.stopPropagation();
              navigate('/compiler/segment-06');
            }}>
              Open Roadmap <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 3: Compiler Segment 07 */}
        <div className="product-card" onClick={() => navigate('/compiler/segment-07')}>
          <div className="card-img-container">
            <span className="card-tag-badge" style={{ background: '#ffffff', borderColor: '#ff7242' }}>Previous Q</span>
            <div className="card-logo-badge">CSE</div>
            
            <img 
              src="/compiler-seg07-cover.png" 
              alt="Compiler Segment 07 Previous Qs" 
              className="card-img" 
            />

            <div className="card-dots">
              <span className="active"></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="card-details-section">
            <h3>Compiler Segment 07</h3>
            <span className="card-sub">Intermediate Code Generation</span>
            <p className="card-desc">
              Review past examination questions on Activation Trees, Stack/Heap Allocation strategies, Control Stack roles, Syntax trees, and DAG representation.
            </p>
          </div>

          <div className="card-footer-row">
            <span className="price-pill">CSE 310</span>
            <button className="buy-pill-btn" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #ff7242 100%)' }} onClick={(e) => {
              e.stopPropagation();
              navigate('/compiler/segment-07');
            }}>
              View Solutions <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 4: Compiler Segment 08 */}
        <div className="product-card" onClick={() => navigate('/compilersegment-08')}>
          <div className="card-img-container">
            <span className="card-tag-badge">Roadmap</span>
            <div className="card-logo-badge">CSE</div>
            
            <img 
              src="/compiler-seg08-cover.png" 
              alt="Compiler Segment 08" 
              className="card-img" 
            />

            <div className="card-dots">
              <span className="active"></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="card-details-section">
            <h3>Compiler Segment 08</h3>
            <span className="card-sub">Code Gen & Optimization</span>
            <p className="card-desc">
              Learn runtime storage allocation, register allocation, instruction selection, basic blocks optimization, and DAG representation.
            </p>
          </div>

          <div className="card-footer-row">
            <span className="price-pill">CSE 310</span>
            <button className="buy-pill-btn" onClick={(e) => {
              e.stopPropagation();
              navigate('/compilersegment-08');
            }}>
              Open Roadmap <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompilerHub;
