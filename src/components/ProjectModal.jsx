import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Github } from './BrandIcons';
import { motion } from 'framer-motion';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (window.lenis) window.lenis.stop();
    document.body.style.overflow = 'hidden';
    return () => {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    };
  }, []);

  if (!project) return null;

  return (
    <>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{ backdropFilter: 'blur(4px)' }}
      />
      <motion.aside
        className="modal-panel"
        initial={{ y: '5vh', opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: '5vh', opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, staggerChildren: 0.05, delayChildren: 0.1 }}
        aria-label={`${project.name} project details`}
        role="dialog"
      >
        <button className="modal-close" onClick={onClose} aria-label="Close" style={{ zIndex: 100 }}>
          <X size={18} />
        </button>

        <motion.div 
          className="modal-hero" 
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} 
          initial="hidden" 
          animate="visible" 
          exit="hidden"
          style={{
            background: project.fit === 'contain' ? '#0d0d0d' : undefined,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            className="modal-hero-cover"
            src={project.cover}
            alt=""
            decoding="async"
            style={{
              objectFit: project.fit || 'cover',
              objectPosition: 'center',
            }}
          />
          {project.fit !== 'contain' && (
            <div
              className="modal-hero-overlay"
              style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 20%)`,
              }}
            />
          )}
        </motion.div>

        <motion.div className="modal-body" data-lenis-prevent="true" initial="hidden" animate="visible" exit="hidden" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}>
            <p className="eyebrow">{project.tag} · {project.year}</p>
            <h2 className="modal-title" style={{ marginTop: '0.75rem' }}>{project.name}</h2>
          </motion.div>

          <motion.div className="modal-links" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ display: 'flex', gap: '1rem', marginTop: '-1rem' }}>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={14} />
                Live site
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <Github size={14} />
              Source
            </a>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}>
            <p className="modal-block-label">Overview</p>
            <p className="body-text">{project.purpose}</p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}>
            <p className="modal-block-label">Stack</p>
            <div className="modal-tags">
              {project.stack.map(tech => (
                <span key={tech} className="modal-tag">{tech}</span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}>
            <p className="modal-block-label">Context</p>
            <p className="body-sm" style={{ color: 'var(--ink-soft)', lineHeight: 1.75 }}>
              {project.description}
            </p>
          </motion.div>

          <motion.div className="modal-quote" variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}>
            <p>{project.takeaway}</p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}>
            <p className="modal-block-label">What I learned</p>
            <p className="body-sm" style={{ color: 'var(--ink-soft)', lineHeight: 1.75, fontStyle: 'italic' }}>
              {project.taught}
            </p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}>
            <p className="modal-block-label">Next</p>
            <p className="body-sm" style={{ color: 'var(--muted)' }}>{project.nextEvolution}</p>
          </motion.div>
        </motion.div>
      </motion.aside>
    </>
  );
}
