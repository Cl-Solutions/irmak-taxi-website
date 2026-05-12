import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown, Heart, Car, MapPin } from 'lucide-react';
import type { Mode, ModeContent } from '../types';

interface HeroProps {
  mode: Mode;
  content: ModeContent;
}

const FloatingParticle = ({
  delay,
  color,
  size,
  x,
  y,
}: {
  delay: number;
  color: string;
  size: number;
  x: string;
  y: string;
}) => (
  <motion.div
    className="absolute rounded-full opacity-20"
    style={{ width: size, height: size, backgroundColor: color, left: x, top: y }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 4 + delay,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
);

export default function Hero({ mode, content }: HeroProps) {
  const isKranken = mode === 'krankenfahrten';
  const [line1, line2] = content.headline.split('\n');

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: content.colors.bg }}
    >
      {/* Animated gradient bg */}
      <AnimatePresence>
        <motion.div
          key={`bg-${mode}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            background: isKranken
              ? 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,106,184,0.3) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(30,106,184,0.15) 0%, transparent 60%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,197,24,0.25) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(245,197,24,0.1) 0%, transparent 60%)',
          }}
        />
      </AnimatePresence>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(${content.colors.muted} 1px, transparent 1px), linear-gradient(90deg, ${content.colors.muted} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      <FloatingParticle delay={0} color={content.colors.accent} size={8} x="10%" y="20%" />
      <FloatingParticle delay={1} color={content.colors.accent} size={5} x="80%" y="15%" />
      <FloatingParticle delay={2} color={content.colors.accent} size={12} x="15%" y="70%" />
      <FloatingParticle delay={0.5} color={content.colors.accent} size={6} x="75%" y="65%" />
      <FloatingParticle delay={1.5} color={content.colors.accent} size={10} x="50%" y="80%" />
      <FloatingParticle delay={3} color={content.colors.accent} size={4} x="35%" y="30%" />

      {/* Big icon background watermark */}
      <motion.div
        className="absolute right-0 bottom-0 opacity-5 pointer-events-none"
        animate={{ rotate: [0, 5, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait">
          {isKranken ? (
            <motion.div
              key="icon-kranken"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Heart size={500} color={content.colors.accent} />
            </motion.div>
          ) : (
            <motion.div
              key="icon-taxi"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Car size={500} color={content.colors.accent} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl">

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 border"
            style={{
              backgroundColor: `${content.colors.accent}15`,
              borderColor: `${content.colors.accent}40`,
              color: content.colors.accent,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: content.colors.accent }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {content.tagline}
          </motion.div>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`headline-${mode}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
            >
              <h1
                className="text-5xl sm:text-6xl lg:text-8xl font-black leading-none tracking-tight mb-6"
                style={{ color: content.colors.text }}
              >
                <span className="block">{line1}</span>
                <span
                  className="block mt-2"
                  style={{
                    background: `linear-gradient(135deg, ${content.colors.accent}, ${content.colors.text})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {line2}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Subheadline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${mode}`}
              className="text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed"
              style={{ color: content.colors.muted }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {content.subheadline}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a
              href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold shadow-2xl"
              style={{
                backgroundColor: content.colors.accent,
                color: isKranken ? '#fff' : '#000',
                boxShadow: `0 8px 32px ${content.colors.accent}40`,
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 12px 40px ${content.colors.accent}60` }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={18} />
              {content.ctaPrimary}
            </motion.a>
            <motion.a
              href="#services"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold border"
              style={{
                color: content.colors.text,
                borderColor: `${content.colors.text}30`,
                backgroundColor: `${content.colors.surface}80`,
              }}
              whileHover={{ scale: 1.03, borderColor: `${content.colors.accent}60` }}
              whileTap={{ scale: 0.97 }}
            >
              {content.ctaSecondary}
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {(isKranken
              ? [
                  { value: '10+', label: 'Jahre Erfahrung' },
                  { value: '24/7', label: 'Erreichbar' },
                  { value: '100%', label: 'Zertifiziert' },
                ]
              : [
                  { value: '24/7', label: '365 Tage' },
                  { value: '3', label: 'Standorte' },
                  { value: '2016', label: 'Gegründet' },
                ]
            ).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div
                  className="text-3xl font-black"
                  style={{ color: content.colors.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: content.colors.muted }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}

            <motion.div
              className="flex items-center gap-2 ml-4"
              style={{ color: content.colors.muted }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <MapPin size={14} />
              <span className="text-sm">
                {isKranken ? 'Enzkreis & Kraichgau' : 'Bretten · Oberderdingen · Vaihingen'}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: content.colors.muted }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Mehr erfahren</span>
        <ChevronDown size={20} />
      </motion.a>
    </section>
  );
}
