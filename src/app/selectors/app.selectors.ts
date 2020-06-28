import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import { Filters } from '../shared';

export const selectAppState = createFeatureSelector<fromApp.State>(
  fromApp.appFeatureKey
);

export const selectFilters = createSelector(
  selectAppState,
  (state: fromApp.State) =>
    Object.keys(state.filters).length > 0
      ? new Filters(state.filters)
      : undefined
);

export const selectSearchFilter = createSelector(
  selectAppState,
  (state: fromApp.State) => state.filters.search
);

export const selectSelectedItemId = createSelector(
  selectAppState,
  (state: fromApp.State) => state.selectedItemId
);
