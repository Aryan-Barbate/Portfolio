import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';
import './index.css';
import Loader from './components/Loader';
import App from './App.jsx';

function Root() {
  const [loaded, setLoaded] = useState(false);

  return (
    <AnimatePresence>
      {!loaded && <Loader onLoaded={() => setLoaded(true)} />}
      {loaded && <App />}
    </AnimatePresence>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
