import { motion } from 'framer-motion';

const lines = [
  { text: 'Aryan', accent: false },
  { text: 'Barbate', accent: true },
];

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-orb" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-top-row">
          <div className="hero-status">
            <span className="hero-status-dot" />
            Available for work
          </div>
          <div className="hero-meta">
            <p>Frontend developer · India</p>
            <p>React · JavaScript · APIs</p>
            <p>Chess player · Builder</p>
          </div>
        </div>

        <div className="hero-title-wrap">
          <h1 className="display-hero">
            {lines.map((line, i) => (
              <span key={line.text} className="hero-title-line">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className={line.accent ? 'hero-title-accent' : ''}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.p
          className="body-text hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          I build interfaces with intention — live API tools, creative experiments,
          and polished front-end craft. Small in quantity,{' '}
          <span className="serif-italic">high in craft.</span>
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <button className="btn btn-primary" onClick={() => scrollTo('work')}>
            View selected work
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo('about')}>
            Read the story
          </button>
          <a href="/resume.pdf" download className="btn btn-outline">
            Download CV
          </a>
        </motion.div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
