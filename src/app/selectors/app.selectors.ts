import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';

export const selectAppState = createFeatureSelector<fromApp.State>(
  fromApp.appFeatureKey
);

export const selectFilters = createSelector(
  selectAppState,
  (state: fromApp.State) =>
    Object.keys(state.filters).length > 0 ? state.filters : undefined
);

export const selectSelectedItemId = createSelector(
  selectAppState,
  (state: fromApp.State) => state.selectedItemId
);
