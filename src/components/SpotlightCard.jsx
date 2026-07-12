import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function SpotlightCard({ children, className = '', style = {} }) {
  const ref = useRef(null);
  
  // Spotlight position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for magnetic children
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      className={`${className} spotlight-wrapper`}
      onMouseMove={handleMouseMove}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        // Pass mouse coordinates to CSS variables for the spotlight
      }}
    >
      <motion.div
        className="spotlight-layer"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(400px circle at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), var(--accent-glow), transparent 40%)`,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      {/* Dynamic inline styles to pass motion values to CSS */}
      <motion.div
        style={{
          '--x': mouseX,
          '--y': mouseY,
          '--mx': useTransform(springX, (val) => (val - (ref.current?.offsetWidth || 0) / 2) / 20),
          '--my': useTransform(springY, (val) => (val - (ref.current?.offsetHeight || 0) / 2) / 20),
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="spotlight-content"
      >
        {children}
      </motion.div>
    </div>
  );
}
