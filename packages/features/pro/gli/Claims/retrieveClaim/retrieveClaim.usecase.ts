import { createAppAsyncThunk } from "@lib/redux/createAppAsyncThunk";
import { Dependencies } from "@lovable/lib/redux/dependencies";
import { claimLoaded } from "../retrieveClaims/claims.action";
import { GetClaimRequest } from "@dependencies/interface/pro/ClaimsGateway";

export const retrieveClaimUsecase = createAppAsyncThunk(
  "claims/retrieveClaimUsecase",
  async (ctx: GetClaimRequest, { dispatch, extra }) => {
    const { claimsApi } = extra as Dependencies;

    try {
      const response = await claimsApi.getClaim(ctx);
      dispatch(claimLoaded(response.payload));
      return response.payload;
    } catch (error) {
      throw error;
    }
  }
);
