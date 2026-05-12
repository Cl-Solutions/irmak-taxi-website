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

      {/* ── Real photo background ── */}
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
          {/* Dark gradient overlay — bottom-heavy so text is legible */}
          <div
            className="absolute inset-0"
            style={{
              background: isKranken
                ? 'linear-gradient(to top, rgba(6,15,8,0.97) 0%, rgba(6,15,8,0.82) 40%, rgba(6,15,8,0.4) 70%, rgba(6,15,8,0.15) 100%)'
                : 'linear-gradient(to top, rgba(8,7,0,0.97) 0%, rgba(8,7,0,0.82) 40%, rgba(8,7,0,0.4) 70%, rgba(8,7,0,0.15) 100%)',
            }}
          />
          {/* Subtle colored glow from bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{
              background: `radial-gradient(ellipse 70% 50% at 30% 100%, ${content.colors.accent}22, transparent)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-40">
        <div className="max-w-3xl">

          {/* Live badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold mb-8 glass-dark"
            style={{ color: content.colors.accent }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: content.colors.accent }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            {content.tagline}
          </motion.div>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h-${mode}`}
              className="font-grotesk font-bold leading-none tracking-tight mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.55 }}
            >
              <span className="block text-white text-shadow-lg">{line1}</span>
              <span
                className="block text-shadow"
                style={{
                  color: content.colors.accent,
                  WebkitTextStroke: isKranken ? '0' : '0',
                }}
              >
                {line2}
              </span>
            </motion.h1>
          </AnimatePresence>

          {/* Subheadline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${mode}`}
              className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: 'rgba(255,255,255,0.65)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {content.subheadline}
            </motion.p>
          </AnimatePresence>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <motion.a
              href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-bold font-grotesk"
              style={{
                backgroundColor: content.colors.accent,
                color: isKranken ? '#fff' : '#000',
                boxShadow: `0 0 40px ${content.colors.accent}50`,
              }}
              whileHover={{ scale: 1.04, boxShadow: `0 0 60px ${content.colors.accent}70` }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={17} />
              {content.ctaPrimary}
            </motion.a>
            <motion.a
              href="#services"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-semibold glass-dark"
              style={{ color: 'rgba(255,255,255,0.8)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {content.ctaSecondary}
            </motion.a>
          </motion.div>

          {/* Stats row — glassmorphism cards */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {content.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-dark rounded-xl px-5 py-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
              >
                <div
                  className="font-mono-display text-xl font-bold"
                  style={{ color: content.colors.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}

            {/* Location tag */}
            <motion.div
              className="glass-dark rounded-xl px-5 py-3 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <MapPin size={14} style={{ color: content.colors.accent }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {isKranken ? 'Enzkreis & Kraichgau' : 'Bretten · Oberderdingen · Vaihingen'}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#services"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
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
