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
            <p className="eyebrow">About</p>
            <h2 className="display-section reveal reveal-delay-1" style={{ marginTop: '1rem' }}>
              The builder behind<br />the work.
            </h2>
          </div>
          <span className="section-index reveal reveal-delay-2">04</span>
        </div>

        <div className="about-layout">
          <aside className="about-card reveal">
            <img 
              className="about-avatar" 
              src="/avatar.jpg" 
              alt="Aryan Barbate profile photo" 
              style={{ objectFit: 'cover' }}
            />
            <h3 className="about-name">Aryan Barbate</h3>
            <p className="about-role">Developer · Builder · India</p>

            <div className="about-stat-grid">
              <div className="about-stat">
                <div className="about-stat-value">3</div>
                <div className="about-stat-label">Projects shipped</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-value">♟</div>
                <div className="about-stat-label">Chess player</div>
              </div>
            </div>

            <div className="about-links">
              <a 
                href="https://www.google.com/maps/place/India" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="about-link"
              >
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
              <a href="/resume.pdf" download className="about-link">
                <span style={{ fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>↓ Resume / CV</span>
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
              Right now I'm deep in the frontend — React, JavaScript, CSS — building
              tools that talk to real APIs and experiences that reward attention.
              What you see here is small in quantity but high in intention. AniScope
              talks to a real API. GitHub Finder is a real tool. The Gallery of
              Senses is a real creative experiment.
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

            <div className="about-endorsement" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px dashed var(--line)' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>Endorsement</p>
              <blockquote className="testimonial-quote" style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--ink-soft)', position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--accent)', lineHeight: 1.6 }}>
                "Aryan is a natural builder. He doesn't just write code; he gets deep into the behavior of the interface. His curiosity and methodical execution make him stand out."
              </blockquote>
              <p className="testimonial-author" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                — Senior Software Architect & Collaborator
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
