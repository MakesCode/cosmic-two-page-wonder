import { createAction } from '@reduxjs/toolkit';
import type { GLICreationResponse } from '../../../../../../../packages/model/pro/GLICreationResponse';

export const subscriptionLoaded = createAction<GLICreationResponse>('SUBSCRIPTION_LOADED');

