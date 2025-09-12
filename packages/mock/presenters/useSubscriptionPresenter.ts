import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UseSubscriptionPresenter } from '../interfaces/presenters';
import { MockSubscriptionGateway } from '../gateways/SubscriptionGateway';

export function createUseSubscriptionPresenter(): UseSubscriptionPresenter {
  return function useSubscriptionPresenter() {
    const gateway = useMemo(() => new MockSubscriptionGateway(), []);
    
    const { data, isLoading } = useQuery({
      queryKey: ['subscription'],
      queryFn: () => gateway.getSubscription({}),
      select: (response) => response.payload,
    });
    
    return { 
      subscription: data || null, 
      isLoadingSubscription: isLoading 
    };
  };
}
