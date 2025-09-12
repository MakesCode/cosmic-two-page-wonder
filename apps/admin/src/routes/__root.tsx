/// <reference types="vite/client" />
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import appCss from '@styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Admin' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div style={{ padding: 16, fontFamily: 'system-ui' }}>
          <header style={{ marginBottom: 16 }}>
            <h1 style={{ margin: 0 }}>Admin</h1>
          </header>
          <Outlet />
        </div>
        <Scripts />
      </body>
    </html>
  )
}

