import { createAppAsyncThunk } from '../../../../lib/redux/createAppAsyncThunk';
import { Dependencies } from '../../../../lib/redux/dependencies';

export interface CtxretrieveSubscription {
  params: {};
  data: {};
}
export const retrieveSubscriptionUsecase = createAppAsyncThunk(
  'subscription/retrieveSubscriptionUsecase',
  async (ctx: CtxretrieveSubscription, { dispatch, extra }) => {
    const { subscriptionApi } = extra as Dependencies;

    try {
      const data = await subscriptionApi.getSubscription({
        data: {},
        params: {},
      });
      return data.payload;
    } catch (error) {
      throw error;
    }
  },
);
