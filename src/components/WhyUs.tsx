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
      className="py-16 sm:py-24 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: isKranken ? '#ffffff' : content.colors.secondary }}
    >
      {/* Taxi: glow blob — only in dark mode */}
      {!isKranken && (
        <div
          className="absolute right-0 top-1/3 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none opacity-[0.07]"
          style={{ backgroundColor: content.colors.accent, transform: 'translateX(50%)' }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-10 sm:mb-14 lg:mb-16">
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
              — Warum uns wählen
            </span>
            <h2
              className="font-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: content.colors.text }}
            >
              {isKranken
                ? 'Medizinische Kompetenz\ntrifft persönlicher Service'
                : 'Der Unterschied,\nden Sie spüren werden'}
            </h2>
          </motion.div>

          {/* Decorative stat */}
          <motion.div
            className="hidden lg:block shrink-0 text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="font-mono-display font-bold leading-none"
              style={{
                fontSize: 'clamp(5rem, 10vw, 9rem)',
                color: isKranken ? `${content.colors.accent}12` : `${content.colors.accent}12`,
              }}
            >
              {isKranken ? '10+' : '24/7'}
            </div>
            <div className="text-sm font-semibold -mt-3" style={{ color: content.colors.muted }}>
              {isKranken ? 'Jahre Erfahrung' : 'Für Sie da'}
            </div>
          </motion.div>
        </div>

        {/* USP grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-10 sm:mb-14 lg:mb-16">
          {content.usps.map((usp, i) => {
            const Icon = iconMap[usp.icon] || ShieldCheck;

            if (isKranken) {
              return (
                <motion.div
                  key={usp.title}
                  className="flex gap-5 p-6 sm:p-7 rounded-3xl cursor-default"
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 24px rgba(0,148,24,0.07)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.24) }}
                  whileHover={{ y: -5, boxShadow: '0 14px 44px rgba(0,148,24,0.11)' }}
                >
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(0,148,24,0.15) 0%, rgba(0,184,30,0.04) 100%)' }}
                  >
                    <Icon size={20} style={{ color: content.colors.accent }} />
                  </div>
                  <div>
                    <h3
                      className="font-grotesk font-bold text-base mb-1.5 leading-snug"
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
            }

            // Taxi — original styling
            return (
              <motion.div
                key={usp.title}
                className="flex gap-4 p-5 sm:p-6 lg:p-7 rounded-2xl border"
                style={{
                  backgroundColor: content.colors.surface,
                  borderColor: `${content.colors.text}08`,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.24) }}
                whileHover={{ borderColor: `${content.colors.accent}35` }}
              >
                <div
                  className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${content.colors.accent}15` }}
                >
                  <Icon size={20} style={{ color: content.colors.accent }} />
                </div>
                <div>
                  <h3
                    className="font-grotesk font-bold text-base mb-1.5 leading-snug"
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

        {/* CTA band */}
        <motion.div
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6"
          style={isKranken
            ? {
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 40px rgba(0,148,24,0.08)',
                border: `1px solid rgba(0,148,24,0.1)`,
              }
            : {
                background: `linear-gradient(135deg, ${content.colors.accent}18 0%, ${content.colors.accent}07 100%)`,
                border: `1px solid ${content.colors.accent}30`,
              }
          }
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Soft green accent blob — Kranken only */}
          {isKranken && (
            <div
              className="absolute right-0 top-0 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(0,148,24,0.3), transparent 70%)', transform: 'translate(30%, -30%)' }}
            />
          )}

          <div className="relative">
            <h3
              className="font-grotesk text-xl sm:text-2xl lg:text-3xl font-bold mb-2"
              style={{ color: content.colors.text }}
            >
              {isKranken ? 'Brauchen Sie eine Fahrt?' : 'Brauchen Sie ein Taxi?'}
            </h3>
            <p className="text-sm sm:text-base" style={{ color: content.colors.muted }}>
              {isKranken
                ? 'Mo–Fr 8–16 Uhr erreichbar — Notfälle 24/7.'
                : 'Rund um die Uhr, 365 Tage im Jahr für Sie da.'}
            </p>
            {isKranken && (
              <div className="flex items-center gap-2 mt-3">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: `${content.colors.accent2}12`, color: content.colors.accent2, border: `1px solid ${content.colors.accent2}25` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Notfälle 24/7
                </span>
              </div>
            )}
          </div>
          <motion.a
            href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
            className="relative w-full sm:w-auto shrink-0 flex items-center justify-center px-7 py-4 rounded-2xl font-bold font-grotesk text-base min-h-[52px]"
            style={{ backgroundColor: content.colors.accent, color: isKranken ? '#fff' : '#000' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {isKranken ? '07041 816743' : '07252 94940'}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
