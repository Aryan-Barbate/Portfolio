import { X, ExternalLink } from 'lucide-react';
import { Github } from './BrandIcons';
import { motion } from 'framer-motion';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        className="modal-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 300 }}
        aria-label={`${project.name} project details`}
        role="dialog"
      >
        <div className="modal-hero">
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
        </div>

        <div className="modal-body">
          <div>
            <p className="eyebrow">{project.tag} · {project.year}</p>
            <h2 className="modal-title" style={{ marginTop: '0.75rem' }}>{project.name}</h2>
          </div>

          <div>
            <p className="modal-block-label">Overview</p>
            <p className="body-text">{project.purpose}</p>
          </div>

          <div>
            <p className="modal-block-label">Stack</p>
            <div className="modal-tags">
              {project.stack.map(tech => (
                <span key={tech} className="modal-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="modal-block-label">Context</p>
            <p className="body-sm" style={{ color: 'var(--ink-soft)', lineHeight: 1.75 }}>
              {project.description}
            </p>
          </div>

          <div className="modal-quote">
            <p>{project.takeaway}</p>
          </div>

          <div>
            <p className="modal-block-label">What I learned</p>
            <p className="body-sm" style={{ color: 'var(--ink-soft)', lineHeight: 1.75, fontStyle: 'italic' }}>
              {project.taught}
            </p>
          </div>

          <div>
            <p className="modal-block-label">Next</p>
            <p className="body-sm" style={{ color: 'var(--muted)' }}>{project.nextEvolution}</p>
          </div>

          <div className="modal-links">
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
          </div>
        </div>
      </motion.aside>
    </>
  );
}
