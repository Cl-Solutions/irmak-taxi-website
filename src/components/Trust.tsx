import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import type { Mode, ModeContent } from '../types';
import { IMAGES } from '../data/content';

interface TrustProps {
  mode: Mode;
  content: ModeContent;
}

export default function Trust({ mode, content }: TrustProps) {
  const isKranken = mode === 'krankenfahrten';

  return (
    <section
      className="py-16 sm:py-24 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: content.colors.secondary }}
    >
      {/* Background image hint */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={isKranken ? IMAGES.krankenHero : IMAGES.taxiHero}
          alt=""
          className="w-full h-full object-cover opacity-[0.04]"
          crossOrigin="anonymous"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${content.colors.secondary} 35%, transparent 100%)` }}
        />
      </div>

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

        {/* Testimonials — 1 col mobile, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="relative p-5 sm:p-7 rounded-2xl border"
              style={{
                backgroundColor: `${content.colors.surface}cc`,
                borderColor: `${content.colors.text}0a`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.1, 0.2) }}
              whileHover={{ borderColor: `${content.colors.accent}30` }}
            >
              <Quote size={28} className="mb-3 opacity-25" style={{ color: content.colors.accent }} />

              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={12} fill={content.colors.accent} style={{ color: content.colors.accent }} />
                ))}
              </div>

              <p
                className="text-sm leading-relaxed mb-5 italic"
                style={{ color: `${content.colors.text}cc` }}
              >
                „{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-grotesk shrink-0"
                  style={{ backgroundColor: `${content.colors.accent}20`, color: content.colors.accent }}
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

        {/* Taxi: Location cards (1 col → 3 col) */}
        {!isKranken && (
          <motion.div
            className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              { img: IMAGES.taxiBretten, label: 'Bretten', phone: '07252 94940' },
              { img: IMAGES.taxiOberderdingen, label: 'Oberderdingen', phone: '07045 201035' },
              { img: IMAGES.taxiVaihingen, label: 'Vaihingen/Enz', phone: '07042 1020010' },
            ].map((loc) => (
              <motion.a
                key={loc.label}
                href={`tel:${loc.phone.replace(/\s/g, '')}`}
                className="group relative overflow-hidden rounded-2xl border"
                style={{ borderColor: `${content.colors.text}0a` }}
                whileHover={{ borderColor: `${content.colors.accent}50`, y: -2 }}
              >
                <img
                  src={loc.img}
                  alt={loc.label}
                  className="w-full h-36 sm:h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                  crossOrigin="anonymous"
                />
                <div className="p-4" style={{ backgroundColor: content.colors.surface }}>
                  <p className="font-grotesk font-bold text-sm mb-0.5" style={{ color: content.colors.text }}>
                    {loc.label}
                  </p>
                  <p className="font-mono-display text-xs" style={{ color: content.colors.accent }}>
                    {loc.phone}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Krankenfahrten: trust badges (2 col mobile, 4 col sm+) */}
        {isKranken && (
          <motion.div
            className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              { label: 'Krankenkassen', value: 'Alle GKV', sub: 'Direktabrechnung' },
              { label: 'Ausbildung', value: 'Medizinisch', sub: 'Pflegefachkräfte' },
              { label: 'Reaktionszeit', value: 'Schnell', sub: '24/7 Notfälle' },
              { label: 'Erfahrung', value: 'Seit 2010', sub: 'Im Enzkreis' },
            ].map((badge, i) => (
              <motion.div
                key={badge.label}
                className="p-4 sm:p-5 rounded-2xl border text-center"
                style={{
                  backgroundColor: `${content.colors.surface}80`,
                  borderColor: `${content.colors.text}0a`,
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07 }}
              >
                <div className="font-grotesk text-sm sm:text-base font-bold mb-1" style={{ color: content.colors.accent }}>
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
