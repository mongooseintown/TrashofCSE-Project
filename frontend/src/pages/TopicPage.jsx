import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const topicContent = {
  sdt: (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Syntax-Directed Translation / Definition:</strong>
      </p>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src="/cg-seg6-sdt-intro-ans.png" alt="Syntax-Directed Translation Definition" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
      
      <div style={{ borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '2rem', marginTop: '2rem' }}>
        <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#ff5b22', fontSize: '1.3rem' }}>Common SDT Exam Question Types & Tracing Checklist:</strong>
        </p>
        <div style={{ textAlign: 'center' }}>
          <img src="/cg-seg6-sdt-question-types.png" alt="SDT Question Types and Tracing Checklist" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
      </div>
    </div>
  ),
  'sdt-synth': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Synthesized Attribute:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-seg6-synthesized-attribute.png" alt="Synthesized Attribute Definition" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'sdt-tree': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Syntax Tree:</strong>
      </p>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src="/cg-seg6-syntax-tree.png" alt="Syntax Tree Definition" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
      <div style={{ borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '2rem', marginTop: '2rem' }}>
        <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#ff5b22', fontSize: '1.3rem' }}>Example: Syntax Tree for Nested Expression `a + a + (a + a + a + (a + a + a + a))`</strong>
        </p>
        <div style={{ textAlign: 'center' }}>
          <img src="/cg-seg6-syntax-tree-nested-ex.png" alt="Nested Expression Syntax Tree Example" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
      </div>
    </div>
  ),
  'sdt-tree-construction': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Construction Method of Syntax Tree:</strong>
      </p>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src="/cg-seg6-syntax-tree-construction.png" alt="Construction Method of Syntax Tree" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
      
      <div style={{ borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '2rem', marginTop: '2rem' }}>
        <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#ff5b22', fontSize: '1.3rem' }}>Example: Construction of Syntax Tree for `a - 4 + c`</strong>
        </p>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/cg-seg6-syntax-tree-ex-code.png" alt="Syntax Tree Construction Example Code steps" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src="/cg-seg6-syntax-tree-ex-diagrams.png" alt="Syntax Tree and Annotated Parse Tree diagrams" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
      </div>
    </div>
  ),
  'sdt-dag': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Directed Acyclic Graph (DAG):</strong>
      </p>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src="/cg-seg6-dag-definition.png" alt="DAG Definition" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
      
      <div style={{ borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '2rem', marginTop: '2rem' }}>
        <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#ff5b22', fontSize: '1.3rem' }}>Example 1: Syntax Tree vs. DAG comparison for `a + a * (b - c) + (b - c) * d`</strong>
        </p>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/cg-seg6-dag-ex-steps.png" alt="Syntax Tree and DAG Construction Steps" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/cg-seg6-dag-ex-diagrams.png" alt="Syntax Tree vs DAG Side-by-Side Diagram" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
      </div>
      
      <div style={{ borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '2rem', marginTop: '2rem' }}>
        <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#ff5b22', fontSize: '1.3rem' }}>Example 2: Syntax Tree vs. DAG comparison for Assignment `i := i + 10`</strong>
        </p>
        <div style={{ textAlign: 'center' }}>
          <img src="/cg-seg6-syntax-tree-vs-dag-assignment-ex.png" alt="Syntax Tree vs DAG Assignment Solution Diagram" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
      </div>
    </div>
  ),
  'sdt-dep': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Dependency Graph:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-seg6-dependency-graph.png" alt="Dependency Graph Example" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'sdt-inh': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Inherited Attribute:</strong>
      </p>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src="/cg-seg6-inherited-attribute.png" alt="Inherited Attribute Definition" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
      
      <div style={{ borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '2rem', marginTop: '2rem' }}>
        <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#ff5b22', fontSize: '1.3rem' }}>Example 1: SDD & Dependency Graph for Declarations</strong>
        </p>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/cg-seg6-inh-declaration-q.png" alt="Declaration SDD Problem Statement" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src="/cg-seg6-inh-declaration-ans.png" alt="Declaration SDD Solution" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
      </div>
      
      <div style={{ borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '2rem', marginTop: '2rem' }}>
        <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#ff5b22', fontSize: '1.3rem' }}>Example 2: Step-by-Step Inheritance Tracing for `int a, b, c`</strong>
        </p>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/cg-seg6-inh-trace-abc-1.png" alt="Trace Steps of Inherited type computation for a, b, c" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src="/cg-seg6-inh-trace-abc-2.png" alt="Parse Tree and Annotated Dependency Graph for a, b, c" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
      </div>

      <div style={{ borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '2rem', marginTop: '2rem' }}>
        <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#ff5b22', fontSize: '1.3rem' }}>Example 3: Step-by-Step Parse tree & Annotated Tree for `int a, b`</strong>
        </p>
        <div style={{ textAlign: 'center' }}>
          <img src="/cg-seg6-inh-trace-ab-3.png" alt="Parse tree and Annotated Tree diagram for a, b" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
      </div>
    </div>
  ),
  'sdt-vs': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Synthesized vs Inherited Attributes:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-seg6-synth-vs-inherited.png" alt="Synthesized vs Inherited Attributes Comparison" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'sdt-annotated-tree': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Annotated Parse Tree (Example):</strong>
      </p>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src="/cg-seg6-annotated-parse-tree-calc.png" alt="Annotated Parse Tree Example Specification" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
      <div style={{ textAlign: 'center', borderTop: '2px dashed rgba(255, 91, 34, 0.3)', paddingTop: '2rem' }}>
        <span style={{ color: '#ff5b22', fontWeight: 'bold', display: 'block', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Annotated Parse Tree Drawing Solution:</span>
        <img src="/cg-seg6-annotated-parse-tree-calc-diagram.png" alt="Annotated Parse Tree Drawing Solution Diagram" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  parser: (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Parser:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/parser.png" alt="Definition of Parser" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'parser-role': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Role of parser:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/parser-role.png" alt="Role of parser" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'parser-pos': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Position of parser in compiler model:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/parser-pos.png" alt="Position of parser in compiler model" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
      <p style={{ color: '#aaa', fontSize: '0.9rem', textAlign: 'center', marginTop: '1rem' }}>Fig: Position of parser in compiler model</p>
    </div>
  ),
  'error': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', textAlign: 'center' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem', display: 'block', marginBottom: '1rem' }}>Error handling / Error-Recovery</strong>
        There are no separate notes for this main topic. Please click on the specific sub-topics connected to this node in the roadmap to view the detailed notes.
      </p>
    </div>
  ),
  'error-types': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Types of errors:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/error-types.png" alt="Types of errors" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'error-goals': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Goals of error handler:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/error-goals.png" alt="Goals of error handler" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'error-strat': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Error Recovery Strategies:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/error-strat.png" alt="Error Recovery Strategies" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cfg-derivations': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Derivations:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cfg-derivations.png" alt="Derivations" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cfg-parse-tree': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Parse tree:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cfg-parse-tree.png" alt="Parse tree" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cfg-left-most': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Left most derivation (with example):</strong>
      </p>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <img src="/cfg-left-most-1.png" alt="Left most derivation example 1" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/cfg-left-most-2.png" alt="Left most derivation example 2" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cfg-right-most': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Right most derivation (with example):</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cfg-right-most.png" alt="Right most derivation" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cfg-ambiguity': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Ambiguity:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cfg-ambiguity.png" alt="Ambiguity" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cfg-elim-ambiguity': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Eliminating Ambiguity:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cfg-elim-ambiguity.png" alt="Eliminating Ambiguity" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cfg-left-fac': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Left factoring:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cfg-left-fac.png" alt="Left factoring" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cfg-left-fac-elim': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Left factoring Elimination:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cfg-left-fac-elim.png" alt="Left factoring Elimination" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'top-down-rec': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Recursive descent parsing:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/top-down-rec.png" alt="Recursive descent parsing" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'top-down-non-rec': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Non recursive predictive parsing:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/top-down-non-rec.png" alt="Non recursive predictive parsing" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'top-down-non-rec-model': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Model of non recursive predictive parser:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/top-down-non-rec-model.png" alt="Model of non recursive predictive parser" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'top-down-first': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>First and Follow:</strong>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <img src="/top-down-first-1.png" alt="First and Follow 1" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/top-down-first-2.png" alt="First and Follow 2" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/top-down-first-3.png" alt="First and Follow 3" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/top-down-first-4.png" alt="First and Follow 4" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'top-down-ll1': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>LL(1) Grammar / LL(1) parsing:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/top-down-ll1.png" alt="LL(1) Grammar" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'top-down-ll1-table': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Parsing table for the Grammar:</strong>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <img src="/top-down-ll1-table-1.png" alt="Parsing table for the Grammar 1" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/top-down-ll1-table-2.png" alt="Parsing table for the Grammar 2" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'top-down-ll1-error': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Error Recovery in predictive parsing:</strong>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <img src="/top-down-ll1-error-1.png" alt="Error Recovery in predictive parsing 1" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/top-down-ll1-error-2.png" alt="Error Recovery in predictive parsing 2" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cfg-left-rec': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Left Recursion:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cfg-left-rec.png" alt="Left Recursion" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cfg-left-rec-elim': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Elimination of left recursion / Algorithm 4.1:</strong>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <img src="/cfg-left-rec-elim-1.png" alt="Elimination of left recursion 1" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/cfg-left-rec-elim-2.png" alt="Elimination of left recursion 2" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/cfg-left-rec-elim-3.png" alt="Elimination of left recursion 3" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/cfg-left-rec-elim-4.png" alt="Elimination of left recursion 4" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/cfg-left-rec-elim-5.png" alt="Elimination of left recursion 5" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/cfg-left-rec-elim-6.png" alt="Elimination of left recursion 6" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/cfg-left-rec-elim-7.png" alt="Elimination of left recursion 7" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/cfg-left-rec-elim-8.png" alt="Elimination of left recursion 8" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'top-down': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Top down parsing / Top-Down Parsers:</strong>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <img src="/top-down-1.png" alt="Top down parsing 1" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
        <img src="/top-down-2.png" alt="Top down parsing 2" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cfg': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Context free grammar / CFG:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cfg.png" alt="Context free grammar" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'code-gen': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Code Generator:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/code-gen.png" alt="Code Generator" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cg-position': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Position of Code Generator:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-position.png" alt="Position of Code Generator" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cg-issues': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Issues of Code Generator:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-issues.png" alt="Issues of Code Generator" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cg-issues-selection': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Instruction Selection:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-issues-selection.png" alt="Instruction Selection" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cg-issues-allocation': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Register Allocation:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-issues-allocation.png" alt="Register Allocation" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cg-target': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>The Target Machine:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-target.png" alt="The Target Machine" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cg-target-rules': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Rules of Assembly Code:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-target-rules.png" alt="Rules of Assembly Code" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cg-target-runtime': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Run Time Storage Management:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-target-runtime.png" alt="Run Time Storage Management" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cg-target-runtime-static': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Static Allocation:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-target-runtime-static.png" alt="Static Allocation" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cg-target-runtime-stack': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Stack Allocation:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-target-runtime-stack.png" alt="Stack Allocation" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cg-target-runtime-heap': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Heap Allocation:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-target-runtime-heap.png" alt="Heap Allocation" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cg-basic': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Basic Block:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-basic.png" alt="Basic Block" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  ),
  'cg-basic-types': (
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ color: '#ddd', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <strong style={{ color: 'white', fontSize: '1.4rem' }}>Types of transformation on basic blocks:</strong>
      </p>
      <div style={{ textAlign: 'center' }}>
        <img src="/cg-basic-types.png" alt="Types of transformation on basic blocks" style={{ width: '100%', maxWidth: '1000px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  )
};

const TopicPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const content = topicContent[topicId] || (
    <p style={{ color: '#aaa' }}>Detailed content and compiler logic for <b>{topicId}</b> will be implemented here.</p>
  );

  return (
    <div style={{ padding: '2rem', color: 'var(--text-primary)', minHeight: 'calc(100vh - 100px)', backgroundColor: 'var(--bg-primary)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate(-1)}
          title="Back to Roadmap"
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            background: 'var(--bg-secondary)', 
            color: 'var(--text-secondary)', 
            border: '1px solid var(--border-secondary)', 
            borderRadius: '50%', 
            cursor: 'pointer', 
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-secondary-hover)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.borderColor = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-secondary)';
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'var(--border-secondary)';
          }}
        >
          <LogOut size={20} />
        </button>
        <h1 style={{ fontSize: '2.5rem', margin: 0, textTransform: 'capitalize' }}>{topicId.replace(/-/g, ' ')}</h1>
      </div>
      
      {content}
    </div>
  );
};

export default TopicPage;
