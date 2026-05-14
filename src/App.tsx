import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Trust from './components/Trust';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LEDDisplay from './components/ui/LEDDisplay';
import { krankenfahrtenContent, taxiContent } from './data/content';
import type { Mode } from './types';
import './index.css';

const TAXI_LED_TEXT =
  'TAXI BRETTEN  07252 94940     TAXI OBERDERDINGEN  07045 201035     TAXI VAIHINGEN  07042 1020010     24H NON STOP     FLUGHAFEN TRANSFER     KURIERFAHRTEN     ';

export default function App() {
  const [mode, setMode] = useState<Mode>('krankenfahrten');
  const content = mode === 'krankenfahrten' ? krankenfahrtenContent : taxiContent;
  const isTaxi = mode === 'taxi';

  return (
    <div style={{ backgroundColor: content.colors.bg, minHeight: '100vh' }}>
      <Navbar mode={mode} content={content} onModeChange={setMode} />

      <AnimatePresence mode="wait">
        <motion.main
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Hero mode={mode} content={content} />

          {/* LED ticker strip — Taxi only */}
          {isTaxi && (
            <div
              className="w-full overflow-hidden py-3"
              style={{
                backgroundColor: '#050400',
                borderTop: '1px solid rgba(233,199,4,0.12)',
                borderBottom: '1px solid rgba(233,199,4,0.12)',
              }}
            >
              <LEDDisplay
                text={TAXI_LED_TEXT}
                dotColor="#e9c704"
                dotSize={9}
                speed={65}
                direction="left"
                visibleWidth={160}
                fade={true}
                pauseOnHover={true}
              />
            </div>
          )}

          <Services mode={mode} content={content} />
          <WhyUs mode={mode} content={content} />
          <Trust mode={mode} content={content} />
          <Contact mode={mode} content={content} />
        </motion.main>
      </AnimatePresence>

      <Footer mode={mode} content={content} />
    </div>
  );
}
