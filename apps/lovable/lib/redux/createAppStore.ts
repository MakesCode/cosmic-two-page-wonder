import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../../../../packages/lib/redux/rootReducer';
import { Dependencies } from './dependencies';

export const createAppStore = (dependencies: Dependencies, preloadedState = undefined) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
  });
};
