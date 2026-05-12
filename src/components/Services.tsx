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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services({ mode, content }: ServicesProps) {
  const isKranken = mode === 'krankenfahrten';

  return (
    <section
      id="services"
      className="py-24 lg:py-32"
      style={{ backgroundColor: content.colors.bg }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: `${content.colors.accent}15`,
              color: content.colors.accent,
            }}
          >
            {isKranken ? 'Unsere Leistungen' : 'Services'}
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4 leading-tight"
            style={{ color: content.colors.text }}
          >
            {isKranken ? 'Alles, was Sie brauchen' : 'Was wir anbieten'}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: content.colors.muted }}>
            {isKranken
              ? 'Von der einfachen Arztfahrt bis zum komplexen Hospitaltransfer — wir sind für jeden Bedarf gerüstet.'
              : 'Von der Stadtfahrt bis zum Flughafen — komfortabel, pünktlich, zuverlässig.'}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {content.services.map((service) => {
            const Icon = iconMap[service.icon] || Car;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative p-6 lg:p-8 rounded-2xl border cursor-default overflow-hidden"
                style={{
                  backgroundColor: content.colors.surface,
                  borderColor: `${content.colors.text}10`,
                }}
                whileHover={{
                  y: -4,
                  borderColor: `${content.colors.accent}50`,
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${content.colors.accent}12, transparent 70%)`,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon */}
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${content.colors.accent}20` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={22} style={{ color: content.colors.accent }} />
                </motion.div>

                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: content.colors.text }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: content.colors.muted }}>
                  {service.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl"
                  style={{ backgroundColor: content.colors.accent }}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
