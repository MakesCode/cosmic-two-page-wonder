import { createAppAsyncThunk } from "@lib/redux/createAppAsyncThunk";
import { Dependencies } from "@lovable/lib/redux/dependencies";
import { bordereauxLoaded } from "./bordereaux.action";

export interface CtxRetrieveBordereaux {
  params: {
    subscriptionId: string;
  };
  data: Record<string, never>;
}

export const retrieveBordereauxUsecase = createAppAsyncThunk(
  "bordereaux/retrieveBordereauxUsecase",
  async (ctx: CtxRetrieveBordereaux, { dispatch, extra }) => {
    const { bordereauxApi } = extra as Dependencies;

    try {
      const response = await bordereauxApi.getBordereaux(ctx);
      dispatch(bordereauxLoaded(response.payload.data));
      return response.payload.data;
    } catch (error) {
      throw error;
    }
  }
);
