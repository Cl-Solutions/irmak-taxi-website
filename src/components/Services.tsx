import { motion } from 'framer-motion';
import {
  Stethoscope, Accessibility, Zap, Heart, Building2, MapPin,
  Car, Plane, Package, Users, Navigation, PawPrint, CheckCircle2,
} from 'lucide-react';
import type { Mode, ModeContent } from '../types';
import TiltCard from './ui/TiltCard';

const iconMap: Record<string, React.ElementType> = {
  Stethoscope, Accessibility, Zap, Heart, Building2, MapPin,
  Car, Plane, Package, Users, Navigation, PawPrint,
};

interface ServicesProps {
  mode: Mode;
  content: ModeContent;
}

export default function Services({ mode, content }: ServicesProps) {
  const isKranken = mode === 'krankenfahrten';

  return (
    <section
      id="services"
      className="py-16 sm:py-24 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: isKranken ? '#f8faf8' : content.colors.bg }}
    >
      {/* Top glow — only for Taxi dark mode */}
      {!isKranken && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-48 blur-3xl opacity-[0.12] pointer-events-none"
          style={{ backgroundColor: content.colors.accent }}
        />
      )}
      {/* Krankenfahrten: subtle section divider */}
      {isKranken && (
        <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: `${content.colors.accent2}20` }} />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 sm:mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="font-mono-display text-xs tracking-widest uppercase mb-3 block"
              style={{ color: content.colors.accent }}
            >
              — {isKranken ? 'Leistungen' : 'Services'}
            </span>
            <h2
              className="font-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: content.colors.text }}
            >
              {isKranken ? 'Was wir für Sie tun' : 'Alles, was Sie brauchen'}
            </h2>
          </motion.div>
          <motion.p
            className="text-sm sm:text-base leading-relaxed mt-4 max-w-2xl"
            style={{ color: content.colors.muted }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {isKranken
              ? 'Von der einfachen Arztfahrt bis zum Hospitaltransfer — wir rechnen direkt mit Ihrer Krankenkasse ab.'
              : 'Von der Stadtfahrt bis zum Flughafen — komfortabel, pünktlich, zuverlässig. 24 Stunden am Tag, 365 Tage im Jahr.'}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {content.services.map((service, i) => {
            const Icon = iconMap[service.icon] || Car;

            /* ── Krankenfahrten card — soft, white, shadow-only ── */
            if (isKranken) {
              return (
                <motion.div
                  key={service.title}
                  className="group relative rounded-3xl p-6 sm:p-7 overflow-hidden h-full cursor-default"
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 24px rgba(0,148,24,0.07)',
                  }}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.07, 0.28) }}
                  whileHover={{ y: -6, boxShadow: '0 18px 52px rgba(0,148,24,0.13)' }}
                >
                  {/* Circular gradient icon */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-5 shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(0,148,24,0.15) 0%, rgba(0,184,30,0.04) 100%)' }}
                  >
                    <Icon size={20} style={{ color: content.colors.accent }} />
                  </div>

                  <h3 className="font-grotesk text-base font-bold mb-2.5" style={{ color: content.colors.text }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: content.colors.muted }}>
                    {service.description}
                  </p>

                  {/* Bottom accent sweep on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${content.colors.accent}, rgba(0,148,24,0.15))` }}
                  />
                </motion.div>
              );
            }

            /* ── Taxi card — TiltCard, original styling ── */
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.25) }}
              >
                <TiltCard
                  className="group relative rounded-2xl p-5 sm:p-6 lg:p-7 overflow-hidden border h-full cursor-default"
                  style={{
                    backgroundColor: content.colors.surface,
                    borderColor: `${content.colors.text}0a`,
                  }}
                  intensity={8}
                >
                  {/* Gradient border on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${content.colors.accent}25, transparent 60%)`,
                      border: `1.5px solid ${content.colors.accent}35`,
                    }}
                  />

                  {/* Number watermark */}
                  <span
                    className="font-mono-display text-5xl font-bold absolute top-3 right-4 leading-none select-none pointer-events-none"
                    style={{ color: `${content.colors.accent}12` }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 relative"
                    style={{ backgroundColor: `${content.colors.accent}15` }}
                  >
                    <Icon size={20} style={{ color: content.colors.accent }} />
                  </div>

                  <h3 className="font-grotesk text-base font-bold mb-2 relative" style={{ color: content.colors.text }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed relative" style={{ color: content.colors.muted }}>
                    {service.description}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] hidden sm:block"
                    style={{ backgroundColor: content.colors.accent }}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.35 }}
                  />
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance strip — Kranken only */}
        {isKranken && (
          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-5 px-6 rounded-2xl"
            style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 16px rgba(0,148,24,0.06)' }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              'Alle gesetzlichen Krankenkassen',
              'Direktabrechnung',
              'Medizinisch ausgebildetes Personal',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={15} style={{ color: content.colors.accent }} />
                <span className="text-sm font-medium" style={{ color: content.colors.text }}>{item}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* CTA row — Taxi only */}
        {!isKranken && (
          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <motion.a
              href="tel:0725294940"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold font-grotesk w-full sm:w-auto min-h-[48px]"
              style={{ backgroundColor: content.colors.accent, color: '#000' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Jetzt Fahrt buchen →
            </motion.a>
            <span className="text-sm text-center" style={{ color: content.colors.muted }}>
              24/7 erreichbar
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
