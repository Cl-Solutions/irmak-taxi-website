import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Heart, Car } from 'lucide-react';
import type { Mode, ModeContent } from '../types';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavbarProps {
  mode: Mode;
  content: ModeContent;
  onModeChange: (mode: Mode) => void;
}

const navLinks = [
  { href: '#services', label: 'Leistungen', id: 'services' },
  { href: '#why-us', label: 'Warum wir', id: 'why-us' },
  { href: '#contact', label: 'Kontakt', id: 'contact' },
];

export default function Navbar({ mode, content, onModeChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isKranken = mode === 'krankenfahrten';
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Adaptive scrolled colors: white navbar for Krankenfahrten, dark for Taxi
  const navBg = scrolled
    ? (isKranken ? 'rgba(255,255,255,0.97)' : 'rgba(6,5,0,0.94)')
    : 'rgba(0,0,0,0.22)';
  const navBorder = scrolled
    ? (isKranken ? '0 1px 0 rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.06)' : '0 1px 0 rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.4)')
    : 'none';
  const navBlur = scrolled ? 'blur(24px) saturate(180%)' : 'blur(10px) saturate(130%)';
  const linkColor = (scrolled && isKranken) ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)';
  const linkHoverColor = (scrolled && isKranken) ? content.colors.text : '#ffffff';
  const logoTextColor = (scrolled && isKranken) ? content.colors.text : '#ffffff';

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: navBg,
        boxShadow: navBorder,
        backdropFilter: navBlur,
        WebkitBackdropFilter: navBlur,
      }}
      transition={{ duration: 0.28 }}
    >
      {/* Red brand stripe — only visible on Krankenfahrten not-scrolled */}
      <div
        className="h-[3px] transition-all duration-300"
        style={{ backgroundColor: isKranken ? '#b70009' : 'transparent', opacity: scrolled ? 0 : 1 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] gap-3">

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
            <span className="font-grotesk font-bold text-sm hidden sm:block leading-tight" style={{ color: logoTextColor }}>
              Irmak Transport
            </span>
          </motion.button>

          {/* Mode toggle */}
          <div
            className="flex items-stretch rounded-xl overflow-hidden border flex-1 sm:flex-none max-w-[220px] sm:max-w-none"
            style={{ borderColor: (scrolled && isKranken) ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.12)' }}
          >
            <motion.button
              onClick={() => onModeChange('krankenfahrten')}
              className="relative flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 text-xs font-semibold font-grotesk outline-none flex-1 sm:flex-none min-h-[44px]"
              style={{
                backgroundColor: isKranken ? '#009418' : ((scrolled && isKranken) ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.35)'),
                color: isKranken ? '#fff' : (scrolled && !isKranken ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.45)'),
              }}
              whileTap={{ scale: 0.96 }}
            >
              <Heart size={12} strokeWidth={2.5} className="shrink-0" />
              <span className="sm:hidden">Kranken</span>
              <span className="hidden sm:inline">Krankenfahrten</span>
            </motion.button>

            <div className="w-px shrink-0" style={{ backgroundColor: (scrolled && isKranken) ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.12)' }} />

            <motion.button
              onClick={() => onModeChange('taxi')}
              className="relative flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 text-xs font-semibold font-grotesk outline-none flex-1 sm:flex-none min-h-[44px]"
              style={{
                backgroundColor: !isKranken ? '#e9c704' : ((scrolled && isKranken) ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.35)'),
                color: !isKranken ? '#000' : (scrolled && isKranken ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.45)'),
              }}
              whileTap={{ scale: 0.96 }}
            >
              <Car size={12} strokeWidth={2.5} className="shrink-0" />
              Taxi
            </motion.button>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 shrink-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium py-1 transition-colors duration-200"
                  style={{ color: isActive ? content.colors.accent : linkColor }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = linkHoverColor; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? content.colors.accent : linkColor; }}
                >
                  {link.label}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                        style={{ backgroundColor: content.colors.accent }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </AnimatePresence>
                </a>
              );
            })}
            <motion.a
              href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold font-grotesk min-h-[44px]"
              style={{ backgroundColor: content.colors.accent, color: isKranken ? '#fff' : '#000' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={13} />
              Anrufen
            </motion.a>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
            style={{
              backgroundColor: (scrolled && isKranken) ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
              color: (scrolled && isKranken) ? content.colors.text : 'rgba(255,255,255,0.8)',
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden border-t"
            style={{
              backgroundColor: isKranken ? 'rgba(255,255,255,0.98)' : 'rgba(6,5,0,0.98)',
              borderColor: isKranken ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center min-h-[48px] px-3 text-sm font-medium rounded-xl transition-colors"
                    style={{
                      color: isActive ? content.colors.accent : (isKranken ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.65)'),
                      backgroundColor: isActive ? `${content.colors.accent}10` : 'transparent',
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
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
