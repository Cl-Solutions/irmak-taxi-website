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
        backgroundColor: content.colors.secondary,
        borderColor: `${content.colors.text}10`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: content.colors.accent }}
              >
                {isKranken ? (
                  <Heart size={20} color="#fff" strokeWidth={2.5} />
                ) : (
                  <Car size={20} color="#000" strokeWidth={2.5} />
                )}
              </div>
              <div>
                <p className="font-black text-base" style={{ color: content.colors.text }}>
                  Irmak Transport GmbH
                </p>
                <p className="text-xs" style={{ color: content.colors.muted }}>
                  {isKranken ? 'Krankenfahrten Irmak' : 'Maxi Car & Enz Taxi GmbH'}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: content.colors.muted }}>
              {isKranken
                ? 'Ihr zuverlässiger Partner für medizinische Fahrten im Enzkreis und Kraichgau seit 2010.'
                : 'Ihr Taxi- und Transferservice in Bretten, Oberderdingen und Vaihingen/Enz. Gegründet 2016.'}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-bold text-sm mb-4 tracking-wide"
              style={{ color: content.colors.text }}
            >
              Leistungen
            </h4>
            <ul className="flex flex-col gap-2">
              {content.services.slice(0, 4).map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-sm transition-colors"
                    style={{ color: content.colors.muted }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = content.colors.accent)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = content.colors.muted)
                    }
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold text-sm mb-4 tracking-wide"
              style={{ color: content.colors.text }}
            >
              Kontakt
            </h4>
            <ul className="flex flex-col gap-3">
              {content.contact.phones.map((p) => (
                <li key={p.number} className="flex items-center gap-2">
                  <Phone size={13} style={{ color: content.colors.accent }} />
                  <a
                    href={`tel:${p.number.replace(/\s/g, '')}`}
                    className="text-sm"
                    style={{ color: content.colors.muted }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = content.colors.text)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = content.colors.muted)
                    }
                  >
                    {p.number}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Mail size={13} style={{ color: content.colors.accent }} />
                <a
                  href={`mailto:${content.contact.email}`}
                  className="text-sm break-all"
                  style={{ color: content.colors.muted }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = content.colors.text)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = content.colors.muted)
                  }
                >
                  {content.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} style={{ color: content.colors.accent, marginTop: 2 }} />
                <span className="text-sm" style={{ color: content.colors.muted }}>
                  {content.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 mt-8 border-t text-xs"
          style={{
            borderColor: `${content.colors.text}10`,
            color: content.colors.muted,
          }}
        >
          <p>© {year} Irmak Transport GmbH. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-80 transition-opacity">Impressum</a>
            <a href="#" className="hover:opacity-80 transition-opacity">Datenschutz</a>
          </div>
        </div>
      </div>

      {/* Floating phone button (mobile) */}
      <motion.a
        href={`tel:${isKranken ? '07041816743' : '0725294940'}`}
        className="fixed bottom-6 right-6 sm:hidden w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-50"
        style={{
          backgroundColor: content.colors.accent,
          boxShadow: `0 8px 24px ${content.colors.accent}60`,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Phone size={22} color={isKranken ? '#fff' : '#000'} />
      </motion.a>
    </footer>
  );
}
