import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown, MapPin } from 'lucide-react';
import type { Mode, ModeContent } from '../types';

interface HeroProps {
  mode: Mode;
  content: ModeContent;
}

export default function Hero({ mode, content }: HeroProps) {
  const isKranken = mode === 'krankenfahrten';
  const [line1, line2] = content.headline.split('\n');

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">

      {/* Real photo background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${mode}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <img
            src={content.heroImage}
            alt=""
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
          <div
            className="absolute inset-0"
            style={{
              background: isKranken
                ? 'linear-gradient(to top, rgba(6,15,8,0.97) 0%, rgba(6,15,8,0.85) 45%, rgba(6,15,8,0.5) 70%, rgba(6,15,8,0.2) 100%)'
                : 'linear-gradient(to top, rgba(8,7,0,0.97) 0%, rgba(8,7,0,0.85) 45%, rgba(8,7,0,0.5) 70%, rgba(8,7,0,0.2) 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{
              background: `radial-gradient(ellipse 70% 50% at 30% 100%, ${content.colors.accent}20, transparent)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content — pt accounts for fixed navbar (64px) + breathing room */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-14 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl">

          {/* Live badge — truncate on very small screens */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold mb-6 sm:mb-8 glass-dark max-w-full"
            style={{ color: content.colors.accent }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: content.colors.accent }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="truncate">{content.tagline}</span>
          </motion.div>

          {/* Headline — clamp ensures readable on 375px */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h-${mode}`}
              className="font-grotesk font-bold leading-[1.0] tracking-tight mb-5 sm:mb-6"
              style={{ fontSize: 'clamp(2.6rem, 10vw, 6.5rem)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.55 }}
            >
              <span className="block text-white text-shadow-lg">{line1}</span>
              <span className="block text-shadow" style={{ color: content.colors.accent }}>
                {line2}
              </span>
            </motion.h1>
          </AnimatePresence>

          {/* Subheadline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${mode}`}
              className="text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl"
              style={{ color: 'rgba(255,255,255,0.62)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {content.subheadline}
            </motion.p>
          </AnimatePresence>

          {/* CTA buttons — full-width stack on mobile, row on sm+ */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <motion.a
              href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-bold font-grotesk w-full sm:w-auto min-h-[52px]"
              style={{
                backgroundColor: content.colors.accent,
                color: isKranken ? '#fff' : '#000',
                boxShadow: `0 0 36px ${content.colors.accent}45`,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={17} />
              {content.ctaPrimary}
            </motion.a>
            <motion.a
              href="#services"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold glass-dark w-full sm:w-auto min-h-[52px]"
              style={{ color: 'rgba(255,255,255,0.8)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {content.ctaSecondary}
            </motion.a>
          </motion.div>

          {/* Stats row — wraps naturally on mobile */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
          >
            {content.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-dark rounded-xl px-4 sm:px-5 py-2.5 sm:py-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 + i * 0.07 }}
              >
                <div
                  className="font-mono-display text-lg sm:text-xl font-bold leading-tight"
                  style={{ color: content.colors.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}

            {/* Location tag */}
            <motion.div
              className="glass-dark rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <MapPin size={13} style={{ color: content.colors.accent }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.42)' }}>
                {isKranken ? 'Enzkreis & Kraichgau' : 'Bretten · Vaihingen · Oberderdingen'}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint — hidden on very small screens to avoid clutter */}
      <motion.a
        href="#services"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 z-10"
        style={{ color: 'rgba(255,255,255,0.3)' }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <span className="text-[10px] font-semibold tracking-widest uppercase">Mehr</span>
        <ChevronDown size={18} />
      </motion.a>
    </section>
  );
}
