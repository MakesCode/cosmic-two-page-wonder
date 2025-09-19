import { ApiResponse } from '../interfaces/gateways';
import { Subscription } from '../types';
import { getDefaultSubscription } from '../data/subscriptions';

export interface SubscriptionGateway {
  getSubscription(params: any): Promise<ApiResponse<Subscription>>;
}

export class MockSubscriptionGateway implements SubscriptionGateway {
  async getSubscription(_params: any): Promise<ApiResponse<Subscription>> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const subscription = getDefaultSubscription();
    
    return {
      payload: subscription,
      success: true,
      message: 'Subscription retrieved successfully',
    };
  }
}
