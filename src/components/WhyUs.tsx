import { motion } from 'framer-motion';
import { ShieldCheck, Clock, CreditCard, Star, Award, Zap, MapPin } from 'lucide-react';
import type { Mode, ModeContent } from '../types';

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck, Clock, CreditCard, Star, Award, Zap, MapPin,
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
      className="py-28 relative overflow-hidden"
      style={{ backgroundColor: content.colors.bg }}
    >
      {/* Glow blobs */}
      <motion.div
        className="absolute -right-48 top-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: content.colors.accent, opacity: 0.06 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
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
              — Warum uns wählen
            </span>
            <h2
              className="font-grotesk text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: content.colors.text }}
            >
              {isKranken ? 'Medizinische\nKompetenz trifft\npersönlichen Service' : 'Der Unterschied,\nden Sie\nspüren werden'}
            </h2>
          </motion.div>

          {/* Big accent number */}
          <motion.div
            className="shrink-0 text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="font-mono-display font-bold leading-none"
              style={{ fontSize: 'clamp(5rem, 12vw, 10rem)', color: `${content.colors.accent}15` }}
            >
              {isKranken ? '10+' : '24/7'}
            </div>
            <div className="text-sm font-semibold -mt-4" style={{ color: content.colors.muted }}>
              {isKranken ? 'Jahre Erfahrung' : 'Für Sie da'}
            </div>
          </motion.div>
        </div>

        {/* USP grid — horizontal list style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {content.usps.map((usp, i) => {
            const Icon = iconMap[usp.icon] || ShieldCheck;
            return (
              <motion.div
                key={usp.title}
                className="flex gap-5 p-6 lg:p-7 rounded-2xl border group"
                style={{
                  backgroundColor: content.colors.surface,
                  borderColor: `${content.colors.text}08`,
                }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ borderColor: `${content.colors.accent}35` }}
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${content.colors.accent}15` }}
                >
                  <Icon size={22} style={{ color: content.colors.accent }} />
                </div>
                <div>
                  <h3
                    className="font-grotesk font-bold text-base mb-1.5"
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

        {/* Full-width CTA band */}
        <motion.div
          className="relative overflow-hidden rounded-2xl p-8 lg:p-12 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: `linear-gradient(135deg, ${content.colors.accent}18 0%, ${content.colors.accent}08 100%)`,
            border: `1px solid ${content.colors.accent}30`,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3
              className="font-grotesk text-2xl lg:text-3xl font-bold mb-2"
              style={{ color: content.colors.text }}
            >
              {isKranken ? 'Brauchen Sie eine Fahrt?' : 'Brauchen Sie ein Taxi?'}
            </h3>
            <p style={{ color: content.colors.muted }}>
              {isKranken ? 'Wir sind Mo–Fr 8–16 Uhr erreichbar, Notfälle 24/7.' : 'Rund um die Uhr, 365 Tage im Jahr für Sie da.'}
            </p>
          </div>
          <motion.a
            href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
            className="shrink-0 px-8 py-4 rounded-xl font-bold font-grotesk text-base"
            style={{
              backgroundColor: content.colors.accent,
              color: isKranken ? '#fff' : '#000',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {isKranken ? '07041 816743' : '07252 94940'}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
