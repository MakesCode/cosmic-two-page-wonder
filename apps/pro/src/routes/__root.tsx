/// <reference types="vite/client" />
import { Outlet, createRootRoute, HeadContent, Scripts, redirect } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Toaster } from "@ui/components/ui/toaster";
import { Toaster as Sonner } from "@ui/components/ui/sonner";
import { TooltipProvider } from "@ui/components/ui/tooltip";
import { QueryClient } from "@tanstack/react-query";
import { SidebarProvider } from "@ui/components/ui/sidebar";
import { BootstrapQueries } from "@lib/loader/BootstrapQueries";
import { getSetting } from "@lib/tanstack-start/getSetting";
import { isPublicPath } from "@lib/tanstack-start/publicRoutes";
import { authGuard } from "@features/common/auth/authGuard";
import { isProRoleFromToken } from "@features/common/auth/roles";
import { createStoreWithDependencies, Dependencies } from "@pro/lib/dependencies";
import { Settings } from "@lib/tanstack-start/settings";
import { Provider } from "react-redux";
import { DependenciesProvider } from "@pro/lib/DependenciesProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import themeCssPath from "@themes/globals.css?url";
import { ThemeScript } from "@themes/components/theme-script";
import { ThemeProvider } from "@themes/components/theme-provider";
import { DynamicFontLoader } from "@themes/components/dynamic-font-loader";
import { ThemeDefaultsInitializer } from "@themes/components/theme-defaults-initializer";
import { ThemeSwitcher } from "@pro/lib/theme/ThemeSwitcher";

export const Route = createRootRoute<{
  queryClient: QueryClient;
  dependencies: Dependencies;
  user?: {
    housingId: string;
    applicationId: string;
    exp: number;
    isAuth: boolean;
  };
  settings: Settings;
}>({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Admin" },
    ],
    links: [
      { rel: "stylesheet", href: themeCssPath },
    ],
  }),
  notFoundComponent: () => (
    <RootDocument>
      <Providers>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
          }}
        >
          <h1>Page introuvable</h1>
          <p>La page demandée n’existe pas ou n’est plus disponible.</p>
        </div>
      </Providers>
      <Scripts />
    </RootDocument>
  ),
  component: RootComponent,
  beforeLoad: async (ctx) => {
    const routeContext = ctx.context as {
      dependencies: Dependencies;
      settings: Settings;
    };
    const settings = getSetting();
    const pathname: string | undefined =
      (ctx as any)?.location?.pathname ?? (ctx as any)?.location?.href;
    const isPublicRoute = isPublicPath(pathname);

    if (isPublicRoute) {
      return { isPublicRoute } as const;
    }

    const auth = await authGuard(routeContext.dependencies, {
      settings: routeContext.settings,
      roleCheckFromToken: isProRoleFromToken,
    });
    if (!auth.isAuth) {
      if (auth.status === 401) {
        throw redirect({ href: "/401" });
      }
      throw redirect({ href: `${settings.VITE_DOMAIN_APP_URL}/login` });
    }
    return { isPublicRoute } as const;
  },
});

function RootComponent() {
  return (
    <RootDocument>
      <Providers>
        <Outlet />
      </Providers>
      <Scripts />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}

function Providers({ children }: Readonly<{ children: ReactNode }>) {
  const { store } = Route.useRouteContext() as {
    store: ReturnType<typeof createStoreWithDependencies>;
  };
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <DependenciesProvider>
        <TooltipProvider>
          <Provider store={store}>
            <ThemeProvider>
              <ThemeDefaultsInitializer appId="pro" />
              <DynamicFontLoader />
              <Toaster />
              <Sonner />
              <ThemeSwitcher />
              <ReactQueryDevtools buttonPosition="bottom-right" />
              <BootstrapQueries />
              {children}
            </ThemeProvider>
          </Provider>
        </TooltipProvider>
      </DependenciesProvider>
    </SidebarProvider>
  );
}
