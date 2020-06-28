import {
  Action,
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as AppAction from '../actions';
import { Filters, FiltersDto } from '../shared';

export const appFeatureKey = 'app';

export interface State {
  filters: FiltersDto;
  selectedItemId: string;
}

export const initialState: State = {
  filters: {},
  selectedItemId: ''
};

export const appReducer = createReducer(
  initialState,

  on(AppAction.setSearch, (state: State, { search }: { search: string }) => {
    const filters = {
      ...state.filters,
      search
    };

    if (search === '') {
      delete filters.search;
    }

    return {
      ...state,
      filters
    };
  }),
  on(AppAction.setYear, (state: State, { year }: { year: number }) => ({
    ...state,
    filters: { ...state.filters, year }
  })),
  on(AppAction.setGenre, (state: State, { genre }: { genre: string }) => ({
    ...state,
    filters: { ...state.filters, genre }
  })),
  on(AppAction.setType, (state: State, { itemType }: { itemType: string }) => ({
    ...state,
    filters: { ...state.filters, type: itemType }
  })),

  on(AppAction.resetFilters, (state: State) => ({
    ...state,
    filters: {}
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
