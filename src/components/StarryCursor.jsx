import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

const Star = ({ id, x, y }) => {
  const style = {
    top: y,
    left: x,
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 9999,
  };

  const randomScale = Math.random() * 0.5 + 0.5;
  const randomRotation = Math.random() * 360;

  return (
    <motion.div
      style={style}
      initial={{ scale: 0, opacity: 1, rotate: randomRotation }}
      animate={{ scale: [0, randomScale, 0], rotate: randomRotation + 45 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="star-svg"
      >
        <path
          d="M12 2L14.09 8.26L20 9.27L15.54 13.97L16.91 20L12 17.27L7.09 20L8.46 13.97L4 9.27L9.91 8.26L12 2Z"
          fill="url(#star-gradient)"
        />
        <defs>
          <radialGradient id="star-gradient">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#D8B4FE" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

const StarryCursor = () => {
  const [particles, setParticles] = useState([]);
  const { x, y } = useMousePosition();
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const distance = Math.sqrt(Math.pow(x - lastPosition.x, 2) + Math.pow(y - lastPosition.y, 2));

    if (distance > 30) {
      const newParticle = {
        id: Date.now(),
        x: x,
        y: y,
      };
      setParticles((prev) => [...prev, newParticle]);
      setLastPosition({ x, y });

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    }
  }, [x, y, lastPosition]);

  return (
    <AnimatePresence>
      {particles.map((p) => (
        <Star key={p.id} id={p.id} x={p.x} y={p.y} />
      ))}
    </AnimatePresence>
  );
};

export default StarryCursor;