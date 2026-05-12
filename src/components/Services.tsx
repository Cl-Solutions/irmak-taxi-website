import { motion } from 'framer-motion';
import {
  Stethoscope, Accessibility, Zap, Heart, Building2, MapPin,
  Car, Plane, Package, Users, Navigation, PawPrint,
} from 'lucide-react';
import type { Mode, ModeContent } from '../types';

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
    <section id="services" className="py-28 relative overflow-hidden" style={{ backgroundColor: content.colors.bg }}>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: content.colors.accent }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span
              className="font-mono-display text-xs tracking-widest uppercase mb-4 block"
              style={{ color: content.colors.accent }}
            >
              — {isKranken ? 'Leistungen' : 'Services'}
            </span>
            <h2
              className="font-grotesk text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: content.colors.text }}
            >
              {isKranken ? 'Was wir\nfür Sie tun' : 'Alles, was\nSie brauchen'}
            </h2>
          </motion.div>
          <motion.p
            className="text-base leading-relaxed lg:pb-2"
            style={{ color: content.colors.muted }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {isKranken
              ? 'Von der einfachen Arztfahrt bis zum komplexen Hospitaltransfer — wir sind für jeden Bedarf gerüstet und rechnen direkt mit Ihrer Krankenkasse ab.'
              : 'Von der Stadtfahrt bis zum Flughafen — komfortabel, pünktlich, zuverlässig. 24 Stunden am Tag, 365 Tage im Jahr.'}
          </motion.p>
        </div>

        {/* Services — large card layout, not a boring 6-icon grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.services.map((service, i) => {
            const Icon = iconMap[service.icon] || Car;
            const isFeatured = i === 0;
            return (
              <motion.div
                key={service.title}
                className={`group relative rounded-2xl p-6 lg:p-7 overflow-hidden border cursor-default ${isFeatured ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                style={{
                  backgroundColor: `${content.colors.surface}`,
                  borderColor: `${content.colors.text}0a`,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -3, borderColor: `${content.colors.accent}40` }}
              >
                {/* Hover spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), ${content.colors.accent}10, transparent 70%)`,
                  }}
                />

                {/* Number */}
                <span
                  className="font-mono-display text-5xl font-bold absolute top-4 right-5 leading-none select-none"
                  style={{ color: `${content.colors.accent}12` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${content.colors.accent}18` }}
                >
                  <Icon size={20} style={{ color: content.colors.accent }} />
                </div>

                <h3
                  className="font-grotesk text-base font-bold mb-2"
                  style={{ color: content.colors.text }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: content.colors.muted }}>
                  {service.description}
                </p>

                {/* Bottom line reveal */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px]"
                  style={{ backgroundColor: content.colors.accent }}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.35 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Big CTA below */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold font-grotesk"
            style={{ backgroundColor: content.colors.accent, color: isKranken ? '#fff' : '#000' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Jetzt Fahrt buchen →
          </motion.a>
          <span className="text-sm" style={{ color: content.colors.muted }}>
            {isKranken ? 'Krankenkassenpflichtige Fahrten möglich' : '24/7 erreichbar'}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
