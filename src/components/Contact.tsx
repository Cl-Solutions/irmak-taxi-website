import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, ChevronRight, MessageCircle } from 'lucide-react';
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

  const waNumber = isKranken ? '4907041816743' : '490725294940';
  const phoneRaw = isKranken ? '07041816743' : '0725294940';

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 lg:py-28 relative"
      style={{ backgroundColor: content.colors.secondary }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="font-mono-display text-xs tracking-widest uppercase mb-3 block"
            style={{ color: content.colors.accent }}
          >
            — Kontakt & Buchung
          </span>
          <h2
            className="font-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ color: content.colors.text }}
          >
            Wir sind für Sie da
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Left — call + info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Prominent hours banner ── */}
            <div
              className="flex items-center gap-3 p-4 rounded-2xl mb-5 sm:mb-6 border"
              style={{
                backgroundColor: `${content.colors.accent}12`,
                borderColor: `${content.colors.accent}30`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${content.colors.accent}20` }}
              >
                <Clock size={18} style={{ color: content.colors.accent }} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: content.colors.muted }}>
                  Erreichbarkeit
                </div>
                <div className="font-grotesk font-bold text-base" style={{ color: content.colors.text }}>
                  {content.contact.hours}
                </div>
              </div>
              <motion.div
                className="ml-auto w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: '#22c55e' }}
                animate={{ opacity: [1, 0.25, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <p
              className="font-mono-display text-xs tracking-widest uppercase mb-4"
              style={{ color: content.colors.muted }}
            >
              Telefon
            </p>

            {/* Phone cards */}
            <div className="flex flex-col gap-3 mb-4">
              {content.contact.phones.map((phone, i) => (
                <motion.a
                  key={phone.number}
                  href={`tel:${phone.number.replace(/\s/g, '')}`}
                  className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl border min-h-[72px] relative overflow-hidden"
                  style={{
                    backgroundColor: i === 0 ? `${content.colors.accent}12` : content.colors.surface,
                    borderColor: i === 0 ? `${content.colors.accent}35` : `${content.colors.text}08`,
                  }}
                  whileHover={{ borderColor: `${content.colors.accent}60` }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* Pulsing ring for primary number */}
                  {i === 0 && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ border: `2px solid ${content.colors.accent}` }}
                      animate={{ opacity: [0.25, 0, 0.25], scale: [1, 1.02, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  )}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative"
                    style={{ backgroundColor: `${content.colors.accent}20` }}
                  >
                    <Phone size={18} style={{ color: content.colors.accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs mb-0.5" style={{ color: content.colors.muted }}>
                      {phone.label}
                    </div>
                    <div
                      className="font-mono-display font-bold text-lg sm:text-xl tracking-tight"
                      style={{ color: content.colors.text }}
                    >
                      {phone.number}
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    style={{ color: content.colors.accent }}
                  />
                </motion.a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl border mb-5 sm:mb-6 min-h-[56px] font-bold font-grotesk text-sm"
              style={{
                backgroundColor: 'rgba(37,211,102,0.08)',
                borderColor: 'rgba(37,211,102,0.25)',
                color: '#25d366',
              }}
              whileHover={{ backgroundColor: 'rgba(37,211,102,0.14)', scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={18} />
              WhatsApp schreiben
            </motion.a>

            {/* Info rows */}
            <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
              {[
                { Icon: Mail, label: 'E-Mail', value: content.contact.email },
                { Icon: MapPin, label: 'Adresse', value: content.contact.address },
              ].map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl"
                  style={{ backgroundColor: `${content.colors.surface}70` }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${content.colors.accent}15` }}
                  >
                    <Icon size={14} style={{ color: content.colors.accent }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold mb-0.5" style={{ color: content.colors.muted }}>
                      {label}
                    </div>
                    <div className="text-sm font-medium break-words" style={{ color: content.colors.text }}>
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="p-5 sm:p-7 lg:p-8 rounded-2xl border"
              style={{
                backgroundColor: content.colors.surface,
                borderColor: `${content.colors.text}0a`,
              }}
            >
              <h3
                className="font-grotesk text-lg sm:text-xl font-bold mb-1"
                style={{ color: content.colors.text }}
              >
                Rückruf anfordern
              </h3>
              <p className="text-sm mb-6" style={{ color: content.colors.muted }}>
                Wir melden uns so schnell wie möglich bei Ihnen.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { id: 'name', label: 'Ihr Name', type: 'text', placeholder: 'Max Mustermann' },
                  { id: 'phone', label: 'Telefonnummer', type: 'tel', placeholder: '07252 123456' },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-xs font-bold tracking-wide uppercase mb-2"
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
                      className="w-full px-4 py-3.5 rounded-xl border outline-none text-sm font-grotesk transition-all min-h-[48px]"
                      style={{
                        backgroundColor: content.colors.bg,
                        borderColor: `${content.colors.text}12`,
                        color: content.colors.text,
                      }}
                      onFocus={(e) => (e.target.style.borderColor = content.colors.accent)}
                      onBlur={(e) => (e.target.style.borderColor = `${content.colors.text}12`)}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold tracking-wide uppercase mb-2"
                    style={{ color: content.colors.muted }}
                  >
                    Nachricht (optional)
                  </label>
                  <textarea
                    id="message"
                    placeholder={
                      isKranken
                        ? 'Art der Fahrt, Datum, Anforderungen...'
                        : 'Ziel, Datum, Uhrzeit, Personen...'
                    }
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border outline-none text-sm font-grotesk resize-none transition-all"
                    style={{
                      backgroundColor: content.colors.bg,
                      borderColor: `${content.colors.text}12`,
                      color: content.colors.text,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = content.colors.accent)}
                    onBlur={(e) => (e.target.style.borderColor = `${content.colors.text}12`)}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold font-grotesk text-sm mt-1 min-h-[52px]"
                  style={{
                    backgroundColor: content.colors.accent,
                    color: isKranken ? '#fff' : '#000',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {sent ? '✓ Anfrage gesendet!' : <><Send size={15} /> Rückruf anfordern</>}
                </motion.button>

                {/* Quick call alternative */}
                <p className="text-center text-xs" style={{ color: content.colors.muted }}>
                  Oder direkt anrufen:{' '}
                  <a
                    href={`tel:${phoneRaw}`}
                    className="font-bold"
                    style={{ color: content.colors.accent }}
                  >
                    {content.contact.phones[0].number}
                  </a>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
