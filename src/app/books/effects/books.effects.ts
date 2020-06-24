import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as BooksAction from '../actions/books.actions';
import { BooksService } from '../services/books.service';
import { Book } from '../shared';

@Injectable()
export class BooksEffects {
  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksAction.loadBooks),
      concatMap(() =>
        this.booksService.fetchBooks().pipe(
          map((books: Book[]) => BooksAction.loadBooksSuccess({ books })),
          catchError((error) => of(BooksAction.loadBooksFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private booksService: BooksService) {}
}
