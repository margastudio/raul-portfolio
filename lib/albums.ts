// Metadatos de álbumes que no dependen del idioma.

export type CategoryKey =
  | 'fashion'
  | 'commercial'
  | 'editorial'
  | 'film'
  | 'lifestyle'
  | 'portraits'
  | 'music';

// Orden en que se muestran los filtros (solo aparecen los que tienen álbumes).
export const FILTER_ORDER: CategoryKey[] = [
  'fashion',
  'commercial',
  'editorial',
  'film',
  'lifestyle',
  'portraits',
  'music',
];

// PROVISIONAL: agrupación derivada de los tags actuales de cada álbum.
// Raul debe confirmar las categorías finales.
export const ALBUM_CATEGORIES: Record<string, CategoryKey[]> = {
  'italy-milano': ['editorial', 'commercial'],
  polo: ['fashion', 'commercial'],
  business: ['editorial', 'commercial'],
  acting: ['film'],
  yoga: ['lifestyle'],
  pijama: ['lifestyle', 'commercial'],
  underwear: ['portraits', 'fashion'],
  modelcards: ['portraits'],
  'casual-ropa': ['lifestyle', 'commercial'],
  hiking: ['lifestyle'],
  polaroid: ['portraits'],
  surf: ['lifestyle'],
  dj: ['music'],
  'TVC-VIDEOS': ['commercial', 'film'],
  tvc: ['commercial', 'film'],
};

// Selección curada para el Home (orden importa).
export const FEATURED_ALBUMS = [
  'italy-milano',
  'polo',
  'business',
  'acting',
  'underwear',
  'modelcards',
];

export const ALBUM_SLUGS = Object.keys(ALBUM_CATEGORIES);
