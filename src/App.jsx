import './index.css';
import Grain from './components/Grain';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import Journey from './components/Journey';
import Capabilities from './components/Capabilities';
import About from './components/About';
import Writing from './components/Writing';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Grain />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Journey />
        <Capabilities />
        <About />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
