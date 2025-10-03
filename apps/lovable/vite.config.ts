import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import fs from "node:fs";
import { defineConfig } from "vite";
import {  tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

const repoRoot = path.resolve(__dirname, "..", "..");
const tsconfigBase = JSON.parse(
  fs.readFileSync(path.resolve(repoRoot, "tsconfig.base.json"), "utf-8"),
);

const sharedAliases = Object.entries(tsconfigBase.compilerOptions?.paths ?? {}).reduce(
  (acc, [key, targets]) => {
    if (!Array.isArray(targets) || targets.length === 0) return acc;
    const aliasKey = key.endsWith("/*") ? key.slice(0, -2) : key;
    const target = targets[0];
    const normalizedTarget = target.endsWith("/*") ? target.slice(0, -2) : target;
    acc[aliasKey] = path.resolve(repoRoot, normalizedTarget);
    return acc;
  },
  {} as Record<string, string>,
);

export default defineConfig({
  root: __dirname,
  server: { host: "::", port: 8080 },
  build: {
    outDir: path.resolve(__dirname, "../../dist"),
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tanstackRouter({
      routesDirectory: path.resolve(__dirname, "routes"),
      generatedRouteTree: path.resolve(__dirname, "routeTree.gen.ts"),
    }),
    tailwindcss(),
    tsConfigPaths(),
  ],
  resolve: {
    alias: {
      ...sharedAliases,
      "@": path.resolve(__dirname),
    },
  },
});
