import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MockSubscriptionGateway } from '../gateways/MockSubscriptionGateway';
import { TypeDI } from '@dependencies/type';

export const useStats: TypeDI["useStats"] = () => {
   const gateway = useMemo(() => new MockSubscriptionGateway(), []);
    const gatewaySub = new MockSubscriptionGateway()
    const { data: dataSub } = useQuery({
      queryKey: ['subscription'],
      queryFn: () => gatewaySub.getSubscription({data: {}, params: {}}),
      select: (response) => response.payload,
    });
    const subscriptionId = dataSub?.id 
    const { data : kpi } = useQuery({
      queryKey: ['kpi', subscriptionId],
      queryFn: () => gateway.getKpi({
        params: {subscriptionId: "", }, data: {}
      }),
      select: (response) => response.payload,
      enabled: !!subscriptionId,
    });

  return {
    averageRent: kpi?.averageGuaranteedRentAmount ?? 0,
    guaranteedTenants: kpi?.activeRentalApprovalCount ?? 0,
    openClaims: kpi?.claimCount ?? 0,
    totalCandidates: kpi?.rentalApprovalCount ?? 0,
    validatedFiles: kpi?.approvedRentalApprovalCount ?? 0,
  }
}

