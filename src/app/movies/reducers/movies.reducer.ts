import { createReducer, on } from '@ngrx/store';
import * as MoviesAction from '../actions';
import { Movie } from '../shared';

export const moviesFeatureKey = 'movies';

export interface State {
  movies: Movie[];
}

const initialState: State = {
  movies: []
};

export const reducer = createReducer(
  initialState,

  on(MoviesAction.loadMovies, state => state),
  on(MoviesAction.loadMoviesSuccess, (state: State, { movies }) => ({
    ...state,
    movies
  })),
  on(MoviesAction.loadMoviesFailure, (state, action) => state)
);
