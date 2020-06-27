import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBooks from '../reducers/books.reducer';
import { Book } from '../shared';

export const selectBooksState = createFeatureSelector<fromBooks.State>(
  fromBooks.booksFeatureKey
);

export const selectBooks = createSelector(
  selectBooksState,
  (state: fromBooks.State) => state.books
);

export const selectBookById = createSelector(
  selectBooksState,
  (state: fromBooks.State, { id }: { id: string }) =>
    state.books.find((book: Book) => book.id === id)
);
