import { MapPin } from 'lucide-react';
import { Github } from './BrandIcons';
import useScrollReveal from '../hooks/useScrollReveal';

export default function About() {
  const sectionRef = useScrollReveal();

  return (
    <section id="about" className="about-section section-pad" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-row">
          <div>
            <p className="eyebrow reveal">About</p>
            <h2 className="display-section reveal reveal-delay-1" style={{ marginTop: '1rem' }}>
              The builder behind<br />the work.
            </h2>
          </div>
          <span className="section-index reveal reveal-delay-2">04</span>
        </div>

        <div className="about-layout">
          <aside className="about-card reveal">
            <div className="about-avatar" aria-hidden="true">AB</div>
            <h3 className="about-name">Aryan Barbate</h3>
            <p className="about-role">Developer · Builder · India</p>

            <div className="about-stat-grid">
              <div className="about-stat">
                <div className="about-stat-value">4</div>
                <div className="about-stat-label">Projects shipped</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-value">♟</div>
                <div className="about-stat-label">Chess player</div>
              </div>
            </div>

            <div className="about-links">
              <a href="#" className="about-link" style={{ pointerEvents: 'none' }}>
                <MapPin size={14} />
                India
              </a>
              <a
                href="https://github.com/Aryan-Barbate"
                target="_blank"
                rel="noopener noreferrer"
                className="about-link"
              >
                <Github size={14} />
                github.com/Aryan-Barbate
              </a>
            </div>
          </aside>

          <div className="about-prose reveal reveal-delay-2">
            <p className="body-text">
              I'm a developer at the beginning of something — not at the start of a career,
              but someone who builds things, ships them, and immediately thinks about what
              would make them better.
            </p>

            <blockquote className="about-quote">
              "I'm not trying to look senior. I'm trying to build in a way that makes seniority inevitable."
            </blockquote>

            <p className="body-text">
              I approach code the way a chess player approaches an opening: with studied
              intentionality. Every project is a position on the board. You learn the patterns,
              understand the logic, then iterate toward something better.
            </p>

            <p className="body-text">
              Right now I'm deep in the frontend — React, JavaScript, CSS — while growing
              roots into the backend through Node.js and MongoDB. What you see here is small
              in quantity but high in intention. AniScope talks to a real API. GitHub Finder
              is a real tool. The Gallery of Senses is a real creative experiment.
            </p>

            <div className="about-values">
              {[
                { title: 'Build in public', sub: 'All work is open source' },
                { title: 'Learn daily', sub: 'Consistent growth over sprints' },
                { title: 'Ship then refine', sub: 'Working beats perfect' },
              ].map(v => (
                <div key={v.title} className="about-value">
                  <p className="about-value-title">{v.title}</p>
                  <p className="about-value-sub">{v.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
