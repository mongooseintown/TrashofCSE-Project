import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const topicContent = {
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
  )
};

const TopicPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const content = topicContent[topicId] || (
    <p style={{ color: '#aaa' }}>Detailed content and compiler logic for <b>{topicId}</b> will be implemented here.</p>
  );

  return (
    <div style={{ padding: '2rem', color: 'white', minHeight: 'calc(100vh - 100px)', backgroundColor: '#0b0b0b' }}>
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
            background: 'rgba(255,255,255,0.03)', 
            color: '#aaa', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '50%', 
            cursor: 'pointer', 
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            e.currentTarget.style.color = '#aaa';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
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
