/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import NotFound from '@/pages/NotFound'
import { Toaster } from '@ui/components/ui/toaster'
import { Toaster as Sonner } from '@ui/components/ui/sonner'
import { TooltipProvider } from '@ui/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import appCssPath from '@/index.css?url'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'cosmic-two-page-wonder' },
      { name: 'description', content: 'Lovable Generated Project' },
    ],
    links: [{ rel: 'stylesheet', href: appCssPath }],
  }),
  component: RootComponent,
  notFoundComponent: () => (
    <RootDocument>
      <Providers>
        <NotFound />
      </Providers>
      <Scripts />
    </RootDocument>
  ),
})

function RootComponent() {
  return (
    <RootDocument>
      <Providers>
        <Outlet />
      </Providers>
      <Scripts />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  )
}
