import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import path from 'node:path'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  // Make sure Vite runs from the admin app directory
  root: __dirname,
  server: {
    host: '::',
    port: 3001,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      root: __dirname,
      customViteReactPlugin: true,
      // target a Node server runtime for SSR
      target: 'node-server',
      // no SPA masking here; this is the SSR admin app
      spa: { enabled: false },
      tsr: {
        srcDirectory: path.resolve(__dirname, 'src'),
        routesDirectory: path.resolve(__dirname, 'src/routes'),
        generatedRouteTree: path.resolve(__dirname, 'src/routeTree.gen.ts'),
      },
    }),
    viteReact(),
    tsConfigPaths()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@pages': path.resolve(__dirname, '../../packages/pages'),
      '@sgComponent': path.resolve(__dirname, '../../packages/ui/src/components/sgComponent'),
      '@mock': path.resolve(__dirname, '../../packages/mock'),
      '@presenter': path.resolve(__dirname, '../../packages/mock/presenter'),
    },
  },
}))
