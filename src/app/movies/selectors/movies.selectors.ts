import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMovies from '../reducers';

export const selectMoviesState = createFeatureSelector<fromMovies.State>(
  fromMovies.moviesFeatureKey
);

export const selectMovies = createSelector(
  selectMoviesState,
  (state: fromMovies.State) => state.movies
);
