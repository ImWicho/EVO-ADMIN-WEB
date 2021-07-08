import { createAction, props } from '@ngrx/store';
import { InputForm } from 'app/store/reducers/splash/splash-login.reducer';

export const storeStep1 = createAction(
  '[Splash login] step 1',
  props<{ data: any }>()
);

export const storeStep2 = createAction(
  '[Splash login] step 2',
  props<{ data: any }>()
);

export const storeStep3 = createAction(
  '[Splash login] step 3',
  props<{ data: any }>()
);

export const removeSplashConf = createAction(
  '[Splash login] remove'
);

export const addInput = createAction(
  '[Splash login] addInput',
  props<{ input: InputForm}>()
);

export const deleteInput = createAction(
  '[Splash login] deleteInput',
  props<{ id: number}>()
);

export const deleteInputByName = createAction(
  '[Splash login] deleteInput',
  props<{ name: string}>()
);

export const toggleRequiredInput = createAction(
  '[Splash login] updateInput Required',
  props<{ id: number}>()
);

export const toggleRequiredInputByName = createAction(
  '[Splash login] updateInput Required',
  props<{ name: string}>()
);

export const toggleFTInput = createAction(
  '[Splash login] updateInput Footfall',
  props<{ id: number}>()
);

export const toggleEnableInput = createAction(
  '[Splash login] updateInput Enable',
  props<{ id: number}>()
);

export const splashes = createAction(
  '[Splashes] splashes',
  props<{ data: any }>()
);
