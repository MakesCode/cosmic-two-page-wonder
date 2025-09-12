import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UseKpiPresenter } from '../interfaces/presenters';
import { MockKpiGateway } from '../gateways/KpiGateway';

export function createUseKpiPresenter(): UseKpiPresenter {
  return function useKpiPresenter({ subscriptionId }: { subscriptionId?: string }) {
    const gateway = useMemo(() => new MockKpiGateway(), []);
    
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
  };
}
