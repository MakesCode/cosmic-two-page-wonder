import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { applyThemePreset } from "../store/actions";
import { useRouteDefaultPreset } from "../hooks/use-route-default-preset";
import type { AppThemeId } from "../config/app-theme-defaults";
import { hasUserThemeOverride, clearUserThemeOverride } from "../utils/user-theme-preference";

type ThemeDefaultsInitializerProps = {
  appId: AppThemeId;
};

export function ThemeDefaultsInitializer({ appId }: ThemeDefaultsInitializerProps) {
  const dispatch = useAppDispatch();
  const defaultPreset = useRouteDefaultPreset(appId);
  const activePreset = useAppSelector((state) => state.themeEditor.themeState.preset);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!defaultPreset) {
      return;
    }

    if (hasUserThemeOverride()) {
      return;
    }

    if (activePreset === defaultPreset) {
      return;
    }

    clearUserThemeOverride();
    dispatch(applyThemePreset(defaultPreset));
  }, [activePreset, defaultPreset, dispatch]);

  return null;
}
