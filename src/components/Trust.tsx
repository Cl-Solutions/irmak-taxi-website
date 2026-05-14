import { motion } from 'framer-motion';
import { Star, Quote, Phone } from 'lucide-react';
import type { Mode, ModeContent } from '../types';
import { IMAGES } from '../data/content';
import AnimatedCounter from './ui/AnimatedCounter';

interface TrustProps {
  mode: Mode;
  content: ModeContent;
}

const taxiStats = [
  { value: 500, suffix: '+', label: 'Fahrten / Monat' },
  { value: 24, suffix: '/7', label: 'Erreichbar', isEmergency: false },
  { value: 8, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 3, suffix: '', label: 'Standorte' },
];

const krankenStats = [
  { value: 10, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 100, suffix: '%', label: 'GKV-Abrechnung' },
  { value: 24, suffix: '/7', label: 'Notfall-Bereitschaft', isEmergency: true },
  { value: 2, suffix: '', label: 'Regionen' },
];

export default function Trust({ mode, content }: TrustProps) {
  const isKranken = mode === 'krankenfahrten';
  const stats = isKranken ? krankenStats : taxiStats;

  return (
    <section
      className="py-16 sm:py-24 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: isKranken ? '#f8faf8' : content.colors.secondary }}
    >
      {/* Kranken: branded landscape background */}
      {isKranken && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/images/kranken-bg.png"
            alt=""
            className="absolute right-0 top-0 h-full w-auto max-w-none opacity-[0.13]"
            style={{ objectFit: 'cover', objectPosition: 'right center' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #f8faf8 30%, rgba(248,250,248,0.75) 60%, rgba(248,250,248,0.15) 100%)' }}
          />
        </div>
      )}

      {/* Subtle bg photo hint for Taxi */}
      {!isKranken && (
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={IMAGES.taxiHero}
            alt=""
            className="w-full h-full object-cover opacity-[0.03]"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${content.colors.secondary} 30%, transparent 100%)` }}
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="font-mono-display text-xs tracking-widest uppercase mb-3 block"
            style={{ color: content.colors.accent }}
          >
            — Vertrauen
          </span>
          <h2
            className="font-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: content.colors.text }}
          >
            Das sagen<br />unsere Kunden
          </h2>
        </motion.div>

        {/* Animated counters */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative p-4 sm:p-6 rounded-3xl text-center overflow-hidden cursor-default"
              style={isKranken
                ? {
                    backgroundColor: stat.isEmergency ? `${content.colors.accent2}06` : '#ffffff',
                    boxShadow: stat.isEmergency
                      ? '0 2px 20px rgba(183,0,9,0.07)'
                      : '0 2px 20px rgba(0,148,24,0.07)',
                  }
                : {
                    backgroundColor: content.colors.surface,
                    borderColor: `${content.colors.text}0a`,
                    border: `1px solid ${content.colors.text}0a`,
                  }
              }
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              whileHover={isKranken
                ? { y: -4, boxShadow: stat.isEmergency ? '0 12px 36px rgba(183,0,9,0.11)' : '0 12px 36px rgba(0,148,24,0.11)' }
                : { borderColor: `${content.colors.accent}35` }
              }
            >
              <div
                className="font-grotesk text-2xl sm:text-3xl font-bold mb-1 leading-none"
                style={{ color: (isKranken && stat.isEmergency) ? content.colors.accent2 : content.colors.accent }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1.6} />
              </div>
              <div className="text-xs sm:text-sm font-medium" style={{ color: content.colors.muted }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {content.testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="relative p-5 sm:p-7 cursor-default"
              style={isKranken
                ? {
                    backgroundColor: '#ffffff',
                    borderRadius: '1.5rem',
                    boxShadow: '0 2px 24px rgba(0,148,24,0.07)',
                  }
                : {
                    backgroundColor: content.colors.surface,
                    borderRadius: '1rem',
                    border: `1px solid ${content.colors.text}0a`,
                  }
              }
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.1, 0.2) }}
              whileHover={isKranken
                ? { y: -5, boxShadow: '0 16px 48px rgba(0,148,24,0.11)' }
                : { borderColor: `${content.colors.accent}30` }
              }
            >
              <Quote size={28} className="mb-3 opacity-20" style={{ color: content.colors.accent }} />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={12} fill={content.colors.accent} style={{ color: content.colors.accent }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5 italic" style={{ color: content.colors.muted }}>
                „{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-grotesk shrink-0"
                  style={{ background: `linear-gradient(135deg, ${content.colors.accent}22, ${content.colors.accent}08)`, color: content.colors.accent }}
                >
                  {t.author.split(' ')[0][0]}{t.author.split(' ')[1]?.[0] ?? ''}
                </div>
                <span className="text-xs font-semibold" style={{ color: content.colors.muted }}>
                  {t.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Taxi: Location cards with real photos */}
        {!isKranken && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            {[
              { img: IMAGES.taxiBretten, label: 'Bretten', phone: '07252 94940', raw: '0725294940' },
              { img: IMAGES.taxiOberderdingen, label: 'Oberderdingen', phone: '07045 201035', raw: '07045201035' },
              { img: IMAGES.taxiVaihingen, label: 'Vaihingen/Enz', phone: '07042 1020010', raw: '070421020010' },
            ].map((loc) => (
              <motion.a
                key={loc.label}
                href={`tel:${loc.raw}`}
                className="group relative overflow-hidden rounded-2xl border flex flex-col"
                style={{ borderColor: `${content.colors.text}0a` }}
                whileHover={{ borderColor: `${content.colors.accent}55`, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={loc.img}
                    alt={loc.label}
                    className="w-full h-44 sm:h-48 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to top, ${content.colors.accent}40, transparent 60%)` }}
                  />
                </div>
                <div
                  className="p-4 flex items-center justify-between"
                  style={{ backgroundColor: content.colors.surface }}
                >
                  <div>
                    <p className="font-grotesk font-bold text-sm mb-0.5" style={{ color: content.colors.text }}>
                      {loc.label}
                    </p>
                    <p className="font-mono-display text-sm font-bold" style={{ color: content.colors.accent }}>
                      {loc.phone}
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${content.colors.accent}15` }}
                  >
                    <Phone size={16} style={{ color: content.colors.accent }} />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Krankenfahrten: trust badges */}
        {isKranken && (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              { label: 'Krankenkassen', value: 'Alle GKV', sub: 'Direktabrechnung', isRed: false },
              { label: 'Ausbildung', value: 'Medizinisch', sub: 'Fachpersonal', isRed: false },
              { label: 'Reaktionszeit', value: 'Schnell', sub: '24/7 Notfälle', isRed: true },
              { label: 'Erfahrung', value: 'Seit 2010', sub: 'Im Enzkreis', isRed: false },
            ].map((badge, i) => (
              <motion.div
                key={badge.label}
                className="p-4 sm:p-5 rounded-2xl text-center cursor-default"
                style={{
                  backgroundColor: badge.isRed ? `${content.colors.accent2}06` : '#ffffff',
                  boxShadow: badge.isRed
                    ? '0 2px 16px rgba(183,0,9,0.08)'
                    : '0 2px 16px rgba(0,148,24,0.06)',
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07 }}
                whileHover={{ y: -4, boxShadow: badge.isRed ? '0 10px 32px rgba(183,0,9,0.12)' : '0 10px 32px rgba(0,148,24,0.1)' }}
              >
                <div
                  className="font-grotesk text-sm sm:text-base font-bold mb-1"
                  style={{ color: badge.isRed ? content.colors.accent2 : content.colors.accent }}
                >
                  {badge.value}
                </div>
                <div className="text-xs font-semibold mb-0.5" style={{ color: content.colors.text }}>
                  {badge.label}
                </div>
                <div className="text-xs" style={{ color: content.colors.muted }}>
                  {badge.sub}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
