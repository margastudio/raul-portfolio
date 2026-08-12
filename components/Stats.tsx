'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import RevealOnScroll from './RevealOnScroll';

const BRAND_LOGOS = [
  '/images/brands/brand-1.png',
  '/images/brands/brand-2.png',
  '/images/brands/brand-3.png',
  '/images/brands/brand-4.png',
  '/images/brands/brand-5.png',
  '/images/brands/brand-6.png',
  '/images/brands/brand-7.png',
  '/images/brands/brand-8.png',
  '/images/brands/brand-9.png',
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 1.6, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Stats() {
  const t = useTranslations('stats');

  const stats = [
    { key: 'countries', value: 15 },
    { key: 'years', value: 26 },
    { key: 'awards', value: 4 },
    { key: 'brands', value: 40 },
  ];

  return (
    <section className="container-px py-24 border-t border-white/5">
      <RevealOnScroll className="text-center">
        <h3 className="font-display text-2xl md:text-3xl">{t('title')}</h3>
      </RevealOnScroll>

      {/* Logo marquee - reemplazar por logos reales en /public/images/brands */}
      <RevealOnScroll delay={0.15} className="mt-14 overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-70 grayscale">
          {BRAND_LOGOS.map((src, i) => (
            <img key={i} src={src} alt="Brand logo" className="h-8 md:h-10 w-auto object-contain" />
          ))}
        </div>
      </RevealOnScroll>

      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((s, i) => (
          <RevealOnScroll key={s.key} delay={i * 0.1}>
            <div className="font-display text-4xl md:text-6xl text-accent">
              <Counter to={s.value} />+
            </div>
            <p className="mt-3 text-xs tracking-widest2 uppercase text-foreground/60">{t(s.key)}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
