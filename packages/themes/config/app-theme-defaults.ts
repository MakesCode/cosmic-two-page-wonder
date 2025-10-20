type AppThemeId = "lovable" | "pro" | "admin";

type RoutePresetOverride = {
  path: string;
  preset: string;
};

type AppThemeDefaults = {
  defaultPreset: string;
  routeOverrides?: RoutePresetOverride[];
};

const THEME_DEFAULTS: Record<AppThemeId, AppThemeDefaults> = {
  lovable: {
    defaultPreset: "claude",
    routeOverrides: [
      { path: "/admin", preset: "vercel" },
      { path: "/housing", preset: "violet-bloom" },
      { path: "/pro", preset: "gli" },
      { path: "/pro/gli", preset: "gli" },
      { path: "/pro/sinistres", preset: "gli" },
    ],
  },
  pro: {
    defaultPreset: "gli",
  },
  admin: {
    defaultPreset: "claude",
  },
};

export type { AppThemeId, AppThemeDefaults };

export const resolveDefaultPresetForPath = (
  appId: AppThemeId,
  pathname: string,
): string | undefined => {
  const config = THEME_DEFAULTS[appId];

  if (!config) {
    return undefined;
  }

  const normalizedPath = pathname.endsWith("/")
    ? pathname.slice(0, Math.max(pathname.length - 1, 1))
    : pathname;

  const override = config.routeOverrides
    ?.filter((candidate) => {
      const base = candidate.path.endsWith("/")
        ? candidate.path.slice(0, Math.max(candidate.path.length - 1, 1))
        : candidate.path;
      if (base === "/") {
        return normalizedPath === "/";
      }
      return normalizedPath === base || normalizedPath.startsWith(`${base}/`);
    })
    .sort((a, b) => b.path.length - a.path.length)
    .at(0);

  return override?.preset ?? config.defaultPreset;
};

export const getAppThemeDefaults = (appId: AppThemeId): AppThemeDefaults | undefined =>
  THEME_DEFAULTS[appId];
