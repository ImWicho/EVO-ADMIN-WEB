/* eslint-disable no-underscore-dangle */
import { Action, createReducer, on } from '@ngrx/store';
import { IArea } from 'app/shared/interfaces/iconfig';
import { saveArea, saveAreas, unsetArea } from '../../actions/areas/areas.actions';

export interface State {
    areas: any;
    area: IArea | null;
}

export const initialState: State = {
   areas: [],
   area : null
};

const _areasReducerReducer = createReducer(initialState,

    on(saveAreas, (state, { data }) => ({ ...state, areas : data})),
    on(saveArea, (state, { data }) => ({ ...state, area: data})),
    on(unsetArea, (state) => ({ ...state, area: null})),
);

export const  areasReducerReducer = (state: any, action: Action) => _areasReducerReducer(state, action);
