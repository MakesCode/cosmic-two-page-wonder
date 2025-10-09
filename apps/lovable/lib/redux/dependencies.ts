import { QueryClient } from "@tanstack/react-query";
import { createAppStore } from "@lovable/lib/redux/createAppStore";
import { MockSubscriptionGateway, MockClaimsGateway } from "@mock/index";

export type Dependencies = {
  subscriptionApi: MockSubscriptionGateway;
  claimsApi: MockClaimsGateway;
  queryClient: QueryClient;
};

export function createDependencies(queryClient: QueryClient): Dependencies {
  const subscriptionApi = new MockSubscriptionGateway();
  const claimsApi = new MockClaimsGateway();
  return {
    queryClient,
    subscriptionApi,
    claimsApi,
  };
}

export function createStoreWithDependencies(dependencies: Dependencies, preloadedState) {
  return createAppStore(dependencies, preloadedState);
}
