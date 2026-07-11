import { useRef } from 'react';
import { motion } from 'framer-motion';
import TextPressure from './TextPressure';
import VariableProximity from './VariableProximity';
import PixelBlast from './PixelBlast';

export default function Hero() {
  const textRef = useRef(null);
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto' }}>
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#e85d04"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples={true}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={true}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent={true}
        />
      </div>
      
      <div className="hero-orb" aria-hidden="true" style={{ zIndex: 1 }} />

      <div className="container hero-inner" style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
        <div className="hero-top-row" style={{ pointerEvents: 'auto' }}>
          <div className="hero-status">
            <span className="hero-status-dot" />
            Available for work
          </div>
          <div className="hero-meta">
            <p>Frontend developer · India</p>
            <p>React · JavaScript · APIs</p>
            <p>Chess player · Builder</p>
          </div>
        </div>

        <div className="hero-title-wrap" style={{ pointerEvents: 'auto' }}>
          <div style={{ position: 'relative', height: 'clamp(150px, 20vw, 300px)' }}>
            <TextPressure
              text="ARYAN BARBATE"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="currentColor"
              strokeColor="#ff0000"
              minFontSize={36}
            />
          </div>
        </div>

        <div
          ref={textRef}
          className="body-text hero-sub"
          style={{ position: 'relative', pointerEvents: 'auto' }}
        >
          <VariableProximity
            label={'I build interfaces with intention — live API tools, creative experiments, and polished front-end craft. Small in quantity, high in craft.'}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 900, 'opsz' 40"
            containerRef={textRef}
            radius={150}
            falloff='linear'
          />
        </div>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          style={{ pointerEvents: 'auto' }}
        >
          <button className="btn btn-primary" onClick={() => scrollTo('work')}>
            View selected work
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo('about')}>
            Read the story
          </button>
          <a href="/resume.pdf" download className="btn btn-outline">
            Download CV
          </a>
        </motion.div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
