import { combineReducers } from "@reduxjs/toolkit";
import { globalIdsReducer } from "@features/common/globalIds/globalIds.reducer";
import { confettiReducer } from "@features/common/confetti/confetti.reducer";
import { notifyReducer } from "@features/common/notify/notify.reducer";
import { themeReducers } from "@themes/store";

const baseReducers = {
  globalIds: globalIdsReducer,
  confetti: confettiReducer,
  notify: notifyReducer,
};

export const rootReducer = combineReducers({
  ...baseReducers,
  ...themeReducers,
});

export type RootState = ReturnType<typeof rootReducer>;
