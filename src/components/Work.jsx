import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';
import useScrollReveal from '../hooks/useScrollReveal';
import { AnimatePresence } from 'framer-motion';

function ProjectImage({ src, alt, color, accent }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {loading && (
        <div 
          className="shimmer" 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(244,240,232,0.03) 25%, rgba(244,240,232,0.1) 50%, rgba(244,240,232,0.03) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite linear',
            zIndex: 3
          }}
        />
      )}
      {!error ? (
        <img
          className="project-card-cover"
          src={src}
          alt={alt}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          loading="lazy"
          decoding="async"
          draggable="false"
          style={{
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.4s ease',
            zIndex: 0
          }}
        />
      ) : (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${color}dd 0%, ${accent}aa 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 0
          }}
        >
          <span style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.75rem', 
            fontWeight: 'bold', 
            color: '#f4f0e8',
            opacity: 0.8
          }}>
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Work() {
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState(0);
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const sectionRef = useScrollReveal();

  // Drag scrolling state refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollY = useRef(0);
  const hasDragged = useRef(false);
  const dragThreshold = 5;

  useEffect(() => {
    const onScroll = () => {
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;

      if (window.innerWidth <= 768) {
        track.style.transform = '';
        return;
      }

      const rect = outer.getBoundingClientRect();
      const scrollable = outer.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const ratio = scrollable > 0 ? scrolled / scrollable : 0;

      const maxTranslate = track.scrollWidth - window.innerWidth + 80;
      track.style.transform = `translateX(-${ratio * maxTranslate}px)`;
      setProgress(ratio * 100);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        if (trackRef.current) trackRef.current.style.transform = '';
      } else {
        onScroll();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (window.innerWidth <= 768) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startScrollY.current = window.scrollY;
    hasDragged.current = false;

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
    if (trackRef.current) {
      trackRef.current.classList.add('dragging');
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;

      const maxTranslate = track.scrollWidth - window.innerWidth + 80;
      const scrollableHeight = outer.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0 || maxTranslate <= 0) return;

      const deltaX = e.clientX - startX.current;
      if (Math.abs(deltaX) > dragThreshold) {
        hasDragged.current = true;
      }

      const ratio = maxTranslate / scrollableHeight;
      const deltaY = -deltaX / ratio;

      window.scrollTo({
        top: startScrollY.current + deltaY,
        behavior: 'auto'
      });
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        if (trackRef.current) {
          trackRef.current.classList.remove('dragging');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <section id="work" className="work-section" ref={sectionRef}>
        <div className="work-scroll-outer" ref={outerRef}>
          <div className="work-sticky">
            <div className="work-header">
              <div className="section-header-row">
                <div>
                  <p className="eyebrow reveal">Selected Work</p>
                  <h2 className="display-section reveal reveal-delay-1" style={{ marginTop: '1rem' }}>
                    Four projects,<br />one practice.
                  </h2>
                </div>
                <span className="section-index reveal reveal-delay-2">01</span>
              </div>
            </div>

            <div className="work-track-wrap">
              <div 
                className="work-track" 
                ref={trackRef}
                onMouseDown={handleMouseDown}
              >
                {projects.map((project, i) => (
                  <button
                    key={project.id}
                    className="project-card"
                    onClick={(e) => {
                      if (hasDragged.current) {
                        e.preventDefault();
                        return;
                      }
                      setSelected(project);
                    }}
                    aria-label={`Open ${project.name} details`}
                  >
                    <div className="project-card-visual">
                      <div className="project-browser-bar">
                        <span className="browser-dot red" />
                        <span className="browser-dot yellow" />
                        <span className="browser-dot green" />
                        <span className="browser-url-bar">{project.id}.local</span>
                      </div>
                      
                      <div className="project-image-wrap">
                        <ProjectImage 
                          src={project.cover} 
                          alt={project.name} 
                          color={project.color} 
                          accent={project.accent} 
                        />
                      </div>
                      <div
                        className="project-card-bg"
                        style={{
                          background: `linear-gradient(145deg, ${project.color}88 0%, ${project.accent}44 100%)`,
                        }}
                      />
                      <span className="project-card-index">0{i + 1}</span>
                      <span className="project-card-tag">{project.tag}</span>
                      <span className="project-card-arrow" aria-hidden="true">
                        <ArrowUpRight size={20} />
                      </span>
                    </div>
                    <h3 className="project-card-name">{project.name}</h3>
                    <div className="project-card-stack">
                      {project.stack.slice(0, 3).map(tech => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="work-progress" aria-hidden="true">
              <span className="work-progress-label">Drag or scroll</span>
              <div className="work-progress-bar">
                <div className="work-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="work-progress-label">{projects.length} projects</span>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
