import { createAppAsyncThunk } from "@lib/redux/createAppAsyncThunk";
import { Dependencies } from "@lovable/lib/redux/dependencies";
import { claimsLoaded } from "./claims.action";
import { GetClaimsRequest } from "@dependencies/interface/pro/ClaimsGateway";

export const retrieveClaimsUsecase = createAppAsyncThunk(
  "claims/retrieveClaimsUsecase",
  async (ctx: GetClaimsRequest, { dispatch, extra }) => {
    const { claimsApi } = extra as Dependencies;

    try {
      const response = await claimsApi.getClaims(ctx);
      dispatch(claimsLoaded(response.payload.data));
      return response.payload.data;
    } catch (error) {
      throw error;
    }
  }
);
