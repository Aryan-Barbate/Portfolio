import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function Loader({ onLoaded }) {
  const count = useMotionValue(0);
  const numberRef = useRef(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();
    
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, []);

  // For the SVG circle progress
  const circumference = 2 * Math.PI * 120; // radius = 120
  const strokeDashoffset = useTransform(count, [0, 100], [circumference, 0]);
  const rotate = useTransform(count, [0, 100], [-90, 270]); // Start at top, rotate

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        count.set(value);
        if (numberRef.current) {
          numberRef.current.textContent = Math.round(value);
        }
      },
      onComplete: () => {
        setIsDone(true);
        setTimeout(onLoaded, 800); // Wait for exit animation
      }
    });
    return () => controls.stop();
  }, [count, onLoaded]);

  return (
    <motion.div
      className="loader"
      initial={{ clipPath: 'circle(150% at 50% 50%)' }}
      animate={{ clipPath: isDone ? 'circle(0% at 50% 50%)' : 'circle(150% at 50% 50%)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--paper)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--ink)'
      }}
    >
      <div style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
        {/* SVG Circular Progress */}
        <motion.svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          style={{ position: 'absolute', rotate }}
        >
          {/* Background Ring */}
          <circle
            cx="150"
            cy="150"
            r="120"
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="2"
            opacity="0.2"
          />
          {/* Progress Ring */}
          <motion.circle
            cx="150"
            cy="150"
            r="120"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
          />
        </motion.svg>

        {/* Percentage Text */}
        <motion.div
          style={{
            position: 'absolute',
            fontFamily: 'var(--font-mono)',
            fontSize: '2.5rem',
            fontWeight: 400,
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'baseline',
            color: 'var(--ink)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isDone ? 0 : 1, scale: isDone ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span ref={numberRef}>0</motion.span>
          <span style={{ fontSize: '1rem', marginLeft: '4px', color: 'var(--muted)' }}>%</span>
        </motion.div>
      </div>
    </motion.div>
  );
}