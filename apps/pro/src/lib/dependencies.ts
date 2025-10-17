import { QueryClient } from "@tanstack/react-query";
import { createAppStore } from "@lib/redux/createAppStore";
import { ApiService } from "@lib/axios/ApiService";
import { ApiSubscriptionGateway } from "@features/pro/gli/Subscriptions/api-subscription";
import {
  ApiRentalApprovalsGateway,
  RentalApprovalsGateway,
} from "@features/pro/gli/RentalApprovals/api-rentalApprovals";
import {
  ApiOrganizationGateway,
  OrganizationGateway,
} from "@features/pro/organization/api-organization";
import { buildThemePreloadedState, initializeThemePersistence } from "@themes/store";

export type Dependencies = {
  subscriptionApi: ApiSubscriptionGateway;
  rentalApprovalApi: RentalApprovalsGateway;
  organizationApi: OrganizationGateway;
  apiService: ApiService;
  queryClient: QueryClient;
};

export function createDependencies(queryClient: QueryClient): Dependencies {
  const apiService = new ApiService({});
  const subscriptionApi = new ApiSubscriptionGateway(apiService);
  const rentalApprovalApi = new ApiRentalApprovalsGateway(apiService);
  const organizationApi = new ApiOrganizationGateway(apiService);
  return {
    apiService,
    queryClient,
    subscriptionApi,
    rentalApprovalApi,
    organizationApi,
  };
}

export function createStoreWithDependencies(dependencies: Dependencies, preloadedState: any) {
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
