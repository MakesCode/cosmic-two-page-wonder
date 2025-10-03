import { createAppAsyncThunk } from "@lib/redux/createAppAsyncThunk";
import { Dependencies } from "@pro/lib/dependencies";
import { organizationLoaded } from "@features/pro/organization/retrieveOrganization/organization.action";

export interface CtxRetrieveOrganization {
  params: {};
  data: {};
}

export const retrieveOrganizationUsecase = createAppAsyncThunk(
  "organization/retrieveOrganizationUsecase",
  async (_ctx: CtxRetrieveOrganization, { dispatch, extra }) => {
    const { organizationApi } = extra as Dependencies;

    try {
      const response = await organizationApi.getOrganization({ params: {}, data: {} } as any);
      const payload = response.payload;

      dispatch(organizationLoaded(payload));
      return payload;
    } catch (error) {
      throw error;
    }
  },
);
