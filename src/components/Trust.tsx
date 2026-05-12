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
      className="py-28 relative overflow-hidden"
      style={{ backgroundColor: content.colors.secondary }}
    >
      {/* Background image strip with overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={isKranken ? IMAGES.krankenHero : IMAGES.taxiHero}
          alt=""
          className="w-full h-full object-cover opacity-5"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${content.colors.secondary} 40%, transparent 100%)` }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headline */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span
            className="font-mono-display text-xs tracking-widest uppercase mb-4 block"
            style={{ color: content.colors.accent }}
          >
            — Vertrauen
          </span>
          <h2
            className="font-grotesk text-4xl lg:text-5xl font-bold leading-tight max-w-lg"
            style={{ color: content.colors.text }}
          >
            Das sagen<br />unsere Kunden
          </h2>
        </motion.div>

        {/* Testimonials + Stats side by side */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Testimonials */}
          {content.testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="relative p-7 rounded-2xl border"
              style={{
                backgroundColor: `${content.colors.surface}cc`,
                borderColor: `${content.colors.text}0a`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ borderColor: `${content.colors.accent}30` }}
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="mb-4 opacity-30"
                style={{ color: content.colors.accent }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={13} fill={content.colors.accent} style={{ color: content.colors.accent }} />
                ))}
              </div>

              <p
                className="text-sm leading-relaxed mb-5 italic"
                style={{ color: `${content.colors.text}cc` }}
              >
                „{t.text}"
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-grotesk"
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

        {/* Location cards (Taxi mode) or trust badges (Kranken mode) */}
        {!isKranken && (
          <motion.div
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
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
                whileHover={{ borderColor: `${content.colors.accent}50`, y: -3 }}
              >
                <img
                  src={loc.img}
                  alt={loc.label}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
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

        {isKranken && (
          <motion.div
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {[
              { label: 'Krankenkassen', value: 'Alle GKV', sub: 'Direktabrechnung' },
              { label: 'Ausbildung', value: 'Medizinisch', sub: 'Pflegefachkräfte' },
              { label: 'Reaktionszeit', value: 'Schnell', sub: '24/7 Notfälle' },
              { label: 'Erfahrung', value: 'Seit 2010', sub: 'Im Enzkreis' },
            ].map((badge, i) => (
              <motion.div
                key={badge.label}
                className="p-5 rounded-2xl border text-center"
                style={{
                  backgroundColor: `${content.colors.surface}80`,
                  borderColor: `${content.colors.text}0a`,
                  backdropFilter: 'blur(8px)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <div className="font-grotesk text-base font-bold mb-1" style={{ color: content.colors.accent }}>
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
