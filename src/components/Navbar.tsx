import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Heart, Car } from 'lucide-react';
import type { Mode, ModeContent } from '../types';

interface NavbarProps {
  mode: Mode;
  content: ModeContent;
  onModeChange: (mode: Mode) => void;
}

const navLinks = [
  { href: '#services', label: 'Leistungen' },
  { href: '#why-us', label: 'Warum wir' },
  { href: '#contact', label: 'Kontakt' },
];

export default function Navbar({ mode, content, onModeChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isKranken = mode === 'krankenfahrten';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass-dark"
      animate={{
        backgroundColor: scrolled ? 'rgba(0,0,0,0.80)' : 'rgba(0,0,0,0.35)',
        boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* h-16 on all screens — consistent 64px */}
        <div className="flex items-center justify-between h-16 gap-3">

          {/* Logo */}
          <motion.button
            className="flex items-center gap-2.5 shrink-0 min-h-[44px]"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileTap={{ scale: 0.97 }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: content.colors.accent }}
            >
              <AnimatePresence mode="wait">
                {isKranken ? (
                  <motion.div key="k" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                    <Heart size={16} color="#fff" strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div key="t" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                    <Car size={16} color="#000" strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Hide text on small mobile to save space for toggle */}
            <span className="font-grotesk font-bold text-white text-sm hidden sm:block leading-tight">
              Irmak Transport
            </span>
          </motion.button>

          {/* ── MODE TOGGLE — center, always visible ── */}
          {/* On 375px: icon + short text fits within available space */}
          <div
            className="flex items-stretch rounded-xl overflow-hidden border flex-1 sm:flex-none max-w-[220px] sm:max-w-none"
            style={{ borderColor: 'rgba(255,255,255,0.12)' }}
          >
            {/* Krankenfahrten pill */}
            <motion.button
              onClick={() => onModeChange('krankenfahrten')}
              className="relative flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 text-xs font-semibold font-grotesk transition-colors duration-200 outline-none flex-1 sm:flex-none min-h-[44px]"
              style={{
                backgroundColor: isKranken ? '#009418' : 'rgba(0,0,0,0.4)',
                color: isKranken ? '#fff' : 'rgba(255,255,255,0.45)',
              }}
              whileTap={{ scale: 0.96 }}
            >
              <Heart size={12} strokeWidth={2.5} className="shrink-0" />
              {/* "Kranken" on mobile, full word on sm+ */}
              <span className="sm:hidden">Kranken</span>
              <span className="hidden sm:inline">Krankenfahrten</span>
            </motion.button>

            {/* Divider */}
            <div className="w-px shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />

            {/* Taxi pill */}
            <motion.button
              onClick={() => onModeChange('taxi')}
              className="relative flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 text-xs font-semibold font-grotesk transition-colors duration-200 outline-none flex-1 sm:flex-none min-h-[44px]"
              style={{
                backgroundColor: !isKranken ? '#e9c704' : 'rgba(0,0,0,0.4)',
                color: !isKranken ? '#000' : 'rgba(255,255,255,0.45)',
              }}
              whileTap={{ scale: 0.96 }}
            >
              <Car size={12} strokeWidth={2.5} className="shrink-0" />
              Taxi
            </motion.button>
          </div>

          {/* Desktop: Nav links + CTA */}
          <div className="hidden lg:flex items-center gap-6 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = content.colors.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                {link.label}
              </a>
            ))}
            <motion.a
              href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold font-grotesk min-h-[44px]"
              style={{
                backgroundColor: content.colors.accent,
                color: isKranken ? '#fff' : '#000',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={13} />
              Anrufen
            </motion.a>
          </div>

          {/* Mobile hamburger — 44px tap target */}
          <button
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl shrink-0 text-white/70"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden border-t"
            style={{ backgroundColor: 'rgba(0,0,0,0.95)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center min-h-[48px] px-2 text-sm font-medium text-white/70 rounded-xl"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
                className="flex items-center justify-center gap-2 mt-2 min-h-[52px] rounded-xl text-sm font-bold font-grotesk"
                style={{ backgroundColor: content.colors.accent, color: isKranken ? '#fff' : '#000' }}
                onClick={() => setMenuOpen(false)}
              >
                <Phone size={15} />
                {content.contact.phones[0].number}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
