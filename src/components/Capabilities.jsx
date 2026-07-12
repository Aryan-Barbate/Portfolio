import { useRef } from 'react';
import { skills, skillGroups } from '../data/skills';
import useScrollReveal from '../hooks/useScrollReveal';
import VariableProximity from './VariableProximity';
import SkillCarousel from './SkillCarousel';

export default function Capabilities() {
  const titleRef = useRef(null);
  const sectionRef = useScrollReveal();

  const grouped = Object.entries(skillGroups).map(([name, meta]) => ({
    name,
    ...meta,
    items: skills.filter(s => s.group === name),
  }));

  return (
    <section id="capabilities" className="section-pad capabilities-dark-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-row">
          <div>
            <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>Capabilities & Stack</p>
            <h2 ref={titleRef} className="display-section reveal reveal-delay-1" style={{ marginTop: '1rem', position: 'relative', wordBreak: 'break-word', whiteSpace: 'normal' }}>
              <VariableProximity
                label={'My Technical Arsenal.'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={titleRef}
                radius={150}
                falloff='linear'
              />
            </h2>
          </div>
          <span className="section-index reveal reveal-delay-2" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>03</span>
        </div>

        <div className="capabilities-new-layout">
          <div className="capabilities-intro reveal">
            <p className="body-text" style={{ maxWidth: '680px', color: 'rgba(255,255,255,0.8)' }}>
              A living map of the languages, frameworks, and tools I use to build,
              analyze, and create—from low-level logic to AI-assisted workflows.
            </p>
          </div>

          <div className="capabilities-orbital-wrapper reveal reveal-delay-2" style={{ marginTop: '2rem' }}>
            <SkillCarousel groupedSkills={grouped} />
          </div>
        </div>
      </div>
    </section>
  );
}
