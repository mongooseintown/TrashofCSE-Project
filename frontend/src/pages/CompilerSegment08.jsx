import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { initialNodes, initialEdges } from './roadmapData08';
import { getLayoutedElements } from './roadmapData';
import CustomNode from './CustomNode';
import './CompilerSegment08.css';

const CompilerSegment08 = () => {
  const [direction, setDirection] = useState(window.innerWidth <= 768 ? 'TB' : 'LR');

  useEffect(() => {
    const handleResize = () => {
      setDirection(window.innerWidth <= 768 ? 'TB' : 'LR');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { layoutedNodes, layoutedEdges } = useMemo(() => {
    const { nodes, edges } = getLayoutedElements(initialNodes, initialEdges, direction);
    // Manually shift the long overlapping node down
    const adjusted = nodes.map(n => {
      if (n.id === 'cg-basic-types') {
        return { ...n, position: { ...n.position, y: n.position.y + 400 } };
      }
      return n;
    });
    return { layoutedNodes: adjusted, layoutedEdges: edges };
  }, [direction]);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  useEffect(() => {
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [layoutedNodes, layoutedEdges, setNodes, setEdges]);

  const navigate = useNavigate();

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const onNodeClick = useCallback((event, node) => {
    navigate(`/compilersegment-08/${node.id}`);
  }, [navigate]);

  return (
    <div className="roadmap-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.01}
        nodesDraggable={false}
        zoomOnScroll={false}
        zoomOnPinch={window.innerWidth <= 768}
        zoomOnDoubleClick={false}
        panOnScroll={window.innerWidth <= 768}
        panOnDrag={window.innerWidth <= 768}
        preventScrolling={false}
      >
        <Background variant="dots" gap={12} size={1} color="rgba(255, 255, 255, 0.1)" />
      </ReactFlow>
    </div>
  );
};

export default CompilerSegment08;
