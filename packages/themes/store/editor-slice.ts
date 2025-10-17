import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultThemeState } from "../config/theme";
import type { ThemeEditorState } from "../types/editor";
import type { ThemeStyles } from "../types/theme";

export const THEME_STORAGE_KEY = "editor-storage";

export interface ThemeEditorSliceState {
  themeState: ThemeEditorState;
}

const initialState: ThemeEditorSliceState = {
  themeState: defaultThemeState,
};

const themeEditorSlice = createSlice({
  name: "themeEditor",
  initialState,
  reducers: {
    replaceThemeState(state, action: PayloadAction<ThemeEditorState>) {
      state.themeState = action.payload;
    },
    setThemeMode(state, action: PayloadAction<"light" | "dark">) {
      state.themeState = { ...state.themeState, currentMode: action.payload };
    },
    setThemeStyles(state, action: PayloadAction<ThemeStyles>) {
      state.themeState = { ...state.themeState, styles: action.payload };
    },
  },
});

export const { replaceThemeState, setThemeMode, setThemeStyles } = themeEditorSlice.actions;
export const themeEditorReducer = themeEditorSlice.reducer;

export const getPersistedThemeEditorState = (): ThemeEditorSliceState | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    const themeState = parsed?.state?.themeState as ThemeEditorState | undefined;
    if (!themeState) {
      return null;
    }

    return { themeState };
  } catch (error) {
    console.warn("Failed to read persisted theme state:", error);
    return null;
  }
};

export const persistThemeEditorState = (state: ThemeEditorState) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const payload = JSON.stringify({ state: { themeState: state } });
    window.localStorage.setItem(THEME_STORAGE_KEY, payload);
  } catch (error) {
    console.warn("Failed to persist theme state:", error);
  }
};
