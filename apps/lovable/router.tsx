// import { createRouter as createTanStackRouter } from '@tanstack/react-router'
// import { routeTree } from '@lovable/routeTree.gen'

// export function createRouter() {
//   const router = createTanStackRouter({
//     routeTree,
//     scrollRestoration: true,
//   })
//   return router
// }

// declare module '@tanstack/react-router' {
//   interface Register {
//     router: ReturnType<typeof createRouter>
//   }
// }

import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from '@lovable/routeTree.gen';
import { QueryClient } from '@tanstack/react-query';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';
import { createDependencies, createStoreWithDependencies } from '@lovable/lib/redux/dependencies';

// NOTE: Most of the integration code found here is experimental and will
// definitely end up in a more streamlined API in the future. This is just
// to show what's possible with the current APIs.

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 0,
        retry: 0,
      },
    },
  });
  const dependencies = createDependencies(queryClient);
  const preloadedState = undefined;

  const store = createStoreWithDependencies(dependencies, preloadedState);
  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient, dependencies, store },
      defaultPreload: 'intent',
      scrollRestoration: true,
    }),
    queryClient,
  );
}
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
  interface RouterContext {
    dependencies: ReturnType<typeof createDependencies>;
  }
}
