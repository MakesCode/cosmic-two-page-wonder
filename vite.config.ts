import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { TanStackRouterVite as tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    // Keep React SWC plugin
    react(),
    // Use TanStack Router codegen plugin (compatible with SPA/static hosting)
    tanstackRouter(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
