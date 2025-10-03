import { createFileRoute, Link, type AnyRoute, type FileRouteTypes } from '@tanstack/react-router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, LayoutDashboard, ListTree, ServerCog, ShieldCheck, Terminal } from 'lucide-react'
import { routeTree } from '@lovable/routeTree.gen'

type KnownPath = FileRouteTypes['to']

type RouteDescriptor = {
  path: KnownPath
  label: string
  description: string
  icon: LucideIcon
  status?: 'alpha' | 'beta' | 'stable'
}

type RouteDescriptorWithOrder = RouteDescriptor & { order: number }

export type ProductPanel = {
  id: string
  code: string
  title: string
  synopsis: string
  owner: string
  accent: string
  icon: LucideIcon
  routes: RouteDescriptor[]
}

type ProductPanelInternal = Omit<ProductPanel, 'routes'> & { routes: RouteDescriptorWithOrder[] }

type RouteOverride = Partial<RouteDescriptor> & { order?: number }

type WorkspaceConfig = {
  id: string
  code: string
  title: string
  synopsis: string
  owner: string
  accent: string
  icon: LucideIcon
  defaultIndexDescription?: string
  defaultIndexIcon?: LucideIcon
  defaultRouteIcon?: LucideIcon
  defaultRouteDescription?: (label: string) => string
  routeOverrides?: Record<string, RouteOverride>
}

const workspaceConfigs: Record<string, WorkspaceConfig> = {
  pro: {
    id: 'pro',
    code: 'PRO',
    title: 'Cosmic Pro Workspace',
    synopsis: 'Interface pilotage pour les équipes growth & accounts.',
    owner: 'Segment: Marketing Ops',
    accent: 'from-cyan-500/30 via-emerald-500/20 to-teal-500/10',
    icon: ServerCog,
    defaultIndexDescription: 'Accueil de pilotage & synthèses instantanées.',
    defaultIndexIcon: LayoutDashboard,
    defaultRouteIcon: ListTree,
    defaultRouteDescription: (label) => `Module ${label.toLowerCase()}.`,
    routeOverrides: {
      __index__: {
        label: 'Dashboard',
        description: 'Accueil de pilotage & synthèses instantanées.',
        icon: LayoutDashboard,
        status: 'stable',
        order: 0,
      },
      gli: {
        label: 'Portail GLI',
        description: 'Gestion des dossiers et contrôle des statuts GLI.',
        icon: ListTree,
        status: 'beta',
        order: 1,
      },
    },
  },
  admin: {
    id: 'admin',
    code: 'ADM',
    title: 'Cosmic Admin Control',
    synopsis: 'Paramétrage avancé, accès et observabilité.',
    owner: 'Segment: Security & Compliance',
    accent: 'from-purple-500/30 via-blue-500/20 to-indigo-500/10',
    icon: ShieldCheck,
    defaultIndexDescription: 'Vue d’ensemble des accès et des alertes.',
    defaultIndexIcon: LayoutDashboard,
    defaultRouteIcon: ListTree,
    defaultRouteDescription: (label) => `Module ${label.toLowerCase()}.`,
    routeOverrides: {
      __index__: {
        label: 'Dashboard',
        description: 'Vue d’ensemble des accès et des alertes.',
        icon: LayoutDashboard,
        status: 'alpha',
        order: 0,
      },
    },
  },
}

const PANEL_ORDER = Object.keys(workspaceConfigs)

export const Route = createFileRoute('/')({
  component: WorkspaceDirectory,
})

