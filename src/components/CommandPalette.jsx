import { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

/* ── Icon Components ────────────────────────────────────── */
const Icon = ({ d, ...props }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d={d} />
  </svg>
);

const icons = {
  home:       <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" />,
  projects:   <Icon d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />,
  journey:    <Icon d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0" />,
  skills:     <Icon d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5" />,
  console:    <Icon d="M4 17l6-5-6-5 M12 19h8" />,
  about:      <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />,
  writing:    <Icon d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />,
  contact:    <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />,
  theme:      <Icon d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  confetti:   <Icon d="M12 2v4 M12 18v4 M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83 M2 12h4 M18 12h4 M4.93 19.07l2.83-2.83 M16.24 7.76l2.83-2.83" />,
  search:     <Icon d="M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z M21 21l-4.35-4.35" />,
};

/* ── Component ──────────────────────────────────────────── */
export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const itemRefs = useRef([]);

  /* ── Keyboard shortcuts (open / close) ── */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((o) => !o);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /* ── Custom event listener ── */
  useEffect(() => {
    const h = () => setIsOpen((o) => !o);
    window.addEventListener('toggle-command-palette', h);
    return () => window.removeEventListener('toggle-command-palette', h);
  }, []);

  /* ── Focus & body lock ── */
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Scroll active item into view ── */
  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  /* ── Actions ── */
  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = (localStorage.getItem('theme') || 'light') === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: next }));
    setIsOpen(false);
  }, []);

  const triggerConfetti = useCallback(() => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 }, colors: ['#ff7214', '#e85d04', '#ffbc42', '#2a2824', '#f4f0e8'] });
    setIsOpen(false);
  }, []);

  /* ── Commands registry ── */
  const commands = [
    { id: 'hero',         label: 'Go to Home',                 group: 'Navigation',  shortcut: 'G H', icon: 'home',     action: () => scrollToSection('hero') },
    { id: 'work',         label: 'Go to Projects',             group: 'Navigation',  shortcut: 'G P', icon: 'projects',  action: () => scrollToSection('work') },
    { id: 'journey',      label: 'Go to Journey / Experience', group: 'Navigation',  shortcut: 'G J', icon: 'journey',   action: () => scrollToSection('journey') },
    { id: 'capabilities', label: 'Go to Skills / Capabilities',group: 'Navigation',  shortcut: 'G S', icon: 'skills',    action: () => scrollToSection('capabilities') },
    { id: 'console',      label: 'Go to CLI Console',          group: 'Navigation',  shortcut: 'G C', icon: 'console',   action: () => scrollToSection('console') },
    { id: 'about',        label: 'Go to About',                group: 'Navigation',  shortcut: 'G A', icon: 'about',     action: () => scrollToSection('about') },
    { id: 'writing',      label: 'Go to Writing',              group: 'Navigation',  shortcut: 'G W', icon: 'writing',   action: () => scrollToSection('writing') },
    { id: 'contact',      label: 'Go to Contact',              group: 'Navigation',  shortcut: 'G M', icon: 'contact',   action: () => scrollToSection('contact') },
    { id: 'theme',        label: 'Toggle Light / Dark Theme',  group: 'Preferences', shortcut: 'T T', icon: 'theme',     action: toggleTheme },
    { id: 'confetti',     label: 'Celebrate (Confetti Burst)',  group: 'Fun',         shortcut: 'C F', icon: 'confetti',  action: triggerConfetti },
  ];

  /* ── Filtering ── */
  const filtered = commands.filter((cmd) => {
    const q = search.toLowerCase().replace(/\s+/g, '');
    return [cmd.label, cmd.group, cmd.shortcut]
      .some((s) => s.toLowerCase().replace(/\s+/g, '').includes(q));
  });

  /* ── Keyboard navigation ── */
  const handleKeyNav = (e) => {
    if (!filtered.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => (i + 1) % filtered.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length); }
    else if (e.key === 'Enter') { e.preventDefault(); filtered[activeIndex]?.action(); }
  };

  /* ── Group commands ── */
  const grouped = filtered.reduce((acc, cmd) => {
    (acc[cmd.group] ??= []).push(cmd);
    return acc;
  }, {});

  /* ── Render ── */
  let globalIdx = -1;

  return (
    <div className={`cp-overlay ${isOpen ? 'cp-open' : ''}`} onClick={() => setIsOpen(false)}>
      <div className="cp-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Search bar ── */}
        <div className="cp-search-bar">
          <span className="cp-search-icon">{icons.search}</span>
          <input
            ref={inputRef}
            type="text"
            className="cp-input"
            placeholder="Type a command or search…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActiveIndex(0); }}
            onKeyDown={handleKeyNav}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <kbd className="cp-esc-badge">ESC</kbd>
        </div>

        {/* ── Results ── */}
        <div className="cp-results" ref={resultsRef}>
          {filtered.length > 0 ? (
            Object.entries(grouped).map(([group, cmds]) => (
              <div key={group} className="cp-group">
                <div className="cp-group-header">
                  <span>{group}</span>
                  <span className="cp-group-count">{cmds.length}</span>
                </div>
                {cmds.map((cmd) => {
                  globalIdx++;
                  const idx = globalIdx;
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={cmd.id}
                      ref={(el) => (itemRefs.current[idx] = el)}
                      className={`cp-item ${isActive ? 'cp-active' : ''}`}
                      onClick={cmd.action}
                      onMouseEnter={() => setActiveIndex(idx)}
                      style={{ animationDelay: `${idx * 25}ms` }}
                    >
                      <div className="cp-item-left">
                        <span className={`cp-item-icon ${isActive ? 'cp-icon-lit' : ''}`}>
                          {icons[cmd.icon]}
                        </span>
                        <span className="cp-item-label">{cmd.label}</span>
                      </div>
                      <div className="cp-item-right">
                        {cmd.shortcut.split(' ').map((k, i) => (
                          <kbd key={i} className="cp-kbd">{k}</kbd>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="cp-empty">
              <span className="cp-empty-icon">{icons.search}</span>
              <p>No results for "<strong>{search}</strong>"</p>
              <span className="cp-empty-hint">Try "home", "theme", or "projects"</span>
            </div>
          )}
        </div>

        {/* ── Footer hints ── */}
        <div className="cp-footer">
          <div className="cp-footer-group">
            <kbd className="cp-footer-kbd">↑</kbd>
            <kbd className="cp-footer-kbd">↓</kbd>
            <span>Navigate</span>
          </div>
          <div className="cp-footer-group">
            <kbd className="cp-footer-kbd">↵</kbd>
            <span>Select</span>
          </div>
          <div className="cp-footer-group">
            <kbd className="cp-footer-kbd">Esc</kbd>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
