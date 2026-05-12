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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isKranken = mode === 'krankenfahrten';
  const accent = content.colors.accent;
  const surface = content.colors.surface;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? content.colors.secondary : 'transparent',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none',
      }}
      animate={{
        backgroundColor: scrolled ? content.colors.secondary : 'rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: accent }}
              animate={{ backgroundColor: accent }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {isKranken ? (
                  <motion.div
                    key="kranken-icon"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Heart size={20} color={isKranken ? '#fff' : '#000'} strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="taxi-icon"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Car size={20} color="#000" strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`name-${mode}`}
                  className="font-bold text-white leading-tight text-sm lg:text-base"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                >
                  {isKranken ? 'Krankenfahrten Irmak' : 'Maxi Taxi Bretten'}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs" style={{ color: content.colors.muted }}>
                Irmak Transport GmbH
              </p>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 hover:opacity-100"
                style={{ color: content.colors.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = content.colors.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = content.colors.muted)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Mode Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Mode Toggle */}
            <div
              className="flex items-center rounded-full p-1 gap-1"
              style={{ backgroundColor: surface }}
            >
              <motion.button
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
                style={{
                  backgroundColor: isKranken ? '#1e6ab8' : 'transparent',
                  color: isKranken ? '#fff' : content.colors.muted,
                }}
                onClick={() => onModeChange('krankenfahrten')}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={12} />
                Krankenfahrten
              </motion.button>
              <motion.button
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
                style={{
                  backgroundColor: !isKranken ? '#f5c518' : 'transparent',
                  color: !isKranken ? '#000' : content.colors.muted,
                }}
                onClick={() => onModeChange('taxi')}
                whileTap={{ scale: 0.95 }}
              >
                <Car size={12} />
                Taxi
              </motion.button>
            </div>

            {/* CTA */}
            <motion.a
              href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: accent, color: isKranken ? '#fff' : '#000' }}
              whileHover={{ scale: 1.05, opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
              animate={{ backgroundColor: accent }}
              transition={{ duration: 0.5 }}
            >
              <Phone size={14} />
              Anrufen
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: content.colors.text }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
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
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
            style={{ backgroundColor: content.colors.secondary }}
          >
            <div className="px-4 pb-4 pt-2 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium py-2 border-b"
                  style={{ color: content.colors.text, borderColor: content.colors.surface }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Mode Toggle */}
              <div className="flex gap-2 pt-2">
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: isKranken ? '#1e6ab8' : content.colors.surface,
                    color: isKranken ? '#fff' : content.colors.muted,
                  }}
                  onClick={() => { onModeChange('krankenfahrten'); setMenuOpen(false); }}
                >
                  <Heart size={14} />
                  Krankenfahrten
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: !isKranken ? '#f5c518' : content.colors.surface,
                    color: !isKranken ? '#000' : content.colors.muted,
                  }}
                  onClick={() => { onModeChange('taxi'); setMenuOpen(false); }}
                >
                  <Car size={14} />
                  Taxi
                </button>
              </div>

              <a
                href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: accent, color: isKranken ? '#fff' : '#000' }}
              >
                <Phone size={16} />
                {content.contact.phones[0].number}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
