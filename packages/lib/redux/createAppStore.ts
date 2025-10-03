import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@lib/redux/rootReducer";
import { Dependencies } from "@pro/lib/dependencies";

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
