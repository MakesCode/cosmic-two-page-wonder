import { createAction } from '@reduxjs/toolkit';
import type { OrganizationBase } from '../model/organization';

export const organizationLoaded = createAction<OrganizationBase>('ORGANIZATION_LOADED');
