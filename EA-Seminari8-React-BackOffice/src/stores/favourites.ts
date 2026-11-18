import { atom } from 'nanostores';

// Compartimos los ids; los datos de cada libro se siguen leyendo de la API.
export const favouriteIds = atom<string[]>([]);

export function removeFavourite(id: string) {
  favouriteIds.set(favouriteIds.get().filter((bookId) => bookId !== id));
}

export function toggleFavourite(id: string) {
  const ids = favouriteIds.get();
  if (ids.includes(id)) {
    removeFavourite(id);
  } else {
    favouriteIds.set([...ids, id]);
  }
}
