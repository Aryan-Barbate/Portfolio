import { X, ExternalLink } from 'lucide-react';
import { Github } from './BrandIcons';
import { motion } from 'framer-motion';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.aside
        className="modal-panel"
        initial={{ y: '5vh', opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ y: '5vh', opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, staggerChildren: 0.05, delayChildren: 0.1 }}
        aria-label={`${project.name} project details`}
        role="dialog"
      >
        <motion.div className="modal-hero" variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" exit="hidden">
          <img
            className="modal-hero-cover"
            src={project.cover}
            alt=""
            decoding="async"
          />
          <div
            className="modal-hero-overlay"
            style={{
              background: `linear-gradient(160deg, ${project.color}cc, ${project.accent}88)`,
            }}
          />
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </motion.div>

        <motion.div className="modal-body" initial="hidden" animate="visible" exit="hidden" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}>
            <p className="eyebrow">{project.tag} · {project.year}</p>
            <h2 className="modal-title" style={{ marginTop: '0.75rem' }}>{project.name}</h2>
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

          <motion.div className="modal-links" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
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
        </motion.div>
      </motion.aside>
    </>
  );
}
