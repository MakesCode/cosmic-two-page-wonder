import { QueryClient } from '@tanstack/react-query';
import { createAppStore } from './createAppStore';
import { ApiSubscriptionGateway } from '../../features/gli/Subscriptions/api-subscription';
import { ApiRentalApprovalsGateway, RentalApprovalsGateway } from '../../features/gli/RentalApprovals/api-rentalApprovals';
import { ApiOrganizationGateway, OrganizationGateway } from '../../features/organization/api-organization';
import { ApiService } from '../axios/ApiService';

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
  return createAppStore(dependencies, preloadedState);
}
