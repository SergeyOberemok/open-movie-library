import { createAction, props } from '@ngrx/store';

export const setSearch = createAction(
  '[App] Set Search',
  props<{ search: string }>()
);

export const setYear = createAction(
  '[App] Set Year',
  props<{ year: number }>()
);

export const setGenre = createAction(
  '[App] Set Genre',
  props<{ genre: string }>()
);

export const resetFilters = createAction(
  '[App] Reset Filters',
);

export const SetFilterSuccess = createAction('[App] Set Filter Success');
