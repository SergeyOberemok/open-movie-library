import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as AppAction from '../actions';

@Injectable()
export class AppEffects {
  setFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppAction.setSearch, AppAction.setYear, AppAction.setGenre),
      mergeMap(() => of(AppAction.SetFilterSuccess()))
    );
  });

  constructor(private actions$: Actions) {}
}
