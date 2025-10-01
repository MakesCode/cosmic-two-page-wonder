import { createAppAsyncThunk } from '../../../../lib/redux/createAppAsyncThunk';
import { Dependencies } from '../../../../lib/redux/dependencies';
import { subscriptionLoaded } from './subscription.action';

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
      dispatch(subscriptionLoaded(data.payload));
      return data.payload;
    } catch (error) {
      throw error;
    }
  },
);
