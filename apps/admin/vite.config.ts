import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import path from 'node:path'
import fs from 'node:fs'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'

const repoRoot = path.resolve(__dirname, '..', '..')
const tsconfigBase = JSON.parse(
  fs.readFileSync(
    path.resolve(repoRoot, 'packages/config/tsconfig.base.json'),
    'utf-8',
  ),
)

const sharedAliases = Object.entries(tsconfigBase.compilerOptions?.paths ?? {}).reduce(
  (acc, [key, targets]) => {
    if (!Array.isArray(targets) || targets.length === 0) return acc
    const aliasKey = key.endsWith('/*') ? key.slice(0, -2) : key
    const target = targets[0]
    const normalizedTarget = target.endsWith('/*') ? target.slice(0, -2) : target
    acc[aliasKey] = path.resolve(repoRoot, normalizedTarget)
    return acc
  },
  {} as Record<string, string>,
)

export default defineConfig({
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
  ],
  resolve: {
    alias: {
      ...sharedAliases,
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
})
