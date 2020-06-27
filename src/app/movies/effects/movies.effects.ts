import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';
import * as fromApp from 'src/app/reducers';
import { selectFilters } from 'src/app/selectors';
import { Filters } from 'src/app/shared';
import * as MoviesAction from '../actions/movies.actions';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../shared';

@Injectable()
export class MoviesEffects {
  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesAction.loadMovies),
      withLatestFrom(this.store.pipe(select(selectFilters))),
      concatMap(([action, filters]: [Action, Filters]) =>
        this.moviesService.fetchMovies(filters).pipe(
          map((movies: Movie[]) => MoviesAction.loadMoviesSuccess({ movies })),
          catchError((error) => of(MoviesAction.loadMoviesFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private store: Store<fromApp.State>
  ) {}
}
