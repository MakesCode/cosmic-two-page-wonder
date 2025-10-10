import { QueryClient } from "@tanstack/react-query";
import { createAppStore } from "@lovable/lib/redux/createAppStore";
import { MockSubscriptionGateway, MockClaimsGateway, MockBordereauxGateway } from "@mock/index";

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
  return createAppStore(dependencies, preloadedState);
}
