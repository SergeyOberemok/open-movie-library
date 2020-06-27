import {
  Action,
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as AppAction from '../actions';
import { Filters } from '../shared';

export const appFeatureKey = 'app';

export interface State {
  filters: Filters;
  selectedItemId: string;
}

export const initialState: State = {
  filters: new Filters(),
  selectedItemId: ''
};

export const appReducer = createReducer(
  initialState,

  on(AppAction.setSearch, (state: State, { search }: { search: string }) => ({
    ...state,
    filters: new Filters({ ...state.filters, search })
  })),
  on(AppAction.setYear, (state: State, { year }: { year: number }) => ({
    ...state,
    filters: new Filters({ ...state.filters, year })
  })),
  on(AppAction.setGenre, (state: State, { genre }: { genre: string }) => ({
    ...state,
    filters: new Filters({ ...state.filters, genre })
  })),

  on(AppAction.resetFilters, (state: State) => ({
    ...state,
    filters: new Filters()
  })),

  on(AppAction.setSelectedItemId, (state: State, { id }: { id: string }) => ({
    ...state,
    selectedItemId: id
  })),
  on(AppAction.resetSelectedItemId, (state: State) => ({
    ...state,
    selectedItemId: ''
  }))
);

export function reducer(state: State, action: Action): State {
  return appReducer(state, action);
}

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  app: reducer
};

export const metaReducers: Array<MetaReducer<
  AppState
>> = !environment.production ? [] : [];
