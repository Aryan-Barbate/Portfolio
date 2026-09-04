import { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';
import useScrollReveal from '../hooks/useScrollReveal';
import { AnimatePresence } from 'framer-motion';
import VariableProximity from './VariableProximity';

function ProjectImage({ src, alt, color, accent, fit = 'cover' }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative', 
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: fit === 'contain' ? '#0d0d0d' : undefined
    }}>
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
          className={`project-card-cover ${fit === 'contain' ? 'fit-contain' : ''}`}
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
            transition: 'opacity 0.4s ease, transform 0.8s var(--ease-out)',
            zIndex: 0,
            objectFit: fit,
            objectPosition: 'center',
            width: '100%',
            height: '100%'
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
  const titleRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const sectionRef = useScrollReveal();

  return (
    <>
      <section id="work" className="work-section" ref={sectionRef} style={{ position: 'relative', minHeight: '100vh', paddingBottom: 0 }}>
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
          <div className="section-header-row">
            <div>
              <p className="eyebrow reveal">Selected Work</p>
              <h2 ref={titleRef} className="display-section reveal reveal-delay-1" style={{ marginTop: '1rem', position: 'relative', wordBreak: 'break-word', whiteSpace: 'normal' }}>
                <VariableProximity
                  label={'Six projects, one practice.'}
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 900, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff='linear'
                />
              </h2>
            </div>
            <span className="section-index reveal reveal-delay-2">01</span>
          </div>
        </div>

        {/* Native CSS Sticky Stacking Layout */}
        <div style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', paddingBottom: '10vh' }}>
          {projects.map((project, i) => (
            <div 
              key={project.id}
              style={{
                position: 'sticky',
                top: `calc(12vh + ${i * 40}px)`,
                marginBottom: i === projects.length - 1 ? '0' : '10vh',
                zIndex: i,
                width: '100%',
                maxWidth: '900px',
                margin: '0 auto',
                background: 'var(--bg-card, #0a0a0a)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            >
              <button
                className="project-card"
                onClick={() => setSelected(project)}
                aria-label={`Open ${project.name} details`}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: 'none',
                  padding: '20px',
                  margin: 0,
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div className="project-card-visual" style={{ width: '100%', aspectRatio: '16/9', position: 'relative', overflow: 'hidden' }}>
                  
                  <div className="project-image-wrap" style={{ height: '100%', width: '100%' }}>
                    <ProjectImage 
                      src={project.cover} 
                      alt={project.name} 
                      color={project.color} 
                      accent={project.accent} 
                      fit={project.fit}
                    />
                  </div>
                  {/* Minimal subtle gradient for text legibility, no heavy overlay */}
                  <div
                    className="project-card-bg"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: project.fit === 'contain' ? 'rgba(0,0,0,0.1)' : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 40%)',
                      pointerEvents: 'none'
                    }}
                  />
                  <span className="project-card-index">0{i + 1}</span>
                  <span className="project-card-tag">{project.tag}</span>
                  <span className="project-card-arrow" aria-hidden="true">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                
                <div style={{ marginTop: '1.2rem' }}>
                  <h3 className="project-card-name" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary, #fff)', fontWeight: '500', letterSpacing: '-0.02em' }}>{project.name}</h3>
                  <div className="project-card-stack" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {project.stack.slice(0, 3).map(tech => (
                      <span key={tech} style={{ padding: '0.2rem 0.6rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-secondary, #999)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{tech}</span>
                    ))}
                  </div>
                </div>
              </button>
            </div>
          ))}
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
