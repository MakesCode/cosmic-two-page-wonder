const USER_OVERRIDE_STORAGE_KEY = "editor-storage:user-override";

export const hasUserThemeOverride = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(USER_OVERRIDE_STORAGE_KEY) === "true";
};

export const setUserThemeOverride = (value: boolean) => {
  if (typeof window === "undefined") {
    return;
  }
  if (value) {
    window.localStorage.setItem(USER_OVERRIDE_STORAGE_KEY, "true");
  } else {
    window.localStorage.removeItem(USER_OVERRIDE_STORAGE_KEY);
  }
};

export const clearUserThemeOverride = () => {
  setUserThemeOverride(false);
};

export const markUserThemeOverride = () => {
  setUserThemeOverride(true);
};

export const getUserThemeOverrideStorageKey = () => USER_OVERRIDE_STORAGE_KEY;
