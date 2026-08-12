'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      // Envía a nuestro propio API route (app/api/contact/route.ts),
      // que reenvía el email por SMTP directo. No usa reCAPTCHA
      // ni ningún servicio de Google, para funcionar sin problemas en China.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-xl">
      <div>
        <label className="text-xs tracking-widest2 uppercase text-foreground/50">{t('form.name')}</label>
        <input
          name="name"
          required
          className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-base outline-none transition-colors focus:border-accent"
        />
      </div>
      <div>
        <label className="text-xs tracking-widest2 uppercase text-foreground/50">{t('form.email')}</label>
        <input
          type="email"
          name="email"
          required
          className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-base outline-none transition-colors focus:border-accent"
        />
      </div>
      <div>
        <label className="text-xs tracking-widest2 uppercase text-foreground/50">{t('form.message')}</label>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-base outline-none transition-colors focus:border-accent resize-none"
        />
      </div>

      <motion.button
        whileHover={{ opacity: 0.75 }}
        type="submit"
        disabled={status === 'sending'}
        className="mt-4 self-start border border-accent px-8 py-3 text-xs tracking-widest2 uppercase text-accent transition-opacity disabled:opacity-40"
      >
        {status === 'sending' ? '...' : t('form.submit')}
      </motion.button>

      {status === 'success' && <p className="text-sm text-accent">{t('form.success')}</p>}
      {status === 'error' && <p className="text-sm text-red-400">{t('form.error')}</p>}
    </form>
  );
}
