import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useScrollReveal from '../hooks/useScrollReveal';
import VariableProximity from './VariableProximity';

const phases = [
  {
    num: '01',
    phase: 'Seed',
    title: 'First contact with code',
    description:
      "HTML clicked. A heading appeared. The first page wasn't beautiful — it was functional, and that was enough to get curious about what came next.",
    milestones: ['HTML', 'CSS', 'First page'],
  },
  {
    num: '02',
    phase: 'Root',
    title: 'Logic takes hold',
    description:
      'JavaScript was the first time code felt alive. Variables held state. Functions did things. The shift from styling to thinking in logic was the real turning point.',
    milestones: ['JavaScript', 'DOM', 'Async'],
  },
  {
    num: '03',
    phase: 'Sprout',
    title: 'First working apps',
    description:
      'React changed how I thought about interfaces. The first API call to Jikan for AniScope felt like plugging the browser into the internet for real.',
    milestones: ['React', 'APIs', 'AniScope', 'GitHub Finder'],
  },
  {
    num: '04',
    phase: 'Branch',
    title: 'Systems thinking',
    description:
      'Gallery of Senses was creativity meeting code — motion, color, and interaction as one system. The next chapter is depth: polish, performance, and new tools.',
    milestones: ['Creative UI', 'Motion', 'Linea Flora'],
  },
];

function JourneyCard({ phase, index }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    glareX.set((mouseX / width) * 100);
    glareY.set((mouseY / height) * 100);
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <div style={{ perspective: 1200, height: '100%' }}>
      <motion.article
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`journey-card ${phase.active ? 'active' : ''}`}
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: index * 0.2 // Stagger the floating animation
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          cursor: "default",
          height: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Dynamic Glare Effect */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
            ),
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div 
          style={{
            transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            height: "100%",
            transformStyle: "preserve-3d",
            position: 'relative',
            zIndex: 1
          }}
        >
          <span className="journey-num">{phase.num}</span>
          <span className="journey-phase">{phase.phase}</span>
          <h3 className="journey-title">{phase.title}</h3>
          <p className="journey-desc" style={{ flexGrow: 1 }}>{phase.description}</p>
          <div className="journey-milestones">
            {phase.milestones.map(m => (
              <span key={m} className="journey-milestone">{m}</span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Journey() {
  const titleRef = useRef(null);
  const sectionRef = useScrollReveal();

  return (
    <section id="journey" className="section-pad" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-row">
          <div>
            <p className="eyebrow reveal">Journey</p>
            <h2 ref={titleRef} className="display-section reveal reveal-delay-1" style={{ marginTop: '1rem', position: 'relative', wordBreak: 'break-word', whiteSpace: 'normal' }}>
              <VariableProximity
                label={'How I got here.'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={titleRef}
                radius={150}
                falloff='linear'
              />
            </h2>
          </div>
          <span className="section-index reveal reveal-delay-2">02</span>
        </div>

        <div className="journey-grid reveal reveal-delay-2">
          {phases.map((phase, index) => (
            <JourneyCard key={phase.num} phase={phase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
