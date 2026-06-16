export const skills = [
  { id: 'html', label: 'HTML5', group: 'Foundation' },
  { id: 'css', label: 'CSS3', group: 'Foundation' },
  { id: 'responsive', label: 'Responsive Design', group: 'Foundation' },
  { id: 'js', label: 'JavaScript', group: 'Logic' },
  { id: 'react', label: 'React', group: 'Logic' },
  { id: 'state', label: 'State Management', group: 'Logic' },
  { id: 'api', label: 'REST APIs', group: 'Integration' },
  { id: 'async', label: 'Async / Await', group: 'Integration' },
  { id: 'fetch', label: 'Fetch / Axios', group: 'Integration' },
  { id: 'git', label: 'Git', group: 'Workflow' },
  { id: 'node', label: 'Node.js', group: 'Workflow' },
  { id: 'vite', label: 'Vite', group: 'Workflow' },
  { id: 'animation', label: 'CSS Animation', group: 'Craft' },
  { id: 'canvas', label: 'Canvas API', group: 'Craft' },
  { id: 'design', label: 'UI Design', group: 'Craft' },
  { id: 'mongodb', label: 'MongoDB', group: 'Growing' },
  { id: 'express', label: 'Express.js', group: 'Growing' },
];

export const skillGroups = {
  Foundation: { description: 'Structure, semantics, layout' },
  Logic: { description: 'Components, state, behavior' },
  Integration: { description: 'APIs, async, live data' },
  Workflow: { description: 'Tooling, version control, build' },
  Craft: { description: 'Motion, visuals, taste' },
  Growing: { description: 'Currently deepening' },
};
