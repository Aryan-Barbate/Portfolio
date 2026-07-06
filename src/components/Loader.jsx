import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const interval = 16;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const newProgress = Math.min(100, Math.pow(current / steps, 1.5) * 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(onLoaded, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="loader-center">
        <motion.div
          className="loader-logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="loader-text">AB</span>
        </motion.div>

        <div className="loader-progress">
          <motion.div
            className="loader-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <motion.div
          className="loader-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="loader-percentage">{Math.floor(progress)}%</span>
          <span className="loader-label">Loading experience</span>
        </motion.div>

        <div className="loader-grid">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="loader-dot"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.05,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              style={{
                background: i === 4 ? 'var(--accent)' : 'var(--ink)',
                transform: `rotate(${i * 45}deg)`
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}