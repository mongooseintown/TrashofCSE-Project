import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react';

const CustomNode = ({ data, targetPosition = Position.Left, sourcePosition = Position.Right }) => {
  let IconComponent = null;
  let iconColor = '';
  
  if (data.status === 'done') {
    IconComponent = CheckCircle;
    iconColor = '#4ade80'; // Green
  } else if (data.status === 'pending') {
    IconComponent = XCircle;
    iconColor = '#f87171'; // Red
  } else if (data.status === 'neutral') {
    IconComponent = MinusCircle;
    iconColor = '#9ca3af'; // Gray
  }

  return (
    <div className="custom-roadmap-node">
      <Handle 
        type="target" 
        position={targetPosition} 
        className="custom-handle" 
      />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px', justifyContent: 'center' }}>
        {IconComponent && <IconComponent size={120} color={iconColor} strokeWidth={2.5} />}
        <span>{data.label}</span>
      </div>
      
      <Handle 
        type="source" 
        position={sourcePosition} 
        className="custom-handle" 
      />
    </div>
  );
};

export default memo(CustomNode);
