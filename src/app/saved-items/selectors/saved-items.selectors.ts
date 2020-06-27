import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSavedItems from '../reducers/saved-items.reducer';

export const selectSavedItemsState = createFeatureSelector<fromSavedItems.State>(
  fromSavedItems.savedItemsFeatureKey
);

export const selectSavedItems = createSelector(
  selectSavedItemsState,
  (state: fromSavedItems.State) => state.items
);
