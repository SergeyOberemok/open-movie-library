import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBooks from '../reducers/books.reducer';

export const selectBooksState = createFeatureSelector<fromBooks.State>(
  fromBooks.booksFeatureKey
);

export const selectBooks = createSelector(
  selectBooksState,
  (state: fromBooks.State) => state.books
);
