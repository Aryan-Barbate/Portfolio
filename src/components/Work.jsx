import { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';
import useScrollReveal from '../hooks/useScrollReveal';
import { AnimatePresence } from 'framer-motion';
import VariableProximity from './VariableProximity';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

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
            zIndex: 0,
            objectFit: 'cover',
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
                  label={'Four projects, one practice.'}
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

        {/* Adjusting the container to handle the vertical scrolling natively inside the layout */}
        <div style={{ height: '80vh', width: '100%', position: 'relative' }}>
          <ScrollStack 
            itemDistance={40} 
            itemScale={0.04} 
            itemStackDistance={30} 
            blurAmount={4}
            useWindowScroll={false}
          >
            {projects.map((project, i) => (
              <ScrollStackItem key={project.id} itemClassName="custom-project-stack">
                <button
                  className="project-card"
                  onClick={() => setSelected(project)}
                  aria-label={`Open ${project.name} details`}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    background: 'none',
                    padding: 0,
                    margin: 0,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div className="project-card-visual" style={{ width: '100%', aspectRatio: '16/9', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                    <div className="project-browser-bar">
                      <span className="browser-dot red" />
                      <span className="browser-dot yellow" />
                      <span className="browser-dot green" />
                      <span className="browser-url-bar">{project.id}.local</span>
                    </div>
                    
                    <div className="project-image-wrap" style={{ height: '100%', width: '100%' }}>
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
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(145deg, ${project.color}88 0%, ${project.accent}44 100%)`,
                        mixBlendMode: 'overlay'
                      }}
                    />
                    <span className="project-card-index">0{i + 1}</span>
                    <span className="project-card-tag">{project.tag}</span>
                    <span className="project-card-arrow" aria-hidden="true">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                  
                  <div style={{ marginTop: '1.5rem' }}>
                    <h3 className="project-card-name" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{project.name}</h3>
                    <div className="project-card-stack" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {project.stack.slice(0, 3).map(tech => (
                        <span key={tech} style={{ padding: '0.25rem 0.75rem', background: 'var(--bg-card)', borderRadius: '20px', fontSize: '0.875rem' }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </button>
              </ScrollStackItem>
            ))}
          </ScrollStack>
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
