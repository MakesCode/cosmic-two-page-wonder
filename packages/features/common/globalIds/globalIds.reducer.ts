import { createReducer } from "@reduxjs/toolkit";
import { organizationLoaded } from "@features/pro/organization/retrieveOrganization/organization.action";
import { subscriptionLoaded } from "@features/pro/gli/Subscriptions/retrieveSubscription/subscription.action";

export type globalIdsInitialStateModel = {
  organizationId: string | null;
  subscriptionId: string | null;
};

export const globalIdsInitialState: globalIdsInitialStateModel = {
  organizationId: null,
  subscriptionId: null,
};

export const globalIdsReducer = createReducer(globalIdsInitialState, (builder) => {
  builder.addCase(organizationLoaded, (state, action) => {
    state.organizationId = action.payload.id;
  });
  builder.addCase(subscriptionLoaded, (state, action) => {
    console.log("subscriptionLoaded in reducer", action, state);

    state.subscriptionId = action.payload?.id ?? state.subscriptionId;
  });
});
