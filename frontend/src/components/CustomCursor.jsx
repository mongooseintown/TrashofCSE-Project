import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const interactiveSelector = 'a, button, input, select, textarea, [role="button"], [data-cursor]';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState('');
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { damping: 28, stiffness: 260, mass: 0.35 });
  const trailY = useSpring(cursorY, { damping: 28, stiffness: 260, mass: 0.35 });

  useEffect(() => {
    const moveCursor = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);

      const target = event.target.closest?.(interactiveSelector);
      if (!target) {
        setIsHovering(false);
        setHoverLabel('');
        return;
      }

      setIsHovering(true);
      setHoverLabel(target.dataset.cursor || (target.tagName === 'BUTTON' ? 'GO' : 'OPEN'));
    };
    const hideCursor = () => setIsVisible(false);
    const showCursor = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseleave', hideCursor);
    window.addEventListener('mouseenter', showCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('mouseenter', showCursor);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className={`custom-cursor ${isHovering ? 'is-hovering' : ''}`} aria-hidden="true">
      <motion.div className="cursor-trail" style={{ x: trailX, y: trailY }} />
      <motion.div className="cursor-page" style={{ x: cursorX, y: cursorY }}>
        <span className="cursor-page-fold" />
        <span className="cursor-page-line line-one" />
        <span className="cursor-page-line line-two" />
        {isHovering && <b>{hoverLabel}</b>}
      </motion.div>
    </div>
  );
}
