import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';
import './index.css';
import Loader from './components/Loader';
import App from './App.jsx';
import { ErrorBoundary } from './ErrorBoundary.jsx';

function Root() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <App />
      <AnimatePresence>
        {!loaded && <Loader onLoaded={() => setLoaded(true)} />}
      </AnimatePresence>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Root />
    </ErrorBoundary>
  </StrictMode>
);
