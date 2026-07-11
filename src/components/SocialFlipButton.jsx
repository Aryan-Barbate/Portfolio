import { useState } from 'react';
import { motion } from 'framer-motion';

function SocialFlipNode({ item, index, isHovered }) {
  if (item.plain) {
    return (
      <div className="social-flip-node social-flip-plain" style={{ perspective: '1000px' }}>
        <div className="social-flip-face social-flip-front">{item.letter}</div>
      </div>
    );
  }

  const Wrapper = item.href ? 'a' : 'div';
  const wrapperProps = item.href
    ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
    : { onClick: item.onClick };

  return (
    <Wrapper
      {...wrapperProps}
      className="social-flip-node"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="social-flip-inner"
        initial={false}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 120, damping: 15, delay: index * 0.08 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="social-flip-face social-flip-front"
          style={item.letter.length > 1 ? { fontSize: '0.95rem', letterSpacing: 0 } : undefined}
        >
          {item.letter}
        </div>
        <div className="social-flip-face social-flip-back">{item.icon}</div>
      </motion.div>
    </Wrapper>
  );
}

export default function SocialFlipButton({ items = [], className = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`social-flip ${className}`}>
      <div
        className="social-flip-group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="social-flip-border social-flip-border-top"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="social-flip-border social-flip-border-bottom"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />

        {items.map((item, index) => (
          <SocialFlipNode
            key={item.label || `plain-${index}`}
            item={item}
            index={index}
            isHovered={isHovered}
          />
        ))}
      </div>
    </div>
  );
}
