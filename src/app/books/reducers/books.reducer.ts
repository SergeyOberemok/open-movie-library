import { createReducer, on } from '@ngrx/store';
import * as BooksAction from '../actions/books.actions';
import { Book } from '../shared';

export const booksFeatureKey = 'books';

export interface State {
  books: Book[];
}

export const initialState: State = {
  books: []
};

export const reducer = createReducer(
  initialState,

  on(BooksAction.loadBooks, (state) => state),
  on(BooksAction.loadBooksSuccess, (state, { books }) => ({
    ...state,
    books
  })),
  on(BooksAction.loadBooksFailure, (state, action) => state)
);
