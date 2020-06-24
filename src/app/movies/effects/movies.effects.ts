import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as MoviesAction from '../actions/movies.actions';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../shared';

@Injectable()
export class MoviesEffects {
  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesAction.loadMovies),
      concatMap(() =>
        this.moviesService.fetchMovies().pipe(
          map((movies: Movie[]) => MoviesAction.loadMoviesSuccess({ movies })),
          catchError((error) => of(MoviesAction.loadMoviesFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}
