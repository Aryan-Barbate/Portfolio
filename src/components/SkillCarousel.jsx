import { useMemo } from 'react';
import './SkillCarousel.css';

export default function SkillCarousel({ groupedSkills }) {
  const numCards = groupedSkills.length;
  
  // Calculate the radius required to form a perfect circle with the given cards
  // Width is ~240px. A bit of gap means we use effectively ~260px for the chord length.
  // radius = (chord / 2) / Math.sin(Math.PI / numCards)
  const radius = useMemo(() => {
    const chord = 260; 
    return (chord / 2) / Math.sin(Math.PI / numCards);
  }, [numCards]);

  const angleStep = 360 / numCards;

  return (
    <div className="carousel-container">
      <div className="carousel-cylinder">
        {groupedSkills.map((group, index) => {
          // Each card is rotated around Y, and then pushed out by the radius
          const rotateY = index * angleStep;
          
          return (
            <div 
              key={group.name} 
              className="carousel-card"
              style={{
                transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`
              }}
            >
              <h3>{group.name}</h3>
              <p className="carousel-card-desc">{group.description}</p>
              
              <div className="carousel-tags">
                {group.items.map(skill => (
                  <span 
                    key={skill.id} 
                    className={`carousel-tag ${skill.tag ? skill.tag.toLowerCase() : ''}`}
                  >
                    {skill.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
