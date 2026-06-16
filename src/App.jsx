import './index.css';
import Grain from './components/Grain';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import Journey from './components/Journey';
import Capabilities from './components/Capabilities';
import About from './components/About';
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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
