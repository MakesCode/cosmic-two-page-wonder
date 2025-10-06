import { createAction } from '@reduxjs/toolkit';
import { GLICreationResponse } from '../../../../model/pro/GLICreationResponse';

export const subscriptionLoaded = createAction<GLICreationResponse>('SUBSCRIPTION_LOADED');

