import { createAppAsyncThunk } from "@lib/redux/createAppAsyncThunk";
import { Dependencies } from "@lovable/lib/redux/dependencies";

export interface CtxRetrieveBordereau {
  params: {
    bordereauId: string;
  };
  data: Record<string, never>;
}

export const retrieveBordereauUsecase = createAppAsyncThunk(
  "bordereaux/retrieveBordereauUsecase",
  async (ctx: CtxRetrieveBordereau, { extra }) => {
    const { bordereauxApi } = extra as Dependencies;

    try {
      const response = await bordereauxApi.getBordereau(ctx);
      return response.payload;
    } catch (error) {
      throw error;
    }
  }
);
