import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="container-px pt-40 pb-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl md:text-6xl">{t('title')}</h1>
        <p className="mt-4 text-base text-foreground/60">{t('subtitle')}</p>

        <div className="mt-14">
          <ContactForm />
        </div>

        <p className="mt-10 text-sm text-foreground/50">
          {t('directEmail')}{' '}
          <a href="mailto:shiningtigers@gmail.com" className="text-accent hover:opacity-70 transition-opacity">
            shiningtigers@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
