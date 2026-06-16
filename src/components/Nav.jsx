import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'capabilities', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionEls = sections.map(s => document.getElementById(s.id)).filter(Boolean);
      const current = sectionEls.find(el => {
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>
          <span className="nav-logo-mark">AB</span>
        </a>

        <ul className="nav-links">
          {sections.slice(1, -1).map(s => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`nav-link ${activeSection === s.id ? 'active' : ''}`}
                onClick={e => { e.preventDefault(); scrollTo(s.id); }}
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </li>
          <li>
            <a
              href="#contact"
              className="nav-link nav-cta"
              onClick={e => { e.preventDefault(); scrollTo('contact'); }}
            >
              Let's talk
            </a>
          </li>
        </ul>

        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="mobile-menu-links">
          {sections.map(s => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="mobile-menu-link"
                onClick={e => { e.preventDefault(); scrollTo(s.id); }}
              >
                {s.label}
              </a>
            </li>
          ))}
          <li style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
              style={{ padding: '12px', width: '44px', height: '44px' }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
