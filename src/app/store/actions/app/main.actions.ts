import { createAction, props } from '@ngrx/store';

export const isSmall = createAction(
  '[isSmall] change',
  props<{ flag: boolean }>()
);

export const isLoading = createAction(
  '[Loading] isLoading'
);

export const stopLoading = createAction(
  '[Loading] stopLoading'
);
