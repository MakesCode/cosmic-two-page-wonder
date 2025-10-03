import { createAction } from "@reduxjs/toolkit";
import { GLICreationResponse } from "@features/pro/gli/Subscriptions/model/GLICreationResponse";

export const subscriptionLoaded = createAction<GLICreationResponse>("SUBSCRIPTION_LOADED");
