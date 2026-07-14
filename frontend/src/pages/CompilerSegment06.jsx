import DynamicUploadsSection from '../components/DynamicUploadsSection';
import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { initialNodes, initialEdges } from './roadmapData06';
import { getLayoutedElements } from './roadmapData';
import CustomNode from './CustomNode';
import './CompilerSegment04.css'; // Reusing layout structures

const CompilerSegment06 = () => {
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
    return { layoutedNodes: nodes, layoutedEdges: edges };
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
    navigate(`/compilersegment-06/${node.id}`);
  }, [navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="roadmap-container" style={{ height: '75vh', minHeight: '500px', flexShrink: 0, position: 'relative' }}>
        
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
      <DynamicUploadsSection course="compiler" segment="06" />
    </div>
  );
};

export default CompilerSegment06;
