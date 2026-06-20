import { skills } from '../data/skills';

const row1 = [
  ...skills.filter((_, idx) => idx % 2 === 0).map(s => s.label),
  'Ship Fast',
  'Chess Player',
  'Open Source',
  'India'
];

const row2 = [
  ...skills.filter((_, idx) => idx % 2 !== 0).map(s => s.label),
  'React',
  'Frontend Developer',
  'Vite',
  'UI Engineering'
];

export default function Marquee() {
  const doubledRow1 = [...row1, ...row1];
  const doubledRow2 = [...row2, ...row2];

  return (
    <div className="marquee-container" style={{ display: 'flex', flexDirection: 'column', gap: '0px', background: 'var(--ink)' }}>
      {/* First Marquee: Slides Left */}
      <div className="marquee-wrap" aria-hidden="true" style={{ borderBottom: 'none' }}>
        <div className="marquee-track">
          {doubledRow1.map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>
      
      {/* Second Marquee: Slides Right */}
      <div className="marquee-wrap reverse" aria-hidden="true" style={{ paddingTop: '0px' }}>
        <div className="marquee-track reverse">
          {doubledRow2.map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
