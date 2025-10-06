import { getKpiRequest } from "@dependencies/interface/pro/SubscriptionGateway";
import { createAppAsyncThunk } from "@lib/redux/createAppAsyncThunk";
import { Dependencies } from "@pro/lib/dependencies";

export interface CtxretrieveKpi {
  params: getKpiRequest["params"];
  data: {};
}
export const retrieveKpiUsecase = createAppAsyncThunk(
  "subscriptions/retrieveKpiUsecase",
  async (ctx: CtxretrieveKpi, { dispatch, extra }) => {
    const { subscriptionApi } = extra as Dependencies;

    try {
      const data = await subscriptionApi.getKpi(ctx);
      return data.payload;
    } catch (error) {
      throw error;
    }
  },
);
