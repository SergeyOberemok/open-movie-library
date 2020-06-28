import { createAction, props } from '@ngrx/store';
import { SavedItem } from '../shared';

export const AddItem = createAction(
  '[SavedItems] Add Item',
  props<{ item: SavedItem }>()
);

export const RemoveItem = createAction(
  '[SavedItems] Remove Item',
  props<{ item: SavedItem }>()
);
