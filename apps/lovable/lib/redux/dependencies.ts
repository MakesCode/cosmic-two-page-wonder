import { QueryClient } from "@tanstack/react-query";
import { createAppStore } from "@lovable/lib/redux/createAppStore";
import { MockSubscriptionGateway, MockClaimsGateway, MockBordereauxGateway } from "@mock/index";
import { buildThemePreloadedState, initializeThemePersistence } from "@themes/store";

export type Dependencies = {
  subscriptionApi: MockSubscriptionGateway;
  claimsApi: MockClaimsGateway;
  bordereauxApi: MockBordereauxGateway;
  queryClient: QueryClient;
};

export function createDependencies(queryClient: QueryClient): Dependencies {
  const subscriptionApi = new MockSubscriptionGateway();
  const claimsApi = new MockClaimsGateway();
  const bordereauxApi = new MockBordereauxGateway();
  return {
    queryClient,
    subscriptionApi,
    claimsApi,
    bordereauxApi,
  };
}

export function createStoreWithDependencies(dependencies: Dependencies, preloadedState) {
  const themePreloadedState = buildThemePreloadedState();
  const combinedPreloadedState =
    preloadedState || themePreloadedState
      ? {
          ...(preloadedState ?? {}),
          ...(themePreloadedState ?? {}),
        }
      : undefined;

  const store = createAppStore(dependencies, combinedPreloadedState);
  initializeThemePersistence(store);

  return store;
}
