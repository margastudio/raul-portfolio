import { setRequestLocale } from 'next-intl/server';
import AlbumsGrid from '@/components/AlbumsGrid';

export default async function AlbumsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-32">
      <AlbumsGrid />
    </div>
  );
}
