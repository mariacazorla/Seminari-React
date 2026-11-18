import { useStore } from '@nanostores/react';
import { favouriteIds, toggleFavourite } from '../stores/favourites';

interface FavouriteButtonProps {
  bookId: string;
}

export function FavouriteButton({ bookId }: FavouriteButtonProps) {
  const ids = useStore(favouriteIds);
  const isFavourite = ids.includes(bookId);

  return (
    <button
      type="button"
      className="secondary"
      aria-pressed={isFavourite}
      onClick={() => toggleFavourite(bookId)}
    >
      {isFavourite ? '★ Quitar de favoritos' : '☆ Añadir a favoritos'}
    </button>
  );
}
