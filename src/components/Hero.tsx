import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Phone, ChevronDown, MapPin, Star } from 'lucide-react';
import { useRef } from 'react';
import type { Mode, ModeContent } from '../types';
import SplitText from './ui/SplitText';

interface HeroProps {
  mode: Mode;
  content: ModeContent;
}

export default function Hero({ mode, content }: HeroProps) {
  const isKranken = mode === 'krankenfahrten';
  const [line1, line2] = content.headline.split('\n');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-end overflow-hidden">

      {/* ── Parallax photo background ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${mode}`}
          className="absolute inset-0"
          style={{ y: bgY }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <img
            src={content.heroImage}
            alt=""
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient overlays ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isKranken
            ? 'linear-gradient(to top, rgba(4,12,6,0.98) 0%, rgba(4,12,6,0.88) 40%, rgba(4,12,6,0.55) 65%, rgba(4,12,6,0.18) 100%)'
            : 'linear-gradient(to top, rgba(6,5,0,0.98) 0%, rgba(6,5,0,0.88) 40%, rgba(6,5,0,0.55) 65%, rgba(6,5,0,0.18) 100%)',
        }}
      />

      {/* ── Animated gradient-mesh orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '55vw',
            height: '55vw',
            backgroundColor: `${content.colors.accent}18`,
            bottom: '-15%',
            left: '-10%',
          }}
          animate={{ scale: [1, 1.12, 1], x: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: '35vw',
            height: '35vw',
            backgroundColor: `${content.colors.accent}0e`,
            top: '10%',
            right: '5%',
          }}
          animate={{ scale: [1, 1.18, 1], y: [0, -25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-14 sm:pb-20 lg:pb-24"
        style={{ y: contentY }}
      >
        <div className="max-w-3xl">

          {/* ── Shimmer rating badge ── */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold mb-6 sm:mb-8 overflow-hidden relative"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.85)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* shimmer sweep */}
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${content.colors.accent}30 50%, transparent 100%)`,
                transform: 'skewX(-20deg)',
              }}
              animate={{ x: ['-150%', '250%'] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
            />
            <Star size={11} fill={content.colors.accent} style={{ color: content.colors.accent }} className="shrink-0" />
            <span>4.9 / 5 · 500+ Fahrten</span>
            <span style={{ color: `${content.colors.accent}90` }}>· {isKranken ? 'Enzkreis' : 'Bretten'}</span>
          </motion.div>

          {/* ── Split-text headline ── */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h-${mode}`}
              className="font-grotesk font-bold leading-[1.0] tracking-tight mb-5 sm:mb-6"
              style={{ fontSize: 'clamp(2.6rem, 10vw, 6.5rem)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <span className="block text-white">
                <SplitText text={line1} delay={0.15} />
              </span>
              <span className="block" style={{ color: content.colors.accent }}>
                <SplitText text={line2} delay={0.32} />
              </span>
            </motion.h1>
          </AnimatePresence>

          {/* ── Subheadline ── */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${mode}`}
              className="text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl"
              style={{ color: 'rgba(255,255,255,0.62)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.55 }}
            >
              {content.subheadline}
            </motion.p>
          </AnimatePresence>

          {/* ── CTAs ── */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <motion.a
              href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-bold font-grotesk w-full sm:w-auto min-h-[52px] relative overflow-hidden"
              style={{
                backgroundColor: content.colors.accent,
                color: isKranken ? '#fff' : '#000',
                boxShadow: `0 0 40px ${content.colors.accent}50`,
              }}
              whileHover={{ scale: 1.04, boxShadow: `0 0 55px ${content.colors.accent}70` }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={17} />
              {content.ctaPrimary}
            </motion.a>

            <motion.a
              href={`https://wa.me/${isKranken ? '4907041816743' : '490725294940'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold w-full sm:w-auto min-h-[52px]"
              style={{
                backgroundColor: 'rgba(37,211,102,0.12)',
                border: '1px solid rgba(37,211,102,0.3)',
                color: '#25d366',
              }}
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(37,211,102,0.2)' }}
              whileTap={{ scale: 0.97 }}
            >
              {/* WhatsApp icon inline */}
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </motion.a>

            <motion.a
              href="#services"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold glass-dark w-full sm:w-auto min-h-[52px]"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {content.ctaSecondary}
            </motion.a>
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.78 }}
          >
            {content.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-dark rounded-xl px-4 sm:px-5 py-2.5 sm:py-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78 + i * 0.07 }}
                whileHover={{ scale: 1.04 }}
              >
                <div
                  className="font-mono-display text-lg sm:text-xl font-bold leading-tight"
                  style={{ color: content.colors.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}

            <motion.div
              className="glass-dark rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
            >
              <MapPin size={13} style={{ color: content.colors.accent }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {isKranken ? 'Enzkreis & Kraichgau' : 'Bretten · Vaihingen · Oberderdingen'}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.a
        href="#services"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 z-10"
        style={{ color: 'rgba(255,255,255,0.28)' }}
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} />
      </motion.a>
    </section>
  );
}
