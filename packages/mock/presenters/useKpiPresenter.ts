import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MockKpiGateway } from '../gateways/KpiGateway';
import { MockSubscriptionGateway } from '../gateways/SubscriptionGateway';

export function useKpiPresenter() {
    const gateway = useMemo(() => new MockKpiGateway(), []);
    const gatewaySub = new MockSubscriptionGateway()
    const { data: dataSub } = useQuery({
      queryKey: ['subscription'],
      queryFn: () => gatewaySub.getSubscription({}),
      select: (response) => response.payload,
    });
    const subscriptionId = dataSub?.id 
    const { data, isLoading } = useQuery({
      queryKey: ['kpi', subscriptionId],
      queryFn: () => gateway.getKpi(subscriptionId || 'sub-001'),
      select: (response) => response.payload,
      enabled: !!subscriptionId,
    });
    
    return { 
      kpi: data || null, 
      isLoadingKpi: isLoading 
    };
}
