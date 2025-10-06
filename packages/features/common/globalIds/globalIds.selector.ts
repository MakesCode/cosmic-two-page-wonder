import { RootState } from '../../../lib/redux/rootReducer';

export const selectGlobalIds = (state: RootState) => state.globalIds;
export const selectOrganizationId = (state: RootState) => state.globalIds.organizationId;
export const selectSubscriptionId = (state: RootState) => state.globalIds.subscriptionId;
