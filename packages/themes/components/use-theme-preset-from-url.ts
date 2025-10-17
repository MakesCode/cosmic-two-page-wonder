import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { applyThemePreset } from "../store/actions";

const getPresetFromUrl = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const url = new URL(window.location.href);
  return url.searchParams.get("theme");
};

const clearPresetFromUrl = () => {
  if (typeof window === "undefined") {
    return;
  }
  const url = new URL(window.location.href);
  url.searchParams.delete("theme");
  window.history.replaceState(null, "", url.toString());
};

export const useThemePresetFromUrl = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const preset = getPresetFromUrl();
    if (preset) {
      dispatch(applyThemePreset(preset));
      clearPresetFromUrl();
    }

    const handlePopState = () => {
      const nextPreset = getPresetFromUrl();
      if (nextPreset) {
        dispatch(applyThemePreset(nextPreset));
        clearPresetFromUrl();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [dispatch]);
};
