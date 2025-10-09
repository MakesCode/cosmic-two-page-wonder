import { createAppAsyncThunk } from "@lib/redux/createAppAsyncThunk";
import { Dependencies } from "@lovable/lib/redux/dependencies";
import { claimsLoaded } from "@features/pro/gli/Claims/retrieveClaims/claims.action";

export interface CtxRetrieveClaims {
  params: {
    subscriptionId: string;
  };
  data: {};
}

export const retrieveClaimsUsecase = createAppAsyncThunk(
  "claims/retrieveClaimsUsecase",
  async (ctx: CtxRetrieveClaims, { dispatch, extra }) => {
    const { claimsApi } = extra as Dependencies;

    try {
      const response = await claimsApi.getClaims({
        data: {},
        params: ctx.params,
      });
      dispatch(claimsLoaded(response.payload.data));
      return response.payload.data;
    } catch (error) {
      throw error;
    }
  }
);
