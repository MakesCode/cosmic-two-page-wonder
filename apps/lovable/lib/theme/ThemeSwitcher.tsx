import { MouseEvent, useMemo } from "react";
import { Sparkles, Sun, Moon, RotateCcw } from "lucide-react";
import { Button } from "@ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { useTheme } from "@themes/components/theme-provider";
import { applyThemePreset } from "@themes/store/actions";
import { useAppDispatch, useAppSelector } from "@themes/store/hooks";
import { useMounted } from "@hooks/use-mounted";
import { useRouteDefaultPreset } from "@themes/hooks/use-route-default-preset";
import { clearUserThemeOverride, markUserThemeOverride } from "@themes/utils/user-theme-preference";

export function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const { theme, setTheme, toggleTheme } = useTheme();
  const isMounted = useMounted();
  const presetMap = useAppSelector((state) => state.themePresets.presets);
  const activePreset = useAppSelector((state) => state.themeEditor.themeState.preset);
  const defaultPreset = useRouteDefaultPreset("lovable");

  const presetOptions = useMemo(() => {
    return Object.entries(presetMap)
      .map(([value, preset]) => ({
        value,
        label: preset.label ?? value,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [presetMap]);

  if (!isMounted) {
    return null;
  }

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    markUserThemeOverride();
    toggleTheme({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  const handlePresetChange = (value: string) => {
    markUserThemeOverride();
    dispatch(applyThemePreset(value));
  };

  const handleReset = () => {
    if (!defaultPreset) {
      return;
    }
    clearUserThemeOverride();
    dispatch(applyThemePreset(defaultPreset));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-full border border-border/70 bg-background/80 px-3 py-2 shadow-lg backdrop-blur">
      <div className="hidden text-xs font-medium text-muted-foreground sm:block">Thème</div>
      <Select value={activePreset ?? undefined} onValueChange={handlePresetChange}>
        <SelectTrigger className="h-9 w-[11rem] border-none bg-transparent px-0 text-sm shadow-none hover:bg-accent/40 focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder="Sélectionner un preset" />
        </SelectTrigger>
        <SelectContent align="end">
          {presetOptions.map((preset) => (
            <SelectItem key={preset.value} value={preset.value}>
              {preset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant={theme === "light" ? "secondary" : "ghost"}
          onClick={() => {
            markUserThemeOverride();
            setTheme("light");
          }}
          aria-label="Activer le thème clair"
        >
          <Sun className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={theme === "dark" ? "secondary" : "ghost"}
          onClick={() => {
            markUserThemeOverride();
            setTheme("dark");
          }}
          aria-label="Activer le thème sombre"
        >
          <Moon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleToggle}
          aria-label="Basculer le thème"
        >
          <Sparkles className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleReset}
          aria-label="Réinitialiser le thème par défaut"
          disabled={!defaultPreset}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
