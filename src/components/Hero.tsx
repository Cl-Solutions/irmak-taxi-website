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
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const waNumber = isKranken ? '4907041816743' : '490725294940';

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-end overflow-hidden">

      {/* ── Photo background ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${mode}`}
          className="absolute inset-0"
          style={{ y: bgY }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
          <img
            src={content.heroImage}
            alt=""
            className={`w-full h-full object-cover ${isKranken ? 'object-right' : 'object-center'}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlays ── */}
      {isKranken ? (
        <>
          {/* Mobile: light overlay from bottom so text reads on white area */}
          <div
            className="absolute inset-0 sm:hidden"
            style={{ background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 38%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.15) 100%)' }}
          />
          {/* Desktop: horizontal split — white left, photo right */}
          <div
            className="absolute inset-0 hidden sm:block"
            style={{ background: 'linear-gradient(to right, rgba(255,255,255,1.0) 0%, rgba(255,255,255,0.98) 28%, rgba(255,255,255,0.88) 48%, rgba(255,255,255,0.35) 68%, rgba(255,255,255,0.05) 100%)' }}
          />
          {/* Red brand accent bar at top */}
          <div className="absolute top-0 left-0 right-0 h-1 z-20" style={{ backgroundColor: '#b70009' }} />
        </>
      ) : (
        <>
          {/* Taxi: deep dark overlay, dramatic */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(5,4,0,0.97) 0%, rgba(5,4,0,0.88) 38%, rgba(5,4,0,0.6) 65%, rgba(5,4,0,0.25) 100%)' }}
          />
          {/* Yellow glow at bottom left */}
          <div
            className="absolute bottom-0 left-0 w-[50vw] h-[40vh] blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse at bottom left, ${content.colors.accent}22 0%, transparent 70%)` }}
          />
        </>
      )}

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-14 sm:pb-20 lg:pb-24"
        style={{ y: contentY }}
      >
        <div className="max-w-2xl">

          {/* ── Badge ── */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold mb-5 sm:mb-7"
            style={isKranken
              ? { backgroundColor: 'rgba(0,148,24,0.1)', border: '1.5px solid rgba(0,148,24,0.25)', color: content.colors.accent }
              : { backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.85)' }
            }
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Star size={11} fill={content.colors.accent} style={{ color: content.colors.accent }} className="shrink-0" />
            <span>4.9 / 5 · 500+ Fahrten</span>
            <span style={{ color: isKranken ? content.colors.accent2 : `${content.colors.accent}90` }}>
              · {isKranken ? 'Enzkreis' : 'Kraichgau'}
            </span>
          </motion.div>

          {/* ── Headline ── */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h-${mode}`}
              className="font-grotesk font-bold leading-[0.95] tracking-tight mb-5 sm:mb-6"
              style={{ fontSize: 'clamp(3rem, 11vw, 7.5rem)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15 }}
            >
              <span className="block" style={{ color: isKranken ? content.colors.text : '#ffffff' }}>
                <SplitText text={line1} delay={0.18} />
              </span>
              <span className="block" style={{ color: content.colors.accent }}>
                <SplitText text={line2} delay={0.34} />
              </span>
            </motion.h1>
          </AnimatePresence>

          {/* ── Subheadline ── */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${mode}`}
              className="text-base sm:text-lg leading-relaxed mb-7 sm:mb-10 max-w-lg font-medium"
              style={{ color: isKranken ? content.colors.muted : 'rgba(255,255,255,0.65)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.52 }}
            >
              {content.subheadline}
            </motion.p>
          </AnimatePresence>

          {/* ── CTAs ── */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.62 }}
          >
            {/* Primary call button */}
            <motion.a
              href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-bold font-grotesk w-full sm:w-auto min-h-[52px]"
              style={{
                backgroundColor: content.colors.accent,
                color: '#fff',
                boxShadow: `0 4px 24px ${content.colors.accent}45`,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={17} />
              {content.ctaPrimary}
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-semibold w-full sm:w-auto min-h-[52px]"
              style={isKranken
                ? { backgroundColor: 'rgba(37,211,102,0.1)', border: '1.5px solid rgba(37,211,102,0.3)', color: '#1a8a3a' }
                : { backgroundColor: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', color: '#25d366' }
              }
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </motion.a>

            {/* Secondary */}
            <motion.a
              href="#services"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold w-full sm:w-auto min-h-[52px]"
              style={isKranken
                ? { backgroundColor: 'rgba(0,0,0,0.05)', border: '1.5px solid rgba(0,0,0,0.12)', color: content.colors.text }
                : { backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.75)' }
              }
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
            transition={{ duration: 0.6, delay: 0.76 }}
          >
            {content.stats.map((stat, i) => {
              const isEmergency = stat.label.includes('Notfall') || stat.value === '24/7';
              return (
                <motion.div
                  key={stat.label}
                  className="rounded-xl px-4 sm:px-5 py-2.5 sm:py-3"
                  style={isKranken
                    ? {
                        backgroundColor: 'rgba(255,255,255,0.88)',
                        border: `1.5px solid ${isEmergency ? 'rgba(183,0,9,0.2)' : 'rgba(0,148,24,0.15)'}`,
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                      }
                    : {
                        backgroundColor: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(16px)',
                      }
                  }
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.76 + i * 0.07 }}
                >
                  <div
                    className="font-mono-display text-lg sm:text-xl font-bold leading-tight"
                    style={{ color: isKranken && isEmergency ? content.colors.accent2 : content.colors.accent }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: isKranken ? content.colors.muted : 'rgba(255,255,255,0.42)' }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              className="rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2"
              style={isKranken
                ? { backgroundColor: 'rgba(255,255,255,0.88)', border: '1.5px solid rgba(0,0,0,0.1)', backdropFilter: 'blur(8px)', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }
                : { backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)' }
              }
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 }}
            >
              <MapPin size={13} style={{ color: content.colors.accent }} />
              <span className="text-xs" style={{ color: isKranken ? content.colors.muted : 'rgba(255,255,255,0.42)' }}>
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
        style={{ color: isKranken ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.28)' }}
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} />
      </motion.a>
    </section>
  );
}
