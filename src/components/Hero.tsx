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
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const waNumber = isKranken ? '4907041816743' : '490725294940';

  // ── KRANKENFAHRTEN: clean white content + brand banner image below ──────────
  if (isKranken) {
    return (
      <section
        id="hero"
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Red brand stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 z-20" style={{ backgroundColor: '#b70009' }} />

        {/* ── Content: pure white, no photo bg ── */}
        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 sm:pt-32 sm:pb-12"
          style={{ y: contentY }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">

            {/* Left: text */}
            <div>
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{
                  backgroundColor: 'rgba(0,148,24,0.08)',
                  border: '1.5px solid rgba(0,148,24,0.22)',
                  color: content.colors.accent,
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Star size={11} fill={content.colors.accent} style={{ color: content.colors.accent }} />
                <span>4.9 / 5 · 500+ Fahrten</span>
                <span style={{ color: content.colors.accent2 }}>· Enzkreis</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="font-grotesk font-bold leading-[0.95] tracking-tight mb-5"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: 0.1 }}
              >
                <span className="block" style={{ color: content.colors.text }}>
                  <SplitText text={line1} delay={0.18} />
                </span>
                <span className="block" style={{ color: content.colors.accent }}>
                  <SplitText text={line2} delay={0.32} />
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-base sm:text-lg leading-relaxed mb-8 max-w-md font-medium"
                style={{ color: content.colors.muted }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.52 }}
              >
                {content.subheadline}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.62 }}
              >
                <motion.a
                  href="tel:07041816743"
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-bold font-grotesk w-full sm:w-auto min-h-[52px]"
                  style={{
                    backgroundColor: content.colors.accent,
                    color: '#fff',
                    boxShadow: `0 4px 20px ${content.colors.accent}40`,
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Phone size={17} />
                  {content.ctaPrimary}
                </motion.a>

                <motion.a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-semibold w-full sm:w-auto min-h-[52px]"
                  style={{
                    backgroundColor: 'rgba(37,211,102,0.09)',
                    border: '1.5px solid rgba(37,211,102,0.28)',
                    color: '#1a8a3a',
                  }}
                  whileHover={{ scale: 1.03, backgroundColor: 'rgba(37,211,102,0.15)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </motion.a>

                <motion.a
                  href="#services"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold w-full sm:w-auto min-h-[52px]"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    border: '1.5px solid rgba(0,0,0,0.10)',
                    color: content.colors.text,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {content.ctaSecondary}
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex flex-wrap gap-2 sm:gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.75 }}
              >
                {content.stats.map((stat, i) => {
                  const isEmergency = stat.value === '24/7' || stat.label.includes('Notfall');
                  return (
                    <motion.div
                      key={stat.label}
                      className="rounded-xl px-4 py-2.5"
                      style={{
                        backgroundColor: isEmergency ? `${content.colors.accent2}08` : `${content.colors.accent}08`,
                        border: `1.5px solid ${isEmergency ? content.colors.accent2 : content.colors.accent}20`,
                      }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.75 + i * 0.07 }}
                    >
                      <div
                        className="font-mono-display text-lg font-bold leading-tight"
                        style={{ color: isEmergency ? content.colors.accent2 : content.colors.accent }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs" style={{ color: content.colors.muted }}>
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
                <motion.div
                  className="rounded-xl px-4 py-2.5 flex items-center gap-2"
                  style={{ backgroundColor: 'rgba(0,0,0,0.04)', border: '1.5px solid rgba(0,0,0,0.08)' }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05 }}
                >
                  <MapPin size={13} style={{ color: content.colors.accent }} />
                  <span className="text-xs" style={{ color: content.colors.muted }}>
                    Enzkreis & Kraichgau
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: small logo badge — desktop only */}
            <motion.div
              className="hidden lg:flex items-center justify-center shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img
                src="/images/brand-full.jpg"
                alt="irmak Krankenfahrten"
                className="w-56 xl:w-64 h-auto"
              />
            </motion.div>

          </div>
        </motion.div>

        {/* ── Brand banner image — full width, no overlay, as-is ── */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <img
            src={content.heroImage}
            alt="irmak Krankenfahrten — Sicher. Persönlich. Zuverlässig unterwegs."
            className="w-full h-auto block"
          />
        </motion.div>
      </section>
    );
  }

  // ── TAXI: full-bleed photo hero ────────────────────────────────────────────
  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-end overflow-hidden">

      {/* Parallax photo */}
      <AnimatePresence mode="wait">
        <motion.div
          key="bg-taxi"
          className="absolute inset-0"
          style={{ y: bgY }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
          <img src={content.heroImage} alt="" className="w-full h-full object-cover object-center" />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(5,4,0,0.97) 0%, rgba(5,4,0,0.88) 38%, rgba(5,4,0,0.6) 65%, rgba(5,4,0,0.22) 100%)' }}
      />
      {/* Yellow glow */}
      <div
        className="absolute bottom-0 left-0 w-[50vw] h-[40vh] blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at bottom left, ${content.colors.accent}20 0%, transparent 70%)` }}
      />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-14 sm:pb-20 lg:pb-24"
        style={{ y: contentY }}
      >
        <div className="max-w-2xl">

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold mb-5 sm:mb-7"
            style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.85)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Star size={11} fill={content.colors.accent} style={{ color: content.colors.accent }} />
            <span>4.9 / 5 · 500+ Fahrten</span>
            <span style={{ color: `${content.colors.accent}90` }}>· Kraichgau</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-grotesk font-bold leading-[0.95] tracking-tight mb-5 sm:mb-6"
            style={{ fontSize: 'clamp(3rem, 11vw, 7.5rem)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <span className="block text-white">
              <SplitText text={line1} delay={0.18} />
            </span>
            <span className="block" style={{ color: content.colors.accent }}>
              <SplitText text={line2} delay={0.34} />
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-base sm:text-lg leading-relaxed mb-7 sm:mb-10 max-w-lg font-medium"
            style={{ color: 'rgba(255,255,255,0.65)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.52 }}
          >
            {content.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.62 }}
          >
            <motion.a
              href="tel:0725294940"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-bold font-grotesk w-full sm:w-auto min-h-[52px]"
              style={{ backgroundColor: content.colors.accent, color: '#000', boxShadow: `0 4px 24px ${content.colors.accent}45` }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={17} />
              {content.ctaPrimary}
            </motion.a>
            <motion.a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-semibold w-full sm:w-auto min-h-[52px]"
              style={{ backgroundColor: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', color: '#25d366' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </motion.a>
            <motion.a
              href="#services"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold w-full sm:w-auto min-h-[52px]"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.75)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {content.ctaSecondary}
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.76 }}
          >
            {content.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-xl px-4 sm:px-5 py-2.5 sm:py-3"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)' }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.76 + i * 0.07 }}
              >
                <div className="font-mono-display text-lg sm:text-xl font-bold leading-tight" style={{ color: content.colors.accent }}>
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
            <motion.div
              className="rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 }}
            >
              <MapPin size={13} style={{ color: content.colors.accent }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.42)' }}>
                Bretten · Vaihingen · Oberderdingen
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

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
