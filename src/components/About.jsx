import { useState, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Github } from './BrandIcons';
import useScrollReveal from '../hooks/useScrollReveal';
import ChessGame from './ChessGame';
import VariableProximity from './VariableProximity';

import Highlighter from './Highlighter';
import NumberTicker from './NumberTicker';

export default function About() {
  const titleRef = useRef(null);
  const sectionRef = useScrollReveal();

  return (
    <section id="about" className="about-section section-pad" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-row">
          <div>
            <p className="eyebrow">About</p>
            <h2 ref={titleRef} className="display-section reveal reveal-delay-1" style={{ marginTop: '1rem', position: 'relative', wordBreak: 'break-word', whiteSpace: 'normal' }}>
              <VariableProximity
                label={'The builder behind the work.'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={titleRef}
                radius={150}
                falloff='linear'
              />
            </h2>
          </div>
          <span className="section-index reveal reveal-delay-2">05</span>
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
                <div className="about-stat-value"><NumberTicker value={4} /></div>
                <div className="about-stat-label">Projects shipped</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-value">♟</div>
                <div className="about-stat-label">Chess player</div>
              </div>
            </div>

            <div className="about-links" style={{ marginBottom: 'var(--space-6)' }}>
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

            <ChessGame />
          </aside>

          <div className="about-prose reveal reveal-delay-2">
            <p className="body-text">
              I'm a developer at the beginning of something — not at the start of a career,
              but someone who <Highlighter action="highlight" color="#e85d04" isView>builds things, ships them</Highlighter>, and immediately thinks about what
              would make them better.
            </p>

            <blockquote className="about-quote">
              "I'm not trying to look senior. I'm trying to build in a way that makes <Highlighter action="underline" color="#FF9800" isView>seniority inevitable</Highlighter>."
            </blockquote>

            <p className="body-text">
              I approach code the way a <Highlighter action="circle" color="#ffd1dc" isView>chess player approaches an opening</Highlighter>: with studied
              intentionality. Every project is a position on the board. You learn the patterns,
              understand the logic, then iterate toward something better.
            </p>

            <p className="body-text">
              Right now I'm deep in the frontend — React, JavaScript, CSS — building
              tools that talk to real APIs and <Highlighter action="box" color="#87CEFA" isView>experiences that reward attention</Highlighter>.
              What you see here is small in quantity but high in intention. AniScope
              talks to a real API. GitHub Finder is a real tool. Linea Flora is an
              interactive bouquet builder. The Gallery of Senses is a real creative
              experiment.
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
