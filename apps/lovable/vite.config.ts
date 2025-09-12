import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig } from "vite";
import { TanStackRouterVite as tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => ({
  root: __dirname,
  server: { host: "::", port: 8080 },
  build: {
    // Emit the build to the repo root's dist folder for Lovable
    outDir: path.resolve(__dirname, "../../dist"),
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tanstackRouter({
      routesDirectory: path.resolve(__dirname, 'routes'),
      generatedRouteTree: path.resolve(__dirname, 'routeTree.gen.ts'),
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      "@ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
}));
