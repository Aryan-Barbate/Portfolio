import { useRef } from 'react';
import './FolderCard.css';

export default function FolderCard({ children, className = '', onClick }) {
  const ref = useRef(null);

  // A tracing border effect achieved by animating a conical gradient via CSS
  return (
    <div 
      ref={ref}
      className={`folder-card ${className}`}
      onClick={onClick}
    >
      {/* Animated glow border */}
      <div className="folder-glow-border"></div>
      
      {/* Inner content wrapper */}
      <div className="folder-content">
        {children}
      </div>
    </div>
  );
}
