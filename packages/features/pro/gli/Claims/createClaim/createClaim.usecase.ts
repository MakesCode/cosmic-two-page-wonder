import { createAppAsyncThunk } from "@lib/redux/createAppAsyncThunk";
import { Dependencies } from "@lovable/lib/redux/dependencies";
import { claimCreated } from "../retrieveClaims/claims.action";
import { CreateClaimRequest } from "@dependencies/interface/pro/ClaimsGateway";

export const createClaimUsecase = createAppAsyncThunk(
  "claims/createClaimUsecase",
  async (ctx: CreateClaimRequest, { dispatch, extra }) => {
    const { claimsApi } = extra as Dependencies;

    try {
      const response = await claimsApi.createClaim(ctx);
      dispatch(claimCreated(response.payload));
      return response.payload;
    } catch (error) {
      throw error;
    }
  }
);
