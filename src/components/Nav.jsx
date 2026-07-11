import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Briefcase, Map, Wrench, User, PenTool, Mail, Command } from 'lucide-react';
import AnimatedThemeToggler from './AnimatedThemeToggler';
import './Nav.css';

const sections = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'journey', label: 'Journey', icon: Map },
  { id: 'capabilities', label: 'Skills', icon: Wrench },
  { id: 'about', label: 'About', icon: User },
  { id: 'writing', label: 'Writing', icon: PenTool },
  { id: 'contact', label: 'Contact', icon: Mail },
];

function DockItem({ mouseX, section, onClick, isActive }) {
  const ref = useRef(null);

  // Measure distance from mouse to center of this icon
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate width based on distance. If close, bigger width (80px), else normal (48px)
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const Icon = section.icon;

  return (
    <motion.button
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className={`dock-item ${isActive ? 'active' : ''}`}
      aria-label={section.label}
    >
      <Icon size={20} strokeWidth={2} />
      <span className="dock-tooltip">{section.label}</span>
    </motion.button>
  );
}

function DockThemeItem({ mouseX, theme, setTheme }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="dock-item-wrapper"
    >
      <AnimatedThemeToggler
        theme={theme}
        onThemeChange={setTheme}
        className="dock-item"
        style={{ width: '100%', height: '100%', outline: 'none' }}
        aria-label="Toggle theme"
      />
      <span className="dock-tooltip">Theme</span>
    </motion.div>
  );
}

export default function Nav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = sections.map(s => document.getElementById(s.id)).filter(Boolean);
      const current = sectionEls.find(el => {
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
      });
      if (current) setActiveSection(current.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('toggle-command-palette'));
  };

  return (
    <>
      <a href="#hero" className="top-left-logo" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>
        AB
      </a>

      <motion.div 
        className="dock-container"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {sections.map((s) => (
          <DockItem
            key={s.id}
            mouseX={mouseX}
            section={s}
            isActive={activeSection === s.id}
            onClick={() => scrollTo(s.id)}
          />
        ))}

        <div className="dock-divider" />

        <DockItem
          mouseX={mouseX}
          section={{ label: 'Command', icon: Command }}
          isActive={false}
          onClick={toggleCommandPalette}
        />

        <DockThemeItem
          mouseX={mouseX}
          theme={theme}
          setTheme={setTheme}
        />
      </motion.div>
    </>
  );
}
