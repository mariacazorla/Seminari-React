import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { bookService } from '../services/book.service';
import { favouriteIds } from '../stores/favourites';
import { FavouriteButton } from './FavouriteButton';
import { FavouritesList } from './FavouritesList';

vi.mock('../services/book.service', () => ({
  bookService: { getBooks: vi.fn() },
}));

beforeEach(() => {
  favouriteIds.set([]);
  vi.mocked(bookService.getBooks).mockResolvedValue([
    { _id: '1', title: 'El petit príncep', isbn: '123', authors: [] },
    { _id: '2', title: 'Tirant lo Blanc', isbn: '456', authors: [] },
  ]);
});

afterEach(cleanup);

test('el botón y la lista comparten favoritos y permiten quitarlos desde la lista', async () => {
  render(
    <MemoryRouter>
      <FavouriteButton bookId="1" />
      <FavouritesList />
    </MemoryRouter>,
  );
  await screen.findByText('Todavía no tienes libros favoritos.');
  fireEvent.click(screen.getByRole('button', { name: /Añadir a favoritos/ }));
  expect(screen.getByRole('heading', { name: 'El petit príncep' })).toBeTruthy();
  expect(screen.queryByRole('heading', { name: 'Tirant lo Blanc' })).toBeNull();
  expect(favouriteIds.get()).toEqual(['1']);
  const buttons = screen.getAllByRole('button', { name: /Quitar de favoritos/ });
  expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
  fireEvent.click(buttons[1]);
  expect(screen.queryByRole('heading', { name: 'El petit príncep' })).toBeNull();
  expect(screen.getByText('Todavía no tienes libros favoritos.')).toBeTruthy();
  expect(screen.getByRole('button', { name: /Añadir a favoritos/ }).getAttribute('aria-pressed')).toBe('false');
  expect(favouriteIds.get()).toEqual([]);
});
