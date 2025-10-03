import { createAction } from '@reduxjs/toolkit';
import type { OrganizationBase } from '@features/organization/model/organization';

export const organizationLoaded = createAction<OrganizationBase>('ORGANIZATION_LOADED');
