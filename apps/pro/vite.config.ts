import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import path from 'node:path'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: __dirname,
  server: {
    host: '::',
    port: 3001,
    // https: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      root: __dirname,
      customViteReactPlugin: true,
      target: 'node-server',
      spa: { enabled: false },
      tsr: {
        srcDirectory: path.resolve(__dirname, 'src'),
        routesDirectory: path.resolve(__dirname, 'src/routes'),
        generatedRouteTree: path.resolve(__dirname, 'src/routeTree.gen.ts'),
      },
    }),
    viteReact(),
    tsConfigPaths(),
          {
        name: 'allow-dev-host',
        config() {
          return {
            server: {
              allowedHosts: ['dev.smart-garant.fr'],
              host: 'dev.smart-garant.fr',
              // https: true,
            },
          };
        },
      },
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
      "@dependencies": path.resolve(__dirname, "../../packages/dependencie"),
    },
  },
})
