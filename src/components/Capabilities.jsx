import { skills, skillGroups } from '../data/skills';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Capabilities() {
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
            <h2 className="display-section reveal reveal-delay-1" style={{ marginTop: '1rem', color: '#fff' }}>
              My Technical Arsenal.
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

          <div className="capabilities-grid reveal reveal-delay-2">
            {grouped.map(group => (
              <div key={group.name} className="capability-group-card glass-card">
                <div className="capability-group-header">
                  <span className="capability-group-name">{group.name}</span>
                  <span className="capability-group-desc">{group.description}</span>
                </div>
                <div className="capability-tags">
                  {group.items.map(skill => (
                    <span
                      key={skill.id}
                      className={`capability-tag ${skill.tag ? skill.tag.toLowerCase() : ''}`}
                    >
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
