import { useState, useEffect, useRef } from 'react';
import { GitPullRequest, GitCommit, Star, Folder, Terminal, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import useScrollReveal from '../hooks/useScrollReveal';

// Matrix Rain Canvas component
function MatrixRain({ active, color = 'rgba(232, 93, 4, 0.8)' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=<>{}[]%#@&';
    const charArr = chars.split('');
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(18, 18, 16, 0.08)'; // match terminal body background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, color]);

  if (!active) return null;

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        background: '#121210',
        zIndex: 5,
        borderRadius: '0 0 var(--radius-md) var(--radius-md)',
        opacity: 0.95,
        pointerEvents: 'none'
      }}
    />
  );
}

export default function GithubConsole() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('activity'); // activity, shell
  const [matrixActive, setMatrixActive] = useState(false);
  const [matrixColor, setMatrixColor] = useState('rgba(232, 93, 4, 0.8)');
  const pageLoadTimeRef = useRef(Date.now());
  const sectionRef = useScrollReveal();

  // Interactive Shell States
  const [history, setHistory] = useState([
    { text: 'Barbate CLI [Version 1.0.5]', type: 'system' },
    { text: 'Type "help" to view a list of available commands.', type: 'system' },
    { text: '', type: 'output' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const shellScrollRef = useRef(null);

  // Auto scroll to bottom of shell when history changes
  useEffect(() => {
    if (shellScrollRef.current) {
      shellScrollRef.current.scrollTop = shellScrollRef.current.scrollHeight;
    }
  }, [history, activeTab]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const fallbackEvents = [
    {
      id: 'fb-1',
      repo: 'Linea-Flora',
      type: 'Push',
      detail: 'pushed: "rebrand to Linea Flora & custom favicon setup"',
      date: 'Jun 20, 11:32 AM',
      icon: <GitCommit size={14} />,
    },
    {
      id: 'fb-2',
      repo: 'Linea-Flora',
      type: 'Push',
      detail: 'pushed: "resolved selection bounding box canvas alignment bug"',
      date: 'Jun 19, 04:15 PM',
      icon: <GitCommit size={14} />,
    },
    {
      id: 'fb-3',
      repo: 'Portfolio',
      type: 'Push',
      detail: 'pushed: "optimized project screenshots loading & dynamic formspree url check"',
      date: 'Jun 18, 10:44 AM',
      icon: <GitCommit size={14} />,
    },
    {
      id: 'fb-4',
      repo: 'AniScope',
      type: 'Push',
      detail: 'pushed: "added debounced search state hook to rate-limit API queries"',
      date: 'Jun 15, 02:30 PM',
      icon: <GitCommit size={14} />,
    },
  ];

  const fallbackStats = {
    repos: 4,
    followers: 8,
    following: 12,
    bio: 'Frontend developer building intentional interfaces and creative web experiments.',
    gists: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await fetch('https://api.github.com/users/Aryan-Barbate/events');
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          const filteredEvents = eventsData
            .filter(e => ['PushEvent', 'PullRequestEvent', 'CreateEvent', 'WatchEvent'].includes(e.type))
            .slice(0, 5)
            .map(e => {
              let detail = '';
              let icon = <GitCommit size={14} />;
              if (e.type === 'PushEvent') {
                const commitMsg = e.payload.commits?.[0]?.message || 'Pushed updates';
                detail = `pushed: "${commitMsg}"`;
                icon = <GitCommit size={14} />;
              } else if (e.type === 'PullRequestEvent') {
                detail = `${e.payload.action} PR: "${e.payload.pull_request?.title}"`;
                icon = <GitPullRequest size={14} />;
              } else if (e.type === 'CreateEvent') {
                detail = `created ${e.payload.ref_type || 'repository'}: "${e.repo.name.split('/')[1]}"`;
                icon = <Folder size={14} />;
              } else if (e.type === 'WatchEvent') {
                detail = `starred: "${e.repo.name.split('/')[1]}"`;
                icon = <Star size={14} />;
              }

              return {
                id: e.id,
                repo: e.repo.name.split('/')[1],
                type: e.type.replace('Event', ''),
                detail,
                date: new Date(e.created_at).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                icon,
              };
            });
          setEvents(filteredEvents.length > 0 ? filteredEvents : fallbackEvents);
        } else {
          setEvents(fallbackEvents);
        }

        const userRes = await fetch('https://api.github.com/users/Aryan-Barbate');
        if (userRes.ok) {
          const userData = await userRes.json();
          setStats({
            repos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            bio: userData.bio || fallbackStats.bio,
            gists: userData.public_gists,
          });
        } else {
          setStats(fallbackStats);
        }
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setEvents(fallbackEvents);
        setStats(fallbackStats);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandHistory.length) {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const onSubmitCommand = (e) => {
    e.preventDefault();
    const cmdStr = inputVal;
    setInputVal('');
    setHistoryIndex(-1);

    if (!cmdStr.trim()) return;

    // Save to command history
    setCommandHistory(prev => [...prev, cmdStr]);

    const trimmed = cmdStr.trim();
    const newHistory = [...history, { text: `aryan@barbate:~$ ${trimmed}`, type: 'input' }];
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();

    let output = [];

    switch (cmd) {
      case 'help':
        output = [
          { text: 'Available commands:', type: 'system' },
          { text: '  about            - Display developer profile and biography', type: 'output' },
          { text: '  skills [query]   - View tech stack details (e.g. skills react, skills js)', type: 'output' },
          { text: '  projects [query] - Inspect projects registry (e.g. projects 1, projects linea)', type: 'output' },
          { text: '  gui [section]    - Scroll browser to section (e.g. gui projects, gui contact)', type: 'output' },
          { text: '  neofetch         - Render custom ASCII logo and system info', type: 'output' },
          { text: '  contact          - Print social profiles and email details', type: 'output' },
          { text: '  clear            - Clear the terminal console screen', type: 'output' }
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'about':
        output = [
          { text: 'Name: Aryan Barbate', type: 'system' },
          { text: 'Role: Frontend Developer & Creative Builder', type: 'output' },
          { text: 'Bio: Dedicated to building polished digital experiences, solving complex responsive interactions, and crafting intentional user journeys.', type: 'output' }
        ];
        break;
      case 'skills': {
        const query = parts[1] ? parts[1].toLowerCase() : '';
        if (query) {
          // Dynamically query projects array to check stack tags
          const matchingProjects = projects.filter(p => 
            p.stack.some(s => {
              const sLower = s.toLowerCase();
              return sLower === query || 
                     (query === 'js' && sLower === 'javascript') ||
                     (query === 'html' && sLower === 'html5') ||
                     (query === 'css' && sLower === 'css3');
            })
          );

          if (matchingProjects.length > 0) {
            let skillName = parts[1];
            if (query === 'js' || query === 'javascript') skillName = 'JavaScript';
            else if (query === 'react') skillName = 'React';
            else if (query === 'css') skillName = 'CSS3';
            else if (query === 'html') skillName = 'HTML5';
            else if (query === 'tailwind') skillName = 'Tailwind CSS';

            output = [
              { text: `${skillName} Stack Details:`, type: 'system' },
              { text: `• Experience: Active utilization in production and sandbox application architectures.`, type: 'output' },
              { text: `• Associated Projects: ${matchingProjects.map(p => p.name).join(', ')}`, type: 'output' }
            ];
          } else {
            output = [
              { text: `No projects found matching skill tag: "${parts[1]}"`, type: 'error' },
              { text: 'Try: skills react, skills js, skills css', type: 'system' }
            ];
          }
        } else {
          output = [
            { text: '--- TECHNICAL STACK ---', type: 'system' },
            { text: '• Core: HTML5, CSS3, JavaScript [ES6+]   [██████████] 95%', type: 'output' },
            { text: '• Frameworks: React, Vite, Tailwind CSS   [████████░░] 85%', type: 'output' },
            { text: '• Graphics/Motion: Framer, Canvas API     [████████░░] 80%', type: 'output' },
            { text: '• Tools: Git, GitHub, Figma, Node         [████████░░] 80%', type: 'output' },
            { text: 'Tip: Type "skills [name]" for detail (e.g. skills react, skills js, skills css)', type: 'system' }
          ];
        }
        break;
      }
      case 'projects': {
        const query = parts[1] ? parts[1].toLowerCase() : '';
        if (query) {
          const idx = parseInt(query) - 1;
          const found = projects.find((p, i) => i === idx || p.id.includes(query) || p.name.toLowerCase().includes(query));
          if (found) {
            output = [
              { text: `Project: ${found.name} (${found.tag})`, type: 'system' },
              { text: `• Tech Stack: ${found.stack.join(', ')}`, type: 'output' },
              { text: `• Purpose: ${found.purpose}`, type: 'output' },
              { text: `• GitHub: ${found.github}`, type: 'link' }
            ];
          } else {
            output = [
              { text: `Project "${parts[1]}" not found in registry.`, type: 'error' },
              { text: 'Try: projects 1, projects aniscope, or just: projects', type: 'system' }
            ];
          }
        } else {
          output = [
            { text: '--- PROJECTS REGISTRY ---', type: 'system' },
            ...projects.map((p, i) => ({ text: `  ${i + 1}. ${p.name.padEnd(20)} - ${p.tag}`, type: 'output' })),
            { text: 'Tip: Type "projects [number/name]" (e.g. projects 1, projects aniscope)', type: 'system' }
          ];
        }
        break;
      }
      case 'gui': {
        const sec = parts[1] ? parts[1].toLowerCase() : '';
        const validSections = ['hero', 'work', 'journey', 'capabilities', 'console', 'about', 'writing', 'contact'];
        if (sec === 'home') {
          const el = document.getElementById('hero');
          el?.scrollIntoView({ behavior: 'smooth' });
          output = [{ text: 'Scrolling to home...', type: 'system' }];
        } else if (sec === 'projects') {
          const el = document.getElementById('work');
          el?.scrollIntoView({ behavior: 'smooth' });
          output = [{ text: 'Scrolling to projects...', type: 'system' }];
        } else if (validSections.includes(sec)) {
          const el = document.getElementById(sec);
          el?.scrollIntoView({ behavior: 'smooth' });
          output = [{ text: `Scrolling to ${sec}...`, type: 'system' }];
        } else {
          output = [
            { text: 'Usage: gui [section_name]', type: 'system' },
            { text: 'Valid sections: home, projects, journey, capabilities, about, writing, contact', type: 'output' }
          ];
        }
        break;
      }
      case 'neofetch': {
        const uptimeSecs = Math.floor((Date.now() - pageLoadTimeRef.current) / 1000);
        const uptimeStr = uptimeSecs < 60 ? `${uptimeSecs}s` : `${Math.floor(uptimeSecs/60)}m ${uptimeSecs%60}s`;
        const theme = localStorage.getItem('theme') || 'light';
        output = [
          { text: '      /\\       aryan@barbate-portfolio', type: 'system' },
          { text: '     /  \\      -----------------------', type: 'output' },
          { text: '    / /\\ \\     OS: React Virtual OS v1.0.5', type: 'output' },
          { text: `   /_/  \\_\\    Host: ${window.location.hostname || 'localhost'}`, type: 'output' },
          { text: `               Uptime: ${uptimeStr}`, type: 'output' },
          { text: `               Resolution: ${window.innerWidth}x${window.innerHeight}`, type: 'output' },
          { text: '               Shell: custom-bash-sh v1.0.5', type: 'output' },
          { text: `               Theme: ${theme.toUpperCase()}`, type: 'output' },
          { text: '               CPU: Virtual Creative Core (8) @ 4.2GHz', type: 'output' },
          { text: '               RAM: Infinite Creative Potential', type: 'output' }
        ];
        break;
      }
      case 'contact':
        output = [
          { text: '--- CONTACT CHANNELS ---', type: 'system' },
          { text: '• Email: mailto:aryanbarbate3@gmail.com', type: 'link' },
          { text: '• GitHub: https://github.com/Aryan-Barbate', type: 'link' },
          { text: '• LinkedIn: https://www.linkedin.com/in/aryan-barbate-b653b9393', type: 'link' }
        ];
        break;
      default:
        output = [
          { text: `Command not found: "${cmd}". Type "help" for a list of valid commands.`, type: 'error' }
        ];
    }

    setHistory([...newHistory, ...output]);
  };

  const activeStats = stats || fallbackStats;
  const activeEvents = events.length > 0 ? events : fallbackEvents;

  return (
    <section id="console" className="section-pad console-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-row">
          <div>
            <p className="eyebrow">Command Center</p>
            <h2 className="display-section reveal reveal-delay-1" style={{ marginTop: '1rem' }}>
              Live code stream.
            </h2>
          </div>
          <span className="section-index reveal reveal-delay-2">04</span>
        </div>

        <div className="console-grid reveal reveal-delay-2">
          {/* Terminal Console Panel */}
          <div className="terminal-panel" style={{ position: 'relative' }}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              
              <div className="terminal-tabs" style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', padding: '2px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <button 
                  onClick={() => setActiveTab('activity')}
                  className={`terminal-tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: 'none',
                    background: activeTab === 'activity' ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: activeTab === 'activity' ? '#f4f0e8' : 'rgba(244,240,232,0.4)',
                    fontSize: '0.62rem',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Activity
                </button>
                <button 
                  onClick={() => setActiveTab('shell')}
                  className={`terminal-tab-btn ${activeTab === 'shell' ? 'active' : ''}`}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: 'none',
                    background: activeTab === 'shell' ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: activeTab === 'shell' ? '#f4f0e8' : 'rgba(244,240,232,0.4)',
                    fontSize: '0.62rem',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Interactive Shell
                </button>
              </div>

              <Terminal size={14} className="terminal-icon" />
            </div>

            <div className="terminal-body" style={{ minHeight: '340px', position: 'relative' }}>
              <MatrixRain active={matrixActive} color={matrixColor} />
              
              {activeTab === 'activity' ? (
                loading ? (
                  <div className="terminal-loading">
                    <Loader2 size={24} className="animate-spin" />
                    <span>Streaming commit feeds...</span>
                  </div>
                ) : (
                  <div className="terminal-stream">
                    <div className="terminal-line system">
                      <span className="prompt">$</span> git log --oneline --graph --all -n 5
                    </div>
                    {activeEvents.map((event, index) => (
                      <div key={event.id} className="terminal-log-item" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="log-meta">
                          <span className="log-icon">{event.icon}</span>
                          <span className="log-repo">{event.repo}</span>
                          <span className="log-date">{event.date}</span>
                        </div>
                        <div className="log-detail">{event.detail}</div>
                      </div>
                    ))}
                    <div className="terminal-line cursor-line">
                      <span className="prompt">aryan@barbate:~$</span> <span className="blinking-cursor" />
                    </div>
                  </div>
                )
              ) : (
                <div 
                  className="terminal-shell" 
                  onClick={focusInput} 
                  style={{ 
                    cursor: 'text', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    flex: 1, 
                    justifyContent: 'space-between' 
                  }}
                >
                  <div 
                    className="terminal-scroll-area" 
                    ref={shellScrollRef} 
                    style={{ 
                      flexGrow: 1, 
                      overflowY: 'auto', 
                      maxHeight: '260px', 
                      paddingBottom: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    {history.map((line, idx) => {
                      if (line.type === 'link') {
                        const splitText = line.text.split(' ');
                        const linkLabel = splitText[0] + ' ' + splitText[1] + ' ';
                        const linkUrl = splitText[2];
                        return (
                          <div key={idx} className="terminal-line output">
                            <span>{linkLabel}</span>
                            <a 
                              href={linkUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: 'var(--accent)', textDecoration: 'underline' }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {linkUrl}
                            </a>
                          </div>
                        );
                      }
                      return (
                        <div key={idx} className={`terminal-line ${line.type}`}>
                          <span>{line.text}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <form 
                    onSubmit={onSubmitCommand} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      background: 'transparent', 
                      border: 'none', 
                      margin: 0, 
                      paddingTop: '6px',
                      borderTop: '1px solid rgba(244, 240, 232, 0.05)'
                    }}
                  >
                    <span className="prompt" style={{ marginRight: '8px', color: 'var(--accent)', fontWeight: 'bold' }}>aryan@barbate:~$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputVal}
                      onChange={e => setInputVal(e.target.value)}
                      onKeyDown={handleKeyDown}
                      style={{
                        flexGrow: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#f4f0e8',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        caretColor: 'var(--accent)',
                        padding: 0,
                        margin: 0
                      }}
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics Display */}
          <div className="metrics-panel">
            <div className="metrics-intro">
              <h3 className="metrics-heading">System Profile</h3>
              <p className="body-sm text-muted" style={{ lineHeight: 1.6 }}>
                {activeStats.bio}
              </p>
            </div>

            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-value">{activeStats.repos}</div>
                <div className="metric-label">Repositories</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{activeStats.followers}</div>
                <div className="metric-label">Followers</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{activeStats.gists}</div>
                <div className="metric-label">Active Gists</div>
              </div>
              <div className="metric-card highlight">
                <div className="metric-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  A+ <Sparkles size={16} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="metric-label">Delivery Health</div>
              </div>
            </div>

            <div className="metrics-footer">
              <a
                href="https://github.com/Aryan-Barbate"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                Follow on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
