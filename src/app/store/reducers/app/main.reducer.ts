/* eslint-disable no-underscore-dangle */
import { Action, createReducer, on } from '@ngrx/store';
import { isSmall, isLoading, stopLoading } from 'app/store/actions/app/main.actions';

export interface State{
  isSmall: boolean;
  isLoading: boolean;
}

export const initialState: State = {
  isSmall: false,
  isLoading: false
};

const _isSmallReducer = createReducer(
  initialState,
  on(isSmall, (state, { flag }) => ({...state, isSmall: flag})),
  on(isLoading, (state) => ({...state, isLoading: true})),
  on(stopLoading, (state) => ({...state, isLoading: false})),
);


export const  isSmallReducer = (state: any, action: Action) => _isSmallReducer(state, action);
