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

export default function App() {
  return (
    <>
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
