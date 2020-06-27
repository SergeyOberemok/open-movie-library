import { createAction, props } from '@ngrx/store';

export const setSearch = createAction(
  '[App] Set Search',
  props<{ search: string }>()
);

export const SetFilterSuccess = createAction('[App] Set Filter Success');
