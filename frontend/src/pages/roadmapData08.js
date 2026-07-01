export const initialNodes = [
  // Root
  { id: 'root', data: { label: 'Compiler Segment 08', status: 'neutral' } },
  
  // Level 1 Categories
  { id: 'code-gen', data: { label: 'Code Generation', status: 'neutral' } },
  { id: 'code-opt', data: { label: 'Code optimization', status: 'neutral' } },

  // --- Code Generation Children ---
  { id: 'cg-position', data: { label: 'Position of code generation', status: 'pending' } },
  { id: 'cg-issues', data: { label: 'Issues of code generation', status: 'pending' } },
  { id: 'cg-issues-selection', data: { label: 'instruction selection', status: 'pending' } },
  { id: 'cg-issues-allocation', data: { label: 'register Allocation', status: 'pending' } },
  { id: 'cg-target', data: { label: 'The target machine', status: 'pending' } },
  { id: 'cg-target-rules', data: { label: 'Rules of assembly code', status: 'pending' } },
  { id: 'cg-target-runtime', data: { label: 'Run time storage management', status: 'pending' } },
  { id: 'cg-target-runtime-static', data: { label: 'Static Allocation', status: 'pending' } },
  { id: 'cg-target-runtime-stack', data: { label: 'Stack allocation', status: 'pending' } },
  { id: 'cg-target-runtime-heap', data: { label: 'Heap allocation', status: 'pending' } },
  { id: 'cg-basic', data: { label: 'Basic block', status: 'pending' } },
  { id: 'cg-basic-types', data: { label: "Types of transformation on basic blocks/\nCode optimization technique", status: 'pending' } },
  { id: 'cg-flow', data: { label: 'Flow graph', status: 'pending' } },
  { id: 'cg-dag', data: { label: 'Dag reprsentation of basic blocks', status: 'pending' } },
  { id: 'cg-peephole', data: { label: 'Peephole optimization', status: 'pending' } },
  { id: 'cg-peephole-char', data: { label: 'Characteristics of peephole optimization', status: 'pending' } },
  { id: 'cg-from-dags', data: { label: 'generating code from dags', status: 'pending' } },
  { id: 'cg-from-dags-rearrange', data: { label: 'Rearranging the order', status: 'pending' } },

  // --- Code Optimization Children ---
  { id: 'co-performance', data: { label: 'For getting performance', status: 'pending' } },
  { id: 'co-frontend-backend', data: { label: 'What is frontend and backend of compiler?', status: 'pending' } },
  { id: 'co-fb-frontend', data: { label: 'Frontend', status: 'pending' } },
  { id: 'co-fb-backend', data: { label: 'Backend', status: 'pending' } },
  { id: 'co-function', data: { label: 'Function preserving transformation', status: 'pending' } },
  { id: 'co-func-subexpression', data: { label: 'Common subexpression elimination', status: 'pending' } },
  { id: 'co-func-deadcode', data: { label: 'Dead code elimination', status: 'pending' } },
  { id: 'co-func-renaming', data: { label: 'Renaming Temporary Variables', status: 'pending' } },
  { id: 'co-func-propagation', data: { label: 'Copy propagation', status: 'pending' } },
  { id: 'co-loop', data: { label: 'Loop optimization', status: 'pending' } },
  { id: 'co-loop-induction', data: { label: 'Induction variables and reduction in strength', status: 'pending' } },
  { id: 'co-basic-opt', data: { label: 'Optimization of basic blocks', status: 'pending' } }
].map(node => ({ ...node, type: 'custom', position: { x: 0, y: 0 } }));

export const initialEdges = [
  // Root connections
  { id: 'e-root-codegen', source: 'root', target: 'code-gen', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-root-codeopt', source: 'root', target: 'code-opt', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  // Code Generation Level 1
  { id: 'e-cg-pos', source: 'code-gen', target: 'cg-position', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cg-issues', source: 'code-gen', target: 'cg-issues', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cg-target', source: 'code-gen', target: 'cg-target', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cg-basic', source: 'code-gen', target: 'cg-basic', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cg-flow', source: 'code-gen', target: 'cg-flow', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cg-dag', source: 'code-gen', target: 'cg-dag', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cg-peep', source: 'code-gen', target: 'cg-peephole', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cg-dags', source: 'code-gen', target: 'cg-from-dags', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  // Code Gen Level 2 sub-connections
  { id: 'e-cg-issues-sel', source: 'cg-issues', target: 'cg-issues-selection', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cg-issues-alloc', source: 'cg-issues', target: 'cg-issues-allocation', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  
  { id: 'e-cg-target-rules', source: 'cg-target', target: 'cg-target-rules', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cg-target-rt', source: 'cg-target', target: 'cg-target-runtime', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  
  { id: 'e-cg-rt-static', source: 'cg-target-runtime', target: 'cg-target-runtime-static', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cg-rt-stack', source: 'cg-target-runtime', target: 'cg-target-runtime-stack', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cg-rt-heap', source: 'cg-target-runtime', target: 'cg-target-runtime-heap', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  { id: 'e-cg-basic-types', source: 'cg-basic', target: 'cg-basic-types', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  
  { id: 'e-cg-peep-char', source: 'cg-peephole', target: 'cg-peephole-char', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  
  { id: 'e-cg-dags-rearrange', source: 'cg-from-dags', target: 'cg-from-dags-rearrange', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  // Code Optimization Level 1
  { id: 'e-co-perf', source: 'code-opt', target: 'co-performance', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-co-fb', source: 'code-opt', target: 'co-frontend-backend', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-co-func', source: 'code-opt', target: 'co-function', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-co-loop', source: 'code-opt', target: 'co-loop', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-co-basic-opt', source: 'code-opt', target: 'co-basic-opt', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  // Code Opt Level 2 sub-connections
  { id: 'e-co-fb-front', source: 'co-frontend-backend', target: 'co-fb-frontend', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-co-fb-back', source: 'co-frontend-backend', target: 'co-fb-backend', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  { id: 'e-co-func-sub', source: 'co-function', target: 'co-func-subexpression', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-co-func-dead', source: 'co-function', target: 'co-func-deadcode', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-co-func-ren', source: 'co-function', target: 'co-func-renaming', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-co-func-prop', source: 'co-function', target: 'co-func-propagation', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  { id: 'e-co-loop-ind', source: 'co-loop', target: 'co-loop-induction', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } }
];
