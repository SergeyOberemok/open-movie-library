import { Action, createReducer, on } from '@ngrx/store';
import * as SavedItemsActions from '../actions';
import { Movie } from 'src/app/movies/shared';
import { Book } from 'src/app/books/shared';

export const savedItemsFeatureKey = 'savedItems';

export interface State {
  items: Movie[] | Book[];
}

export const initialState: State = {
  items: []
};

export const reducer = createReducer(
  initialState,

  on(SavedItemsActions.AddItem, (state: State, { item }) => ({
    ...state,
    items: [...state.items, item]
  }))
);
