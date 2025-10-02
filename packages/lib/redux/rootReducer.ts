import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { globalIdsInitialStateModel, globalIdsReducer } from '../../features/common/globalIds/globalIds.reducer';
import { confettiInitialStateModel, confettiReducer } from '../../features/common/confetti/confetti.reducer';
import { notifyInitialStateModel, notifyReducer } from '../../features/common/notify/notify.reducer';

export type RootState = {
  globalIds: globalIdsInitialStateModel;
  confetti: confettiInitialStateModel;
  notify: notifyInitialStateModel;
};

export const rootReducer: Reducer<RootState> = combineReducers({
  globalIds: globalIdsReducer,
  confetti: confettiReducer,
  notify: notifyReducer,
});
