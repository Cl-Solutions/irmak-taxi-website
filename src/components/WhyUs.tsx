import { motion } from 'framer-motion';
import { ShieldCheck, Clock, CreditCard, Star, Award, Zap } from 'lucide-react';
import type { Mode, ModeContent } from '../types';

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck, Clock, CreditCard, Star, Award, Zap,
};

interface WhyUsProps {
  mode: Mode;
  content: ModeContent;
}

export default function WhyUs({ mode, content }: WhyUsProps) {
  const isKranken = mode === 'krankenfahrten';

  return (
    <section
      id="why-us"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: content.colors.secondary }}
    >
      {/* Decorative background shape */}
      <motion.div
        className="absolute -left-64 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: content.colors.accent }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-64 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: content.colors.accent }}
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
              backgroundColor: `${content.colors.accent}20`,
              color: content.colors.accent,
            }}
          >
            Warum uns wählen
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ color: content.colors.text }}
          >
            {isKranken ? 'Vertrauen Sie auf\nExperten' : 'Der Unterschied,\nden Sie spüren'}
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: content.colors.muted }}>
            {isKranken
              ? 'Wir verbinden medizinische Kompetenz mit persönlichem Service.'
              : 'Komfort, Pünktlichkeit und Verlässlichkeit — das ist unser Versprechen.'}
          </p>
        </motion.div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content.usps.map((usp, i) => {
            const Icon = iconMap[usp.icon] || ShieldCheck;
            return (
              <motion.div
                key={usp.title}
                className="flex gap-5 p-6 lg:p-8 rounded-2xl border"
                style={{
                  backgroundColor: `${content.colors.bg}60`,
                  borderColor: `${content.colors.text}08`,
                }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  borderColor: `${content.colors.accent}30`,
                  backgroundColor: `${content.colors.surface}80`,
                }}
              >
                <motion.div
                  className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${content.colors.accent}20` }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Icon size={26} style={{ color: content.colors.accent }} />
                </motion.div>
                <div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: content.colors.text }}
                  >
                    {usp.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: content.colors.muted }}>
                    {usp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          className="mt-16 p-8 lg:p-12 rounded-3xl text-center"
          style={{
            background: `linear-gradient(135deg, ${content.colors.accent}20, ${content.colors.accent}08)`,
            border: `1px solid ${content.colors.accent}30`,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-2xl lg:text-3xl font-black mb-3"
            style={{ color: content.colors.text }}
          >
            {isKranken ? 'Bereit für Ihre nächste Fahrt?' : 'Taxi brauchen?'}
          </h3>
          <p className="mb-6" style={{ color: content.colors.muted }}>
            {isKranken
              ? 'Rufen Sie uns an — wir kümmern uns um alles.'
              : 'Einfach anrufen. Wir sind in wenigen Minuten bei Ihnen.'}
          </p>
          <motion.a
            href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base"
            style={{
              backgroundColor: content.colors.accent,
              color: isKranken ? '#fff' : '#000',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {isKranken ? 'Jetzt anrufen: 07041 816743' : 'Jetzt anrufen: 07252 94940'}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
