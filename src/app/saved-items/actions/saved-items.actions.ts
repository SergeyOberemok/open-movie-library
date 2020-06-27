import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/movies/shared';
import { Book } from 'src/app/books/shared';

export const AddItem = createAction(
  '[SavedItems] Add Item',
  props<{ item: Movie | Book }>()
);
