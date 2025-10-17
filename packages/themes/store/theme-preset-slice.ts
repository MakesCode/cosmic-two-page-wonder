import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultPresets } from "../utils/theme-presets";
import type { ThemePreset } from "../types/theme";

export interface ThemePresetSliceState {
  presets: Record<string, ThemePreset>;
}

const initialState: ThemePresetSliceState = {
  presets: defaultPresets,
};

const themePresetSlice = createSlice({
  name: "themePresets",
  initialState,
  reducers: {
    registerPreset(state, action: PayloadAction<{ name: string; preset: ThemePreset }>) {
      state.presets[action.payload.name] = action.payload.preset;
    },
    unregisterPreset(state, action: PayloadAction<string>) {
      delete state.presets[action.payload];
    },
    updatePreset(state, action: PayloadAction<{ name: string; preset: ThemePreset }>) {
      state.presets[action.payload.name] = action.payload.preset;
    },
    resetPresets(state) {
      state.presets = defaultPresets;
    },
  },
});

export const { registerPreset, unregisterPreset, updatePreset, resetPresets } =
  themePresetSlice.actions;
export const themePresetReducer = themePresetSlice.reducer;
