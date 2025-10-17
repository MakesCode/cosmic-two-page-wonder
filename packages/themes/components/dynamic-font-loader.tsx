import { useEffect, useMemo } from "react";
import { useMounted } from "@hooks/use-mounted";
import { useAppSelector } from "../store/hooks";
import { extractFontFamily, getDefaultWeights, isLocalFont } from "../utils/fonts";
import { loadGoogleFont } from "../utils/fonts/google-fonts";

export function DynamicFontLoader() {
  const themeState = useAppSelector((state) => state.themeEditor.themeState);
  const isMounted = useMounted();

  const fontSans = themeState.styles.light["font-sans"];
  const fontSerif = themeState.styles.light["font-serif"];
  const fontMono = themeState.styles.light["font-mono"];

  const currentFonts = useMemo(() => {
    return {
      sans: fontSans,
      serif: fontSerif,
      mono: fontMono,
    } as const;
  }, [fontSans, fontSerif, fontMono]);

  useEffect(() => {
    if (!isMounted) return;

    try {
      Object.entries(currentFonts).forEach(([_type, fontValue]) => {
        const fontFamily = extractFontFamily(fontValue);
        if (fontFamily && !isLocalFont(fontFamily)) {
          const weights = getDefaultWeights(["400", "500", "600", "700"]);
          loadGoogleFont(fontFamily, weights);
        }
      });
    } catch (e) {
      console.warn("DynamicFontLoader: Failed to load Google fonts:", e);
    }
  }, [isMounted, currentFonts]);

  return null;
}
