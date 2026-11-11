import fs from 'fs';
import path from 'path';

/** Lee las fotos reales de un álbum desde public/images/albums/{slug}/ */
export function getAlbumPhotos(slug: string): string[] {
  const dir = path.join(process.cwd(), 'public', 'images', 'albums', slug);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/images/albums/${slug}/${f}`);
  } catch {
    return [];
  }
}
