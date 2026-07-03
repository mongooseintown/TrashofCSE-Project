export const initialNodes = [
  // Root
  { id: 'root', data: { label: 'Compiler Segment 06', status: 'neutral' } },
  
  // Level 1 Categories
  { id: 'sdt', data: { label: 'Syntax Directed Translation', status: 'done' } },
  { id: 'tc', data: { label: 'Type Checking', status: 'done' } },

  // --- Syntax Directed Translation Children ---
  { id: 'sdt-synth', data: { label: 'Synthesized attribute', status: 'done' } },
  { id: 'sdt-inh', data: { label: 'Inherited attribute', status: 'done' } },
  { id: 'sdt-vs', data: { label: 'Synthesized vs inherited attribute', status: 'done' } },
  { id: 'sdt-dep', data: { label: 'Dependency Graph', status: 'done' } },
  { id: 'sdt-tree', data: { label: 'Syntax Tree', status: 'done' } },
  { id: 'sdt-tree-construction', data: { label: 'Construction method of syntax tree', status: 'done' } },
  { id: 'sdt-dag', data: { label: 'DAG', status: 'done' } },
  { id: 'sdt-annotated-tree', data: { label: 'Annotated Parse Tree (Example)', status: 'done' } },

  // --- Type Checking Children ---
  { id: 'tc-expr', data: { label: 'Type checking of expression', status: 'done' } },
  { id: 'tc-stmt', data: { label: 'Type checking of statement', status: 'done' } },
  { id: 'tc-conv', data: { label: 'Type conversion', status: 'done' } },
  { id: 'tc-conv-implicit', data: { label: 'Implicit type conversion', status: 'done' } },
  { id: 'tc-conv-explicit', data: { label: 'Explicit type conversion', status: 'done' } }
].map(node => ({ ...node, type: 'custom', position: { x: 0, y: 0 } }));

export const initialEdges = [
  // Root connections
  { id: 'e-root-sdt', source: 'root', target: 'sdt', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-root-tc', source: 'root', target: 'tc', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  // SDT level 1 connections
  { id: 'e-sdt-synth', source: 'sdt', target: 'sdt-synth', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-sdt-inh', source: 'sdt', target: 'sdt-inh', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-sdt-vs', source: 'sdt', target: 'sdt-vs', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-sdt-dep', source: 'sdt', target: 'sdt-dep', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-sdt-tree', source: 'sdt', target: 'sdt-tree', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-sdt-dag', source: 'sdt', target: 'sdt-dag', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-sdt-annotated-tree', source: 'sdt', target: 'sdt-annotated-tree', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  // SDT level 2 sub-connections
  { id: 'e-sdt-tree-const', source: 'sdt-tree', target: 'sdt-tree-construction', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  // Type Checking level 1 connections
  { id: 'e-tc-expr', source: 'tc', target: 'tc-expr', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-tc-stmt', source: 'tc', target: 'tc-stmt', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-tc-conv', source: 'tc', target: 'tc-conv', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  // Type Checking level 2 sub-connections
  { id: 'e-tc-conv-imp', source: 'tc-conv', target: 'tc-conv-implicit', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-tc-conv-exp', source: 'tc-conv', target: 'tc-conv-explicit', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } }
];
