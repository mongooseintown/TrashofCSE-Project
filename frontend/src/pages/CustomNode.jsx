import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react';

const CustomNode = ({ data, targetPosition = Position.Left, sourcePosition = Position.Right }) => {
  let IconComponent = null;
  let iconColor = '';
  
  if (data.status === 'done') {
    IconComponent = CheckCircle;
    iconColor = 'var(--text-primary)'; 
  } else if (data.status === 'pending') {
    IconComponent = XCircle;
    iconColor = 'var(--text-muted)'; 
  } else if (data.status === 'neutral') {
    IconComponent = MinusCircle;
    iconColor = 'var(--text-muted)'; 
  }

  return (
    <div className={`custom-roadmap-node ${data.isVertical ? 'vertical-node' : ''}`}>
      <Handle 
        type="target" 
        position={targetPosition} 
        className="custom-handle" 
      />
      
      <div className={data.isVertical ? "vertical-content" : "horizontal-content"}>
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
