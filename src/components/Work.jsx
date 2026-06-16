import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Work() {
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState(0);
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const sectionRef = useScrollReveal();

  useEffect(() => {
    const onScroll = () => {
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track || window.innerWidth <= 768) return;

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
    return () => window.removeEventListener('scroll', onScroll);
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
              <div className="work-track" ref={trackRef}>
                {projects.map((project, i) => (
                  <button
                    key={project.id}
                    className="project-card"
                    onClick={() => setSelected(project)}
                    aria-label={`Open ${project.name} details`}
                  >
                    <div className="project-card-visual">
                      <div
                        className="project-card-bg"
                        style={{
                          background: `linear-gradient(145deg, ${project.color} 0%, ${project.accent} 100%)`,
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
              <span className="work-progress-label">Drag scroll</span>
              <div className="work-progress-bar">
                <div className="work-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="work-progress-label">{projects.length} projects</span>
            </div>
          </div>
        </div>
      </section>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
