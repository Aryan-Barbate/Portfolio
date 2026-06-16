import { skills } from '../data/skills';

const items = [
  ...skills.map(s => s.label),
  'React',
  'Ship Fast',
  'Chess Player',
  'Open Source',
  'India',
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
