import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';
import * as fromApp from 'src/app/reducers';
import { selectFilters } from 'src/app/selectors';
import { Filters } from 'src/app/shared';
import * as BooksAction from '../actions/books.actions';
import { BooksService } from '../services/books.service';
import { Book } from '../shared';

@Injectable()
export class BooksEffects {
  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksAction.loadBooks),
      withLatestFrom(this.store.pipe(select(selectFilters))),
      concatMap(([action, filters]: [Action, Filters]) =>
        this.booksService.fetchBooks(filters).pipe(
          map((books: Book[]) => BooksAction.loadBooksSuccess({ books })),
          catchError((error) => of(BooksAction.loadBooksFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private store: Store<fromApp.State>
  ) {}
}
