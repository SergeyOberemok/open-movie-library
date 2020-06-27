import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMovies from '../reducers';
import { Movie } from '../shared';

export const selectMoviesState = createFeatureSelector<fromMovies.State>(
  fromMovies.moviesFeatureKey
);

export const selectMovies = createSelector(
  selectMoviesState,
  (state: fromMovies.State) => state.movies
);

export const selectMovieById = createSelector(
  selectMoviesState,
  (state: fromMovies.State, { id }: { id: string }) =>
    state.movies.find((movie: Movie) => movie.id === id)
);
