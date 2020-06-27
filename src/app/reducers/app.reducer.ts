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
}

export const initialState: State = {
  filters: new Filters()
};

export const appReducer = createReducer(
  initialState,

  on(AppAction.setSearch, (state: State, { search }: { search: string }) => ({
    ...state,
    filters: new Filters({ ...state.filters, search })
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
