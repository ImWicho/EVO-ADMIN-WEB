import { createAction, props } from '@ngrx/store';

export const saveAreas = createAction(
  '[Save Areas] saveAreas',
  props<{ data: any}>()
  );


  export const saveArea = createAction(
    '[Save Area] saveArea',
    props<{ data: any}>()
  );

  export const unsetArea = createAction(
    '[Unset Area] unsetArea',
  );
