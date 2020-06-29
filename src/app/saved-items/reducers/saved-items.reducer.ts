import { createReducer, on } from '@ngrx/store';
import { SavedItem } from '../shared';
import * as SavedItemsActions from '../actions';

export const savedItemsFeatureKey = 'savedItems';

export interface State {
  items: SavedItem[];
}

export const initialState: State = {
  items: []
};

export const reducer = createReducer(
  initialState,

  on(SavedItemsActions.AddItem, (state: State, { item }) => {
    const updatedState = {
      ...state,
      items: [...state.items]
    };
    const index = state.items.findIndex(
      (storedItem: SavedItem) => item.id === storedItem.id
    );

    if (index >= 0) {
      updatedState.items.splice(index, 1);
    } else {
      updatedState.items.push(item);
    }

    return updatedState;
  }),
  on(SavedItemsActions.RemoveItem, (state: State, { item }) => {
    const updatedState = {
      ...state,
      items: [...state.items]
    };
    const index = state.items.findIndex(
      (storedItem: SavedItem) => item.id === storedItem.id
    );

    if (index >= 0) {
      updatedState.items.splice(index, 1);
    }

    return updatedState;
  })
);
