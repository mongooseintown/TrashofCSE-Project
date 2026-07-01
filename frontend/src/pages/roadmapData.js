import dagre from 'dagre';

export const initialNodes = [
  // Root
  { id: 'root', data: { label: 'Compiler Segment 04', status: 'neutral' } },
  
  // Group 1
  { id: 'parser', data: { label: 'Parser', status: 'done' } },
  { id: 'parser-role', data: { label: 'Role of parser', status: 'done' } },
  { id: 'parser-pos', data: { label: 'Position of parser in compiler model', status: 'done' } },

  // Group 2
  { id: 'error', data: { label: 'Error handling / Error-Recovery', status: 'neutral' } },
  { id: 'error-types', data: { label: 'Types of errors', status: 'done' } },
  { id: 'error-goals', data: { label: 'Goals of error handler', status: 'done' } },
  { id: 'error-strat', data: { label: 'Error recovery strategies', status: 'done' } },

  // Group 3
  { id: 'cfg', data: { label: 'Context free grammar / CFG', status: 'done' } },
  { id: 'cfg-derivations', data: { label: 'Derivations', status: 'done' } },
  { id: 'cfg-parse-tree', data: { label: 'Parse tree', status: 'done' } },
  { id: 'cfg-left-most', data: { label: 'Left most derivation (with example)', status: 'done' } },
  { id: 'cfg-right-most', data: { label: 'Right most derivation (with example)', status: 'done' } },
  { id: 'cfg-ambiguity', data: { label: 'Ambiguity', status: 'done' } },
  { id: 'cfg-elim-ambiguity', data: { label: 'Eliminating Ambiguity', status: 'done' } },
  { id: 'cfg-left-rec', data: { label: 'Left recursion', status: 'done' } },
  { id: 'cfg-left-rec-elim', data: { label: 'Elimination of left recursion / Algorithm 4.1', status: 'done' } },
  { id: 'cfg-left-fac', data: { label: 'Left factoring', status: 'done' } },
  { id: 'cfg-left-fac-elim', data: { label: 'Left factoring Elimination', status: 'done' } },

  // Group 4
  { id: 'top-down', data: { label: 'Top down parsing / Top-Down Parsers', status: 'done' } },
  { id: 'top-down-rec', data: { label: 'Recursive descent parsing', status: 'done' } },
  { id: 'top-down-non-rec', data: { label: 'Non recursive predictive parsing', status: 'done' } },
  { id: 'top-down-non-rec-model', data: { label: 'Model of non recursive predictive parser', status: 'done' } },
  { id: 'top-down-first', data: { label: 'First and Follow', status: 'done' } },
  { id: 'top-down-ll1', data: { label: 'LL(1) Grammar / LL(1) parsing', status: 'done' } },
  { id: 'top-down-ll1-table', data: { label: 'Parsing table for the Grammar', status: 'done' } },
  { id: 'top-down-ll1-error', data: { label: 'Error Recovery in predictive parsing', status: 'done' } }
].map(node => ({ ...node, type: 'custom', position: { x: 0, y: 0 } })); // Assign 'custom' type to all

export const initialEdges = [
  // Root connections
  { id: 'e-root-parser', source: 'root', target: 'parser', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-root-error', source: 'root', target: 'error', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-root-cfg', source: 'root', target: 'cfg', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-root-top-down', source: 'root', target: 'top-down', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  // Parser
  { id: 'e-parser-role', source: 'parser', target: 'parser-role', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-parser-pos', source: 'parser', target: 'parser-pos', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  // Error
  { id: 'e-error-types', source: 'error', target: 'error-types', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-error-goals', source: 'error', target: 'error-goals', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-error-strat', source: 'error', target: 'error-strat', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  // CFG
  { id: 'e-cfg-derivations', source: 'cfg', target: 'cfg-derivations', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cfg-parse-tree', source: 'cfg', target: 'cfg-parse-tree', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-tree-left', source: 'cfg-parse-tree', target: 'cfg-left-most', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-tree-right', source: 'cfg-parse-tree', target: 'cfg-right-most', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cfg-ambiguity', source: 'cfg', target: 'cfg-ambiguity', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-ambiguity-elim', source: 'cfg-ambiguity', target: 'cfg-elim-ambiguity', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cfg-left-rec', source: 'cfg', target: 'cfg-left-rec', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-left-rec-elim', source: 'cfg-left-rec', target: 'cfg-left-rec-elim', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-cfg-left-fac', source: 'cfg', target: 'cfg-left-fac', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-left-fac-elim', source: 'cfg-left-fac', target: 'cfg-left-fac-elim', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },

  // Top Down
  { id: 'e-top-down-rec', source: 'top-down', target: 'top-down-rec', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-top-down-non-rec', source: 'top-down', target: 'top-down-non-rec', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-non-rec-model', source: 'top-down-non-rec', target: 'top-down-non-rec-model', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-top-down-first', source: 'top-down', target: 'top-down-first', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-top-down-ll1', source: 'top-down', target: 'top-down-ll1', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-ll1-table', source: 'top-down-ll1', target: 'top-down-ll1-table', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } },
  { id: 'e-ll1-error', source: 'top-down-ll1', target: 'top-down-ll1-error', type: 'smoothstep', animated: true, style: { stroke: '#ffffff', strokeWidth: 6 } }
];

export const getLayoutedElements = (nodes, edges, direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction, ranksep: 800, nodesep: 150 });

  // Clone nodes to prevent mutation bugs
  const clonedNodes = nodes.map(node => ({
    ...node,
    data: { ...node.data }
  }));

  // Swap dimensions for vertical layout (mobile)
  clonedNodes.forEach((node) => {
    if (isHorizontal) {
      dagreGraph.setNode(node.id, { width: 2500, height: 300 });
    } else {
      dagreGraph.setNode(node.id, { width: 300, height: 1000 });
    }
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = clonedNodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    const nodeWidth = isHorizontal ? 2500 : 300;
    const nodeHeight = isHorizontal ? 300 : 1000;

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    node.data.isVertical = !isHorizontal;

    return node;
  });

  const clonedEdges = edges.map(edge => ({ ...edge }));

  return { nodes: layoutedNodes, edges: clonedEdges };
};
