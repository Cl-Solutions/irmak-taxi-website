import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { krankenfahrtenContent, taxiContent } from './data/content';
import type { Mode } from './types';
import './index.css';

export default function App() {
  const [mode, setMode] = useState<Mode>('krankenfahrten');

  const content = mode === 'krankenfahrten' ? krankenfahrtenContent : taxiContent;

  return (
    <div style={{ backgroundColor: content.colors.bg, minHeight: '100vh' }}>
      <Navbar mode={mode} content={content} onModeChange={setMode} />

      <AnimatePresence mode="wait">
        <motion.main
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Hero mode={mode} content={content} />
          <Services mode={mode} content={content} />
          <WhyUs mode={mode} content={content} />
          <Contact mode={mode} content={content} />
        </motion.main>
      </AnimatePresence>

      <Footer mode={mode} content={content} />
    </div>
  );
}
