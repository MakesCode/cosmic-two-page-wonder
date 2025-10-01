import { createAction } from '@reduxjs/toolkit';
import type { GLICreationResponse } from '../model/GLICreationResponse';

export const subscriptionLoaded = createAction<GLICreationResponse>('SUBSCRIPTION_LOADED');

