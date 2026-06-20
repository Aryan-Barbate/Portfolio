import useScrollReveal from '../hooks/useScrollReveal';

const phases = [
  {
    num: '01',
    phase: 'Seed',
    title: 'First contact with code',
    description:
      "HTML clicked. A heading appeared. The first page wasn't beautiful — it was functional, and that was enough to get curious about what came next.",
    milestones: ['HTML', 'CSS', 'First page'],
  },
  {
    num: '02',
    phase: 'Root',
    title: 'Logic takes hold',
    description:
      'JavaScript was the first time code felt alive. Variables held state. Functions did things. The shift from styling to thinking in logic was the real turning point.',
    milestones: ['JavaScript', 'DOM', 'Async'],
  },
  {
    num: '03',
    phase: 'Sprout',
    title: 'First working apps',
    description:
      'React changed how I thought about interfaces. The first API call to Jikan for AniScope felt like plugging the browser into the internet for real.',
    milestones: ['React', 'APIs', 'AniScope', 'GitHub Finder'],
  },
  {
    num: '04',
    phase: 'Branch',
    title: 'Systems thinking',
    description:
      'Gallery of Senses was creativity meeting code — motion, color, and interaction as one system. The next chapter is depth: polish, performance, and new tools.',
    milestones: ['Creative UI', 'Motion', 'Linea Flora'],
  },
];

export default function Journey() {
  const sectionRef = useScrollReveal();

  return (
    <section id="journey" className="section-pad" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-row">
          <div>
            <p className="eyebrow reveal">Journey</p>
            <h2 className="display-section reveal reveal-delay-1" style={{ marginTop: '1rem' }}>
              How I got here.
            </h2>
          </div>
          <span className="section-index reveal reveal-delay-2">02</span>
        </div>

        <div className="journey-grid reveal reveal-delay-2">
          {phases.map(phase => (
            <article
              key={phase.num}
              className={`journey-card ${phase.active ? 'active' : ''}`}
            >
              <span className="journey-num">{phase.num}</span>
              <span className="journey-phase">{phase.phase}</span>
              <h3 className="journey-title">{phase.title}</h3>
              <p className="journey-desc">{phase.description}</p>
              <div className="journey-milestones">
                {phase.milestones.map(m => (
                  <span key={m} className="journey-milestone">{m}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
