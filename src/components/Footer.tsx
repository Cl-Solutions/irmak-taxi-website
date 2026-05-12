import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Heart, Car } from 'lucide-react';
import type { Mode, ModeContent } from '../types';

interface FooterProps {
  mode: Mode;
  content: ModeContent;
}

export default function Footer({ mode, content }: FooterProps) {
  const isKranken = mode === 'krankenfahrten';
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: content.colors.primary,
        borderColor: `${content.colors.text}08`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Grid: full-width 1-col on mobile, 2-col sm, 4-col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">

          {/* Brand — spans 2 cols on lg */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: content.colors.accent }}
              >
                {isKranken ? (
                  <Heart size={17} color="#fff" strokeWidth={2.5} />
                ) : (
                  <Car size={17} color="#000" strokeWidth={2.5} />
                )}
              </div>
              <div>
                <p className="font-grotesk font-bold text-sm leading-tight" style={{ color: content.colors.text }}>
                  Irmak Transport GmbH
                </p>
                <p className="font-mono-display text-xs mt-0.5" style={{ color: content.colors.muted }}>
                  {isKranken ? 'Krankenfahrten Irmak' : 'Maxi Car & Enz Taxi GmbH'}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: content.colors.muted }}>
              {isKranken
                ? 'Professioneller Patientenbeförderungsdienst im Enzkreis und Kraichgau. Qualifiziertes Fachpersonal seit 2010.'
                : 'Ihr Taxi- und Transferservice in Bretten, Oberderdingen und Vaihingen/Enz. Seit 2016.'}
            </p>
          </div>

          {/* Leistungen */}
          <div>
            <h4
              className="font-grotesk font-bold text-xs tracking-widest uppercase mb-4"
              style={{ color: content.colors.muted }}
            >
              Leistungen
            </h4>
            <ul className="flex flex-col gap-2.5">
              {content.services.slice(0, 4).map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-sm transition-colors min-h-[36px] flex items-center"
                    style={{ color: `${content.colors.muted}bb` }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = content.colors.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = `${content.colors.muted}bb`)}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4
              className="font-grotesk font-bold text-xs tracking-widest uppercase mb-4"
              style={{ color: content.colors.muted }}
            >
              Kontakt
            </h4>
            <ul className="flex flex-col gap-3">
              {content.contact.phones.slice(0, 2).map((p) => (
                <li key={p.number} className="flex items-center gap-2 min-h-[36px]">
                  <Phone size={12} style={{ color: content.colors.accent }} className="shrink-0" />
                  <a
                    href={`tel:${p.number.replace(/\s/g, '')}`}
                    className="font-mono-display text-sm"
                    style={{ color: `${content.colors.muted}bb` }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = content.colors.text)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = `${content.colors.muted}bb`)}
                  >
                    {p.number}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <Mail size={12} style={{ color: content.colors.accent }} className="shrink-0 mt-1" />
                <a
                  href={`mailto:${content.contact.email}`}
                  className="text-xs sm:text-sm break-all"
                  style={{ color: `${content.colors.muted}bb` }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = content.colors.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = `${content.colors.muted}bb`)}
                >
                  {content.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={12} style={{ color: content.colors.accent }} className="shrink-0 mt-1" />
                <span className="text-xs sm:text-sm" style={{ color: `${content.colors.muted}bb` }}>
                  {content.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t"
          style={{ borderColor: `${content.colors.text}08` }}
        >
          <p className="font-mono-display text-xs" style={{ color: `${content.colors.muted}70` }}>
            © {year} Irmak Transport GmbH
          </p>
          <div className="flex gap-5">
            {['Impressum', 'Datenschutz'].map((l) => (
              <a
                key={l}
                href="#"
                className="font-mono-display text-xs min-h-[36px] flex items-center transition-colors"
                style={{ color: `${content.colors.muted}70` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = content.colors.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = `${content.colors.muted}70`)}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating call button — mobile only, 56px = touch-safe */}
      {/* Positioned above the fold edge so it doesn't overlap important content */}
      <motion.a
        href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
        className="fixed bottom-5 right-4 sm:hidden w-14 h-14 rounded-full flex items-center justify-center z-50"
        style={{
          backgroundColor: content.colors.accent,
          boxShadow: `0 4px 24px ${content.colors.accent}65`,
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        aria-label="Anrufen"
      >
        <Phone size={22} color={isKranken ? '#fff' : '#000'} />
      </motion.a>
    </footer>
  );
}
