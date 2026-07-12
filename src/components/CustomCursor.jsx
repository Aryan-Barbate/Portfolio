import { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on devices with a mouse
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let rafId = null;

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      
      // Update DOM directly to avoid React re-renders which cause lag
      if (cursorRef.current) {
        // Use requestAnimationFrame for smoother performance
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          }
        });
      }

      // Check if hovering over a clickable element (simplified to avoid layout thrashing)
      const target = e.target;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('clickable'); // use a class instead of getComputedStyle

      // Only update state if it actually changed to prevent unnecessary re-renders
      setIsHovering(prev => prev !== isClickable ? isClickable : prev);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  // Keep it always in the DOM but hidden when not visible so we can ref it
  return (
    <div 
      ref={cursorRef}
      className={`custom-cursor-wrapper ${isHovering ? 'hovering' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: 'none'
      }}
    >
      <svg className="modern-cursor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path className="cursor-fill cursor-stroke" d="M3.5,3.5 L12.5,28.5 L17.5,17.5 L28.5,12.5 Z" />
      </svg>
    </div>
  );
}
