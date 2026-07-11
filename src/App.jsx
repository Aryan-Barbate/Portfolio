import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import Grain from './components/Grain';
import Nav from './components/Nav';
import CommandPalette from './components/CommandPalette';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import Journey from './components/Journey';
import Capabilities from './components/Capabilities';
import GithubConsole from './components/GithubConsole';
import About from './components/About';
import Writing from './components/Writing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
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
      <CustomCursor />
      <Grain />
      <CommandPalette />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Journey />
        <Capabilities />
        <GithubConsole />
        <About />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
