import { ActionReducerMap } from '@ngrx/store';
import * as main from './store/reducers/app/main.reducer';
import * as splash from './store/reducers/splash/splash-login.reducer';
import * as areas from './store/reducers/areas/areas.reducers';

export interface AppState{
  main: main.State;
  splashConf: splash.State;
  spaces: areas.State;
}


export const appReducers: ActionReducerMap<AppState> = {
  main: main.isSmallReducer,
  splashConf: splash.splashLoginReducer,
  spaces: areas.areasReducerReducer
};
