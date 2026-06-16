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
    <section id="capabilities" className="section-pad" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-row">
          <div>
            <p className="eyebrow reveal">Capabilities</p>
            <h2 className="display-section reveal reveal-delay-1" style={{ marginTop: '1rem' }}>
              What I work with.
            </h2>
          </div>
          <span className="section-index reveal reveal-delay-2">03</span>
        </div>

        <div className="capabilities-layout">
          <div className="capabilities-intro reveal">
            <p className="body-text">
              No inflated percentages — just an honest map of what I use daily,
              what I'm sharpening, and what I'm growing into.
            </p>
            <p className="body-sm" style={{ marginTop: '1.5rem' }}>
              Currently deepening backend fundamentals through the MERN stack —
              databases, routes, and server-client communication.
            </p>
          </div>

          <div className="capabilities-groups reveal reveal-delay-2">
            {grouped.map(group => (
              <div key={group.name}>
                <div className="capability-group-header">
                  <span className="capability-group-name">{group.name}</span>
                  <span className="capability-group-desc">{group.description}</span>
                </div>
                <div className="capability-tags">
                  {group.items.map(skill => (
                    <span
                      key={skill.id}
                      className={`capability-tag ${group.name === 'Growing' ? 'growing' : ''}`}
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
