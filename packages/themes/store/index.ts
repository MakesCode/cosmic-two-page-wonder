import {
  getPersistedThemeEditorState,
  persistThemeEditorState,
  themeEditorReducer,
  ThemeEditorSliceState,
} from "./editor-slice";
import { themePresetReducer, ThemePresetSliceState } from "./theme-preset-slice";

export const themeReducers = {
  themeEditor: themeEditorReducer,
  themePresets: themePresetReducer,
};

export const reducer = themeReducers;

export type ThemeSliceState = {
  themeEditor: ThemeEditorSliceState;
  themePresets: ThemePresetSliceState;
};

export const buildThemePreloadedState = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const editorState = getPersistedThemeEditorState();
  if (!editorState) {
    return undefined;
  }

  return {
    themeEditor: editorState,
  };
};

type SubscribableStore = {
  getState: () => {
    themeEditor?: ThemeEditorSliceState;
  };
  subscribe: (listener: () => void) => () => void;
};

export const initializeThemePersistence = (store: SubscribableStore) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  let lastPersisted = store.getState().themeEditor?.themeState;

  return store.subscribe(() => {
    const nextState = store.getState().themeEditor?.themeState;
    if (!nextState || nextState === lastPersisted) {
      return;
    }

    lastPersisted = nextState;
    persistThemeEditorState(nextState);
  });
};

export const buildPreloadedState = buildThemePreloadedState;
