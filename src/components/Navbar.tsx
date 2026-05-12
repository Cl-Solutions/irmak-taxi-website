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

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass-dark"
      animate={{
        backgroundColor: scrolled ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.35)',
        boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18 gap-4">

          {/* Logo */}
          <motion.button
            className="flex items-center gap-3 shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
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
            <span className="font-grotesk font-bold text-white text-sm hidden sm:block leading-tight">
              Irmak Transport
            </span>
          </motion.button>

          {/* ── PROMINENT MODE TOGGLE — always visible center ── */}
          <div
            className="flex items-stretch rounded-xl overflow-hidden border shrink-0"
            style={{ borderColor: 'rgba(255,255,255,0.12)' }}
          >
            {/* Krankenfahrten pill */}
            <motion.button
              onClick={() => onModeChange('krankenfahrten')}
              className="relative flex items-center gap-2 px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold font-grotesk transition-colors duration-200 outline-none"
              style={{
                backgroundColor: isKranken ? '#009418' : 'rgba(0,0,0,0.4)',
                color: isKranken ? '#fff' : 'rgba(255,255,255,0.45)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Heart size={13} strokeWidth={2.5} />
              <span className="hidden xs:inline">Krankenfahrten</span>
              <span className="xs:hidden">Kranken</span>
              {isKranken && (
                <motion.span
                  layoutId="active-dot"
                  className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white opacity-60"
                />
              )}
            </motion.button>

            {/* Divider */}
            <div className="w-px" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />

            {/* Taxi pill */}
            <motion.button
              onClick={() => onModeChange('taxi')}
              className="relative flex items-center gap-2 px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold font-grotesk transition-colors duration-200 outline-none"
              style={{
                backgroundColor: !isKranken ? '#e9c704' : 'rgba(0,0,0,0.4)',
                color: !isKranken ? '#000' : 'rgba(255,255,255,0.45)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Car size={13} strokeWidth={2.5} />
              Taxi
              {!isKranken && (
                <motion.span
                  layoutId="active-dot"
                  className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-black opacity-40"
                />
              )}
            </motion.button>
          </div>

          {/* Right: Nav links + CTA */}
          <div className="hidden lg:flex items-center gap-6">
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold font-grotesk"
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

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white/70 shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="px-4 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium py-2 text-white/70"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold"
                style={{ backgroundColor: content.colors.accent, color: isKranken ? '#fff' : '#000' }}
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
