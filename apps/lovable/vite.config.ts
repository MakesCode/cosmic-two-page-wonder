import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite as tanstackRouter } from "@tanstack/router-plugin/vite";
import path from 'node:path'
// import { componentTagger } from "lovable-tagger";
    // mode === "development" && componentTagger(),

export default defineConfig(() => ({
  root: __dirname,
  server: { host: '::', port: 8080 },
  plugins: [
    react(),
  tanstackRouter(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      '@ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
}))

