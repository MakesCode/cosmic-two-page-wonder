import { QueryClient } from "@tanstack/react-query";
import { createAppStore } from "@lovable/lib/redux/createAppStore";
import { MockSubscriptionGateway } from "@mock/index";

export type Dependencies = {
  subscriptionApi: MockSubscriptionGateway;
  queryClient: QueryClient;
};

export function createDependencies(queryClient: QueryClient): Dependencies {
  const subscriptionApi = new MockSubscriptionGateway();
  return {
    queryClient,
    subscriptionApi,
  };
}

export function createStoreWithDependencies(dependencies: Dependencies, preloadedState) {
  return createAppStore(dependencies, preloadedState);
}
