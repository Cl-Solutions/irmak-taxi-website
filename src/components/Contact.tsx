import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import type { Mode, ModeContent } from '../types';

interface ContactProps {
  mode: Mode;
  content: ModeContent;
}

export default function Contact({ mode, content }: ContactProps) {
  const isKranken = mode === 'krankenfahrten';
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: content.colors.bg }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              backgroundColor: `${content.colors.accent}15`,
              color: content.colors.accent,
            }}
          >
            Kontakt & Buchung
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ color: content.colors.text }}
          >
            Wir sind für Sie da
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: content.colors.muted }}>
            {isKranken
              ? 'Zögern Sie nicht — rufen Sie uns an oder schreiben Sie uns.'
              : 'Rufen Sie uns an oder senden Sie uns eine Nachricht.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Phone numbers — prominent */}
            <div className="mb-8">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: content.colors.muted }}
              >
                Telefon
              </p>
              <div className="flex flex-col gap-3">
                {content.contact.phones.map((phone) => (
                  <motion.a
                    key={phone.number}
                    href={`tel:${phone.number.replace(/\s/g, '')}`}
                    className="flex items-center gap-4 p-5 rounded-2xl border group"
                    style={{
                      backgroundColor: content.colors.surface,
                      borderColor: `${content.colors.text}10`,
                    }}
                    whileHover={{
                      borderColor: `${content.colors.accent}50`,
                      x: 4,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${content.colors.accent}20` }}
                    >
                      <Phone size={20} style={{ color: content.colors.accent }} />
                    </div>
                    <div>
                      <div className="text-xs mb-0.5" style={{ color: content.colors.muted }}>
                        {phone.label}
                      </div>
                      <div
                        className="text-xl font-black tracking-tight"
                        style={{ color: content.colors.text }}
                      >
                        {phone.number}
                      </div>
                    </div>
                    <motion.div
                      className="ml-auto text-xs font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        backgroundColor: content.colors.accent,
                        color: isKranken ? '#fff' : '#000',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      Anrufen →
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Other contact details */}
            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, label: 'E-Mail', value: content.contact.email },
                { icon: MapPin, label: 'Adresse', value: content.contact.address },
                { icon: Clock, label: 'Öffnungszeiten', value: content.contact.hours },
              ].map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ backgroundColor: `${content.colors.surface}60` }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${content.colors.accent}15` }}
                  >
                    <Icon size={16} style={{ color: content.colors.accent }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-semibold mb-0.5"
                      style={{ color: content.colors.muted }}
                    >
                      {label}
                    </div>
                    <div className="text-sm font-medium" style={{ color: content.colors.text }}>
                      {value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="p-8 rounded-3xl border"
              style={{
                backgroundColor: content.colors.surface,
                borderColor: `${content.colors.text}10`,
              }}
            >
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: content.colors.text }}
              >
                Rückruf anfordern
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { id: 'name', label: 'Ihr Name', type: 'text', placeholder: 'Max Mustermann' },
                  {
                    id: 'phone',
                    label: 'Telefonnummer',
                    type: 'tel',
                    placeholder: '07252 123456',
                  },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-semibold mb-2"
                      style={{ color: content.colors.muted }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.id as 'name' | 'phone']}
                      onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 text-sm"
                      style={{
                        backgroundColor: `${content.colors.bg}80`,
                        borderColor: `${content.colors.text}15`,
                        color: content.colors.text,
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = content.colors.accent)
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = `${content.colors.text}15`)
                      }
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: content.colors.muted }}
                  >
                    Nachricht (optional)
                  </label>
                  <textarea
                    id="message"
                    placeholder={
                      isKranken
                        ? 'Art der Fahrt, Datum, besondere Anforderungen...'
                        : 'Ziel, Datum, Uhrzeit, Personenanzahl...'
                    }
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 text-sm resize-none"
                    style={{
                      backgroundColor: `${content.colors.bg}80`,
                      borderColor: `${content.colors.text}15`,
                      color: content.colors.text,
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = content.colors.accent)
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = `${content.colors.text}15`)
                    }
                  />
                </div>

                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm mt-2"
                  style={{
                    backgroundColor: content.colors.accent,
                    color: isKranken ? '#fff' : '#000',
                  }}
                  whileHover={{ scale: 1.02, opacity: 0.9 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {sent ? (
                    '✓ Anfrage gesendet!'
                  ) : (
                    <>
                      <Send size={16} />
                      Rückruf anfordern
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
