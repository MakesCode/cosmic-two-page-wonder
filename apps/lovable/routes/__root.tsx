/// <reference types="vite/client" />
import { useMemo, type ReactNode } from "react";
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import NotFound from "@pages/NotFound";
import { Toaster } from "@ui/components/ui/toaster";
import { Toaster as Sonner } from "@ui/components/ui/sonner";
import { TooltipProvider } from "@ui/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import themeCssPath from "@themes/globals.css?url";
import { DependenciesProvider } from "@lovable/lib/DI/DependenciesProvider";
import { SidebarProvider } from "@ui/components/ui/sidebar";
import { DevtoolsProvider } from "@lovable/lib/DevtoolsProvider";
import { Provider } from "react-redux";
import { BootstrapQueries } from "@lib/loader/BootstrapQueries";
import { routeTree } from "@lovable/routeTree.gen";
import { deriveProductPanels } from "@lovable/routes";
import { ThemeScript } from "@themes/components/theme-script";
import { ThemeProvider } from "@themes/components/theme-provider";
import { DynamicFontLoader } from "@themes/components/dynamic-font-loader";
import { ThemeDefaultsInitializer } from "@themes/components/theme-defaults-initializer";
import { ThemeSwitcher } from "@lovable/lib/theme/ThemeSwitcher";
import { createStoreWithDependencies } from "@lovable/lib/redux/dependencies";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "cosmic-two-page-wonder" },
      { name: "description", content: "Lovable Generated Project" },
    ],
    links: [{ rel: "stylesheet", href: themeCssPath }],
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
  const productPanels = useMemo(() => deriveProductPanels(routeTree), []);
  const { store } = Route.useRouteContext() as {
    store: ReturnType<typeof createStoreWithDependencies>;
  };
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <DependenciesProvider>
          <DevtoolsProvider productPanels={productPanels}>
            <TooltipProvider>
              <Provider store={store}>
                <ThemeProvider>
                  <ThemeDefaultsInitializer appId="lovable" />
                  <DynamicFontLoader />
                  <BootstrapQueries />
                  <Toaster />
                  <Sonner />
                  <ThemeSwitcher />
                  {children}
                </ThemeProvider>
              </Provider>
            </TooltipProvider>
          </DevtoolsProvider>
        </DependenciesProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
