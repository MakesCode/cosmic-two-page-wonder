import { createAppAsyncThunk } from '../../../lib/redux/createAppAsyncThunk';
import { Dependencies } from '../../../lib/redux/dependencies';
import type { ProfileApi } from '../model/organization';

export interface CtxRetrieveSaleProfile {
  params: { organizationId: string };
  data: {};
}

export const retrieveSaleProfileUsecase = createAppAsyncThunk(
  'organization/retrieveSaleProfileUsecase',
  async (ctx: CtxRetrieveSaleProfile, { extra }) => {
    const { organizationApi } = extra as Dependencies;

    try {
      const response = await organizationApi.getSaleProfile({ params: { organizationId: ctx.params.organizationId }, data: {} });
      return response.payload as ProfileApi;
    } catch (error) {
      throw error;
    }
  },
);
