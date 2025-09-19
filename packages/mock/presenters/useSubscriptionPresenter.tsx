import { useQuery } from '@tanstack/react-query';
import { MockSubscriptionGateway } from '../gateways/SubscriptionGateway';

export function useSubscriptionPresenter() {
    const gatewaySub = new MockSubscriptionGateway()
    
    const { data, isLoading } = useQuery({
      queryKey: ['subscription'],
      queryFn: () => gatewaySub.getSubscription({}),
      select: (response) => response.payload,
    });
    
    return { 
      subscription: data || null, 
      isLoadingSubscription: isLoading 
    };
}
