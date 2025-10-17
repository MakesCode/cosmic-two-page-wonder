import { defaultThemeState } from "../config/theme";
import type { ThemePreset, ThemeStyles } from "../types/theme";

export function getPresetThemeStyles(
  name: string,
  presets: Record<string, ThemePreset>
): ThemeStyles {
  const defaultTheme = defaultThemeState.styles;
  if (name === "default") {
    return defaultTheme;
  }

  const preset = presets[name];
  if (!preset) {
    return defaultTheme;
  }

  return {
    light: {
      ...defaultTheme.light,
      ...(preset.styles.light || {}),
    },
    dark: {
      ...defaultTheme.dark,
      ...(preset.styles.light || {}),
      ...(preset.styles.dark || {}),
    },
  };
}
