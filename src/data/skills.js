export const skills = [
  // Programming Languages
  { id: 'c', label: 'C', group: 'Programming Languages' },
  { id: 'cpp', label: 'C++', group: 'Programming Languages' },
  { id: 'python', label: 'Python', group: 'Programming Languages' },
  { id: 'java', label: 'Java', group: 'Programming Languages' },
  { id: 'javascript', label: 'JavaScript', group: 'Programming Languages' },

  // Frontend Development
  { id: 'html5', label: 'HTML5', group: 'Frontend Development' },
  { id: 'css3', label: 'CSS3', group: 'Frontend Development' },
  { id: 'react', label: 'React.js', group: 'Frontend Development', tag: 'Learned' },

  // Backend Development
  { id: 'nodejs', label: 'Node.js', group: 'Backend Development', tag: 'Learning' },
  { id: 'express', label: 'Express.js', group: 'Backend Development', tag: 'Learning' },

  // Databases
  { id: 'mysql', label: 'MySQL', group: 'Databases', tag: 'Learned' },
  { id: 'mongodb', label: 'MongoDB', group: 'Databases', tag: 'Learning' },

  // Deployment & Hosting
  { id: 'vercel', label: 'Vercel', group: 'Deployment & Hosting' },
  { id: 'netlify', label: 'Netlify', group: 'Deployment & Hosting' },

  // Development Tools
  { id: 'git', label: 'Git', group: 'Development Tools' },
  { id: 'github', label: 'GitHub', group: 'Development Tools' },
  { id: 'vscode', label: 'Visual Studio Code', group: 'Development Tools' },
  { id: 'linux', label: 'Linux', group: 'Development Tools' },

  // Design & Productivity
  { id: 'figma', label: 'Figma', group: 'Design & Productivity' },
  { id: 'notion', label: 'Notion', group: 'Design & Productivity' },

  // AI Development & Vibe Coding Tools
  { id: 'cursor', label: 'Cursor', group: 'AI & Vibe Coding' },
  { id: 'claude', label: 'Claude', group: 'AI & Vibe Coding' },
  { id: 'stitch', label: 'Stitch', group: 'AI & Vibe Coding' },
  { id: 'antigravity', label: 'Antigravity', group: 'AI & Vibe Coding' },

  // Other Skills
  { id: 'pandas', label: 'Pandas', group: 'Other', tag: 'Learned' },
  { id: 'arduino', label: 'Arduino', group: 'Other' }
];

export const skillGroups = {
  'Programming Languages': { description: 'Core logic & scripting' },
  'Frontend Development': { description: 'UI & web structures' },
  'Backend Development': { description: 'Servers & APIs' },
  'Databases': { description: 'Data storage' },
  'Deployment & Hosting': { description: 'Platform delivery' },
  'Development Tools': { description: 'Workflows & environments' },
  'Design & Productivity': { description: 'Planning & visuals' },
  'AI & Vibe Coding': { description: 'AI-assisted workflows' },
  'Other': { description: 'Hardware & data' }
};
