import { useStore } from '@nanostores/react';
import { Link } from 'react-router-dom';
import { useApiList } from '../hooks/useApiList';
import { bookService } from '../services/book.service';
import { favouriteIds } from '../stores/favourites';
import { FavouriteButton } from './FavouriteButton';

export function FavouritesList() {
  const ids = useStore(favouriteIds);
  const { items: books, loading, error } = useApiList(bookService.getBooks);
  const favourites = books.filter((book) => ids.includes(book._id));

  return (
    <>
      <div className="page-header">
        <h1>Favoritos</h1>
        <Link className="button secondary" to="/books">Ver todos los libros</Link>
      </div>
      {loading && <p className="muted">Cargando...</p>}
      {error && <p className="alert">{error}</p>}
      {!loading && !error && (
        <>
          {favourites.length === 0 && <p className="muted">Todavía no tienes libros favoritos.</p>}
          <div className="cards">
            {favourites.map((book) => (
              <article className="card" key={book._id}>
                <div className="card-body">
                  <h3>{book.title}</h3>
                  <span className="muted">
                    {book.authors.map((author) => author.name).join(', ') || 'Sin autores'}
                  </span>
                  {book.description && <p className="card-text">{book.description}</p>}
                </div>
                <div className="card-actions">
                  <FavouriteButton bookId={book._id} />
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </>
  );
}
