import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const interactiveSelector = 'a, button, input, select, textarea, [role="button"], [data-cursor]';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const beamX = useSpring(x, { damping: 30, stiffness: 240, mass: 0.28 });
  const beamY = useSpring(y, { damping: 30, stiffness: 240, mass: 0.28 });

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);
      const target = event.target.closest?.(interactiveSelector);
      setIsHovering(Boolean(target));
      setLabel(target?.dataset.cursor || (target ? 'FOCUS' : ''));
    };
    const hide = () => setIsVisible(false);
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseleave', hide);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', hide);
    };
  }, [x, y]);

  if (!isVisible) return null;
  return (
    <div className={`custom-cursor ${isHovering ? 'is-hovering' : ''}`} aria-hidden="true">
      <motion.div className="cursor-beam" style={{ x: beamX, y: beamY }}>
        <span className="beam-core" />
        <span className="beam-tick" />
        {isHovering && <b>{label}</b>}
      </motion.div>
    </div>
  );
}
