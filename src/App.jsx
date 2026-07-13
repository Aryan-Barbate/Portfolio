import { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import Grain from './components/Grain';
import Nav from './components/Nav';
import CommandPalette from './components/CommandPalette';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';

// Lazy load below-the-fold components to minimize initial JS bundle size
const Marquee = lazy(() => import('./components/Marquee'));
const Work = lazy(() => import('./components/Work'));
const Journey = lazy(() => import('./components/Journey'));
const Capabilities = lazy(() => import('./components/Capabilities'));
const GithubConsole = lazy(() => import('./components/GithubConsole'));
const About = lazy(() => import('./components/About'));
const Writing = lazy(() => import('./components/Writing'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Block right-click context menu
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    // Block common developer tool shortcuts
    const handleKeyDown = (e) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      // Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
      }
      // Ctrl+S (Save page)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', () => ScrollTrigger.update());

    // Provide the lenis instance globally for components like ScrollStack that might want to listen to it
    window.lenis = lenis;

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(tick);
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader onLoaded={() => setLoaded(true)} />}
      </AnimatePresence>
      <CustomCursor />
      <Grain />
      <CommandPalette />
      <Nav />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Marquee />
          <Work />
          <Journey />
          <Capabilities />
          <GithubConsole />
          <About />
          <Writing />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
