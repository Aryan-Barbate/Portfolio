import { forwardRef, useMemo, useRef, useEffect } from 'react';
import './VariableProximity.css';

function useAnimationFrame(callback, containerRef) {
  useEffect(() => {
    let frameId;
    let observer;
    let isIntersecting = true; // default to true if no observer

    if (containerRef?.current) {
      observer = new IntersectionObserver(([entry]) => {
        isIntersecting = entry.isIntersecting;
      }, { threshold: 0 });
      observer.observe(containerRef.current);
    }

    let lastTime = 0;
    const TARGET_INTERVAL = 33; // ~30fps
    const loop = (timestamp) => {
      frameId = requestAnimationFrame(loop);
      if (!isIntersecting) return;
      if (timestamp - lastTime < TARGET_INTERVAL) return;
      lastTime = timestamp;
      callback();
    };
    
    frameId = requestAnimationFrame(loop);
    
    return () => {
      cancelAnimationFrame(frameId);
      if (observer) observer.disconnect();
    };
  }, [callback, containerRef]);
}

function useMousePositionRef() {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = ev => {
      positionRef.current = { x: ev.pageX, y: ev.pageY };
    };
    const handleTouchMove = ev => {
      const touch = ev.touches[0];
      positionRef.current = { x: touch.pageX, y: touch.pageY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  const letterPositionsRef = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const mousePositionRef = useMousePositionRef();
  const lastPositionRef = useRef({ x: null, y: null });

  const parsedSettings = useMemo(() => {
    const parseSettings = settingsStr =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = distance => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  };

  const calculateLetterPositions = () => {
    letterPositionsRef.current = letterRefs.current.map((letterRef) => {
      if (!letterRef) return null;
      const rect = letterRef.getBoundingClientRect();
      return {
        x: rect.left + window.scrollX + rect.width / 2,
        y: rect.top + window.scrollY + rect.height / 2,
      };
    });
  };

  useEffect(() => {
    if (!containerRef?.current) return;
    calculateLetterPositions();
    
    // Recalculate positions if the font loads or container resizes
    const observer = new ResizeObserver(() => {
      calculateLetterPositions();
    });
    observer.observe(containerRef.current);
    window.addEventListener('resize', calculateLetterPositions);
    
    // A fallback timeout for late font loads
    const timeout = setTimeout(calculateLetterPositions, 500);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', calculateLetterPositions);
      clearTimeout(timeout);
    };
  }, [containerRef]);

  useAnimationFrame(() => {
    if (!containerRef?.current) return;
    const { x, y } = mousePositionRef.current;
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }
    lastPositionRef.current = { x, y };

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;

      const pos = letterPositionsRef.current[index];
      if (!pos) return;

      const distance = calculateDistance(
        mousePositionRef.current.x,
        mousePositionRef.current.y,
        pos.x,
        pos.y
      );

      if (distance >= radius) {
        if (letterRef.style.fontVariationSettings !== fromFontVariationSettings) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
        }
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          // Round to nearest integer to massively reduce unique DOM writes
          return `'${axis}' ${Math.round(interpolatedValue)}`;
        })
        .join(', ');

      if (interpolatedSettingsRef.current[index] !== newSettings) {
        interpolatedSettingsRef.current[index] = newSettings;
        letterRef.style.fontVariationSettings = newSettings;
      }
    });
  }, containerRef);

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`}
      onClick={onClick}
      style={{ display: 'inline', ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <span
                key={currentLetterIndex}
                ref={el => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: fromFontVariationSettings,
                  willChange: 'font-variation-settings'
                }}
                aria-hidden="true"
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
