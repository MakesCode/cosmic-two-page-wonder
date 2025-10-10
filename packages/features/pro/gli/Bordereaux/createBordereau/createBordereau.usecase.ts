import { createAppAsyncThunk } from "@lib/redux/createAppAsyncThunk";
import { Dependencies } from "@lovable/lib/redux/dependencies";
import { CreateBordereauData } from "@features/pro/gli/Bordereaux/model/request";

export interface CtxCreateBordereau {
  params: Record<string, never>;
  data: CreateBordereauData;
}

export const createBordereauUsecase = createAppAsyncThunk(
  "bordereaux/createBordereauUsecase",
  async (ctx: CtxCreateBordereau, { extra }) => {
    const { bordereauxApi } = extra as Dependencies;

    try {
      const response = await bordereauxApi.createBordereau(ctx);
      return response.payload;
    } catch (error) {
      throw error;
    }
  }
);
