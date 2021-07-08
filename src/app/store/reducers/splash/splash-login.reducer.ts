/* eslint-disable no-underscore-dangle */
import { Action, createReducer, on } from '@ngrx/store';
import {
  storeStep1,
  storeStep2,
  storeStep3,
  removeSplashConf,
  addInput,
  deleteInput,
  toggleRequiredInput,
  toggleFTInput,
  toggleEnableInput,
  splashes,
  deleteInputByName,
  toggleRequiredInputByName
} from '../../actions/splash/splash-login.actions';

export interface State {
  form: {
    step1: any;
    step2: any;
    step3: any;
    inputs: InputForm[];
  };
  splashes: any[];
}

export interface InputForm {
  id: number;
  type: string;
  name: string;
  values?: any[];
  enabled: boolean;
  required: boolean;
  footfall: boolean;
}

export const initialState: State = {
  form: {
    step1: null,
    step2: null,
    step3: null,
    inputs: []
  },
  splashes: []
};

const _splashLoginReducer = createReducer(
  initialState,
  on(storeStep1, (state, { data }) => ({ ...state, form: { ...state.form, step1: data } })),
  on(storeStep2, (state, { data }) => ({ ...state, form: { ...state.form, step2: data } })),
  on(storeStep3, (state, { data }) => ({ ...state, form: { ...state.form, step3: data } })),
  on(removeSplashConf, (state) => ({ ...state, form: { step1: null, step2: null, step3: null, inputs: [] } })),
  on(addInput, (state, { input }) => ({ ...state, form: { ...state.form, inputs: [...state.form.inputs, input] } })),
  on(deleteInput, (state, { id }) => ({ ...state, form: { ...state.form, inputs: state.form.inputs.filter(input => input.id !== id) } })),
  on(deleteInputByName, (state, { name }) => ({
    ...state, form: { ...state.form, inputs: state.form.inputs.filter(input => input.name !== name) }
  })),
  on(toggleRequiredInput, (state, { id }) => ({
    ...state,
    form: {
      ...state.form,
      inputs: state.form.inputs.map(input => {
        if (input.id === id) {
          return {
            ...input,
            required: !input.required
          };
        } else {
          return input;
        }
      })
    }
  })),
  on(toggleRequiredInputByName, (state, { name }) => ({
    ...state,
    form: {
      ...state.form,
      inputs: state.form.inputs.map(input => {
        if (input.name === name) {
          return {
            ...input,
            required: !input.required
          };
        } else {
          return input;
        }
      })
    }
  })),
  on(toggleFTInput, (state, { id }) => ({
    ...state,
    form: {
      ...state.form,
      inputs: state.form.inputs.map(input => {
        if (input.id === id) {
          return {
            ...input,
            footfall: !input.footfall
          };
        } else {
          return input;
        }
      })
    }
  })),
  on(toggleEnableInput, (state, { id }) => ({
    ...state,
    form: {
      ...state.form,
      inputs: state.form.inputs.map(input => {
        if (input.id === id) {
          return {
            ...input,
            enabled: !input.enabled
          };
        } else {
          return input;
        }
      })
    }
  })),
  on(splashes, (state, { data }) => ({ ...state, splashes: data }))
);

export const splashLoginReducer = (state: any, action: Action) => _splashLoginReducer(state, action);