function WorkspaceDirectory() {
  const productPanels = useMemo(() => deriveProductPanels(routeTree), [])

  return (
      <div className="relative min-h-[100svh] overflow-hidden bg-slate-950 text-slate-100 w-full">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(32,45,72,0.35)_0%,rgba(15,23,42,0)_35%,rgba(36,28,62,0.35)_70%,rgba(15,23,42,0)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(122,179,255,0.08),_transparent_70%)]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(148,163,184,0.06),rgba(15,23,42,0))]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:px-10 lg:px-14">
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-md border border-slate-800/80 bg-slate-900/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.3em] text-slate-400">
              <Terminal className="h-4 w-4 text-slate-500" /> Cosmic Control Surface
            </div>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold leading-tight text-white sm:text-[2.4rem]">
                  Sélecteur d’environnements & routes produits
                </h1>
                <p className="max-w-3xl text-sm text-slate-400 md:text-base">
                  Inspectez les espaces disponibles, ouvrez un dashboard ou rejoignez directement une vue fonctionnelle. Les routes ci-dessous sont
                  dérivées du route tree TanStack et se mettent à jour automatiquement.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-800/70 bg-slate-900/70 px-4 py-2">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-slate-500">Routes actives</span>
                <span className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 font-mono text-sm text-slate-300">
                  {productPanels.reduce((total, panel) => total + panel.routes.length, 0)}
                </span>
              </div>
            </div>
          </header>

          <section className="grid gap-6 md:grid-cols-2">
            {productPanels.map((panel) => (
              <article
                key={panel.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-[0_40px_80px_-60px_rgba(8,47,73,0.8)]"
              >
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${panel.accent}`} />
                <div className="flex flex-col gap-6 p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950/80 px-3 py-1 font-mono text-xs uppercase tracking-[0.28em] text-slate-400">
                      <panel.icon className="h-4 w-4 text-slate-300" /> {panel.code}
                    </span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-slate-500">{panel.owner}</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white md:text-2xl">{panel.title}</h2>
                    <p className="text-sm text-slate-400">{panel.synopsis}</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Routes</span>
                      <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 font-mono text-[0.7rem] text-slate-400">
                        {panel.routes.length}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                      {panel.routes.map((route) => (
                        <Link
                          key={route.path}
                          to={route.path}
                          preload="intent"
                          className="group/link flex items-start justify-between gap-3 rounded-lg border border-transparent bg-slate-900/70 px-3 py-2 font-mono text-[0.8rem] text-slate-300 transition hover:border-slate-700 hover:bg-slate-900"
                        >
                          <div className="flex items-start gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-950">
                              <route.icon className="h-4 w-4 text-slate-200" />
                            </span>
                            <div className="space-y-1">
                              <span className="text-sm font-medium text-white">{route.label}</span>
                              <p className="text-xs text-slate-500">{route.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover/link:translate-x-1 group-hover/link:text-slate-200" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <footer className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Notes opérateur</span>
              <p className="text-sm text-slate-400">
                Ajoutez un nouvel espace en créant une route dans <code className="rounded bg-slate-900 px-2 py-1 text-xs text-slate-300">apps/lovable/routes/&lt;produit&gt;</code>.
                Le route tree se régénère automatiquement via TanStack Router et ce panneau reflétera la mise à jour après redéploiement.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Commande utile</span>
              <pre className="mt-3 overflow-auto rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3 text-xs text-slate-300">{`# générer un nouveau module produit
pnpm run dev  # régénère routeTree.gen.ts
`}</pre>
            </div>
          </footer>
        </div>
      </div>
  )
}

export function deriveProductPanels(root: AnyRoute): ProductPanel[] {
  const panelMap = new Map<string, ProductPanelInternal>()
  const workspaceCache = new Map<string, WorkspaceConfig>()

  const getWorkspaceConfig = (slug: string) => {
    if (!workspaceCache.has(slug)) {
      const config = workspaceConfigs[slug] ?? createDefaultWorkspaceConfig(slug)
      workspaceCache.set(slug, config)
    }
    return workspaceCache.get(slug)!
  }

  const ensurePanel = (slug: string) => {
    if (!panelMap.has(slug)) {
      const config = getWorkspaceConfig(slug)
      panelMap.set(slug, {
        id: config.id,
        code: config.code,
        title: config.title,
        synopsis: config.synopsis,
        owner: config.owner,
        accent: config.accent,
        icon: config.icon,
        routes: [],
      })
    }
    return panelMap.get(slug)!
  }

  const addRouteToPanel = (route: AnyRoute) => {
    const normalizedPath = normalizePath(route.fullPath)
    if (!normalizedPath || normalizedPath === '/') {
      return
    }

    const segments = normalizedPath.split('/').filter(Boolean)
    if (segments.length === 0) {
      return
    }

    const workspaceSlug = segments[0]
    const relativeSegments = segments.slice(1)
    const routeKey = relativeSegments.length > 0 ? relativeSegments.join('/') : '__index__'
    const config = getWorkspaceConfig(workspaceSlug)
    const panel = ensurePanel(workspaceSlug)

    const override = config.routeOverrides?.[routeKey]
    const isIndex = routeKey === '__index__'

    const label = override?.label ?? (isIndex ? 'Dashboard' : formatLabel(relativeSegments))
    const description =
      override?.description ??
      (isIndex
        ? config.defaultIndexDescription ?? 'Vue principale du workspace.'
        : config.defaultRouteDescription?.(label) ?? `Module ${label.toLowerCase()}.`)

    const icon =
      override?.icon ??
      (isIndex ? config.defaultIndexIcon ?? LayoutDashboard : config.defaultRouteIcon ?? ListTree)

    const descriptor: RouteDescriptorWithOrder = {
      path: normalizedPath as KnownPath,
      label,
      description,
      icon,
      status: override?.status,
      order: override?.order ?? (isIndex ? 0 : panel.routes.length + 1),
    }

    const existingIndex = panel.routes.findIndex((entry) => entry.path === descriptor.path)
    if (existingIndex >= 0) {
      panel.routes[existingIndex] = descriptor
    } else {
      panel.routes.push(descriptor)
    }
  }

  const traverse = (routes?: Array<AnyRoute>) => {
    if (!routes) {
      return
    }
    routes.forEach((route) => {
      addRouteToPanel(route)
      if (Array.isArray(route.children) && route.children.length > 0) {
        traverse(route.children as Array<AnyRoute>)
      }
    })
  }

  traverse(root.children as Array<AnyRoute>)

  const panelOrderIndex = (slug: string) => {
    const index = PANEL_ORDER.indexOf(slug)
    return index === -1 ? Number.MAX_SAFE_INTEGER : index
  }

  return Array.from(panelMap.entries())
    .sort(([a], [b]) => panelOrderIndex(a) - panelOrderIndex(b))
    .map(([, panel]) => ({
      ...panel,
      routes: panel.routes
        .sort((a, b) => a.order - b.order)
        .map(({ order, ...rest }) => rest),
    }))
    .filter((panel) => panel.routes.length > 0)
}

function createDefaultWorkspaceConfig(slug: string): WorkspaceConfig {
  const humanName = formatSegment(slug)
  const code = slug.length <= 3 ? slug.toUpperCase() : slug.slice(0, 3).toUpperCase()
  return {
    id: slug,
    code,
    title: `${humanName} Workspace`,
    synopsis: 'Workspace détecté automatiquement. Ajoutez une configuration dédiée pour le personnaliser.',
    owner: 'Segment: à définir',
    accent: 'from-slate-500/30 via-slate-500/10 to-slate-500/5',
    icon: ServerCog,
    defaultIndexDescription: 'Vue principale du workspace.',
    defaultIndexIcon: LayoutDashboard,
    defaultRouteIcon: ListTree,
    defaultRouteDescription: (label: string) => `Module ${label.toLowerCase()}.`,
  }
}

function normalizePath(path?: string) {
  if (!path) {
    return undefined
  }
  if (path === '/') {
    return path
  }
  return path.replace(/\/+$/, '') as KnownPath
}

function formatLabel(segments: string[]) {
  if (segments.length === 0) {
    return 'Dashboard'
  }
  return segments.map(formatSegment).join(' › ')
}

function formatSegment(segment: string) {
  return segment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
