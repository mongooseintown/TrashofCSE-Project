import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, CheckCircle } from 'lucide-react';

const CompilerSegment06 = () => {
  const navigate = useNavigate();

  return (
    <div className="note-page-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
      {/* Header Row with Back Button */}
      <div className="note-header-row" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
        <button 
          onClick={() => navigate('/compiler')} 
          className="note-back-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          title="Back to Compiler Portal"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #fff 0%, #aaa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Compiler Segment 06: Syntax-Directed Translation
        </h1>
      </div>

      {/* Intro Section */}
      <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ color: '#a855f7', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={24} /> Overview
        </h2>
        <p style={{ color: '#ccc', lineHeight: '1.7', fontSize: '1.1rem' }}>
          Syntax-Directed Translation (SDT) refers to a method of compiler implementation where source language translation is guided by the parser. 
          It associates semantic rules with grammar productions, allowing the compiler to perform actions like type checking, intermediate code generation, 
          and value evaluations during the parsing phase.
        </p>
      </div>

      {/* Core Concepts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Concept 1 */}
        <div style={{ background: 'rgba(168, 85, 247, 0.04)', border: '1px solid rgba(168, 85, 247, 0.15)', borderRadius: '16px', padding: '2rem', transition: 'transform 0.3s ease' }}>
          <h3 style={{ color: '#a855f7', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} /> Synthesized Attributes
          </h3>
          <p style={{ color: '#ccc', lineHeight: '1.6' }}>
            An attribute is synthesized if its value at a parse tree node is determined from the attribute values at the children of that node. 
            Synthesized attributes can be evaluated during a single bottom-up traversal of the parse tree.
          </p>
        </div>

        {/* Concept 2 */}
        <div style={{ background: 'rgba(59, 130, 246, 0.04)', border: '1px solid rgba(59, 130, 246, 0.15)', borderRadius: '16px', padding: '2rem', transition: 'transform 0.3s ease' }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} /> Inherited Attributes
          </h3>
          <p style={{ color: '#ccc', lineHeight: '1.6' }}>
            An attribute is inherited if its value at a parse tree node is determined from the attribute values at its parent and/or its siblings. 
            Inherited attributes are useful for tracking context, such as type declarations.
          </p>
        </div>

        {/* Concept 3 */}
        <div style={{ background: 'rgba(234, 179, 8, 0.04)', border: '1px solid rgba(234, 179, 8, 0.15)', borderRadius: '16px', padding: '2rem', transition: 'transform 0.3s ease' }}>
          <h3 style={{ color: '#eab308', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} /> SDD vs SDT Schemes
          </h3>
          <p style={{ color: '#ccc', lineHeight: '1.6' }}>
            A Syntax-Directed Definition (SDD) is a high-level specification using attributes and rules, whereas a Syntax-Directed Translation Scheme (SDT) 
            embeds program fragments (semantic actions) directly within the grammar productions.
          </p>
        </div>
      </div>

      {/* Footer / Status note */}
      <div style={{ background: 'rgba(255, 91, 34, 0.03)', border: '1px dashed rgba(255, 91, 34, 0.2)', borderRadius: '12px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <CheckCircle size={24} style={{ color: '#ff5b22', flexShrink: 0 }} />
        <span style={{ color: '#eee', lineHeight: '1.5' }}>
          <strong>Status:</strong> Previous Year Questions, SDT schema examples, and parser tree evaluations for Segment 06 are currently being compiled. They will appear here dynamically as updates are synchronized.
        </span>
      </div>
    </div>
  );
};

export default CompilerSegment06;
