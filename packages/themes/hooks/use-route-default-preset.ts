import { useMemo } from "react";
import { useRouterState } from "@tanstack/react-router";
import type { AppThemeId } from "../config/app-theme-defaults";
import { resolveDefaultPresetForPath } from "../config/app-theme-defaults";

export const useRouteDefaultPreset = (appId: AppThemeId): string | undefined => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return useMemo(() => {
    if (!pathname) {
      return undefined;
    }
    return resolveDefaultPresetForPath(appId, pathname);
  }, [appId, pathname]);
};
