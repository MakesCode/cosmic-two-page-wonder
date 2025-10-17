import { defaultThemeState } from "../config/theme";
import type { ThemeEditorState } from "../types/editor";
import { replaceThemeState, setThemeMode, setThemeStyles } from "./editor-slice";
import { getPresetThemeStyles } from "../utils/theme-preset-helper";
import { ThemeStyles } from "../types/theme";
import type { RootState } from "@lib/redux/rootReducer";
import type { AppDispatch } from "@lib/redux/createAppStore";

export const applyThemePreset =
  (presetName: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const current = state.themeEditor.themeState;
    const presets = state.themePresets.presets;

    const styles = getPresetThemeStyles(presetName, presets);

    const updated: ThemeEditorState = {
      ...current,
      preset: presetName,
      styles,
      hslAdjustments: defaultThemeState.hslAdjustments,
    };

    dispatch(replaceThemeState(updated));
  };

export const updateThemeStyles = (styles: ThemeStyles) => (dispatch: AppDispatch) => {
  dispatch(setThemeStyles(styles));
};

export const updateThemeMode = (mode: "light" | "dark") => (dispatch: AppDispatch) => {
  dispatch(setThemeMode(mode));
};

export const overwriteThemeState = (state: ThemeEditorState) => (dispatch: AppDispatch) => {
  dispatch(replaceThemeState(state));
};
