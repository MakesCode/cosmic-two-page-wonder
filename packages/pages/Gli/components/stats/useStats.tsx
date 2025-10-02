import { selectSubscriptionId } from '../../../../features/common/globalIds/globalIds.selector';
import { retrieveKpiQueryOption } from '../../../../features/gli/Subscriptions/retrieveKpi/retrieveKpiQueryOption';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

export const useStats = () => {
  const dispatch = useDispatch();
  const subscriptionId = useSelector(selectSubscriptionId);
  console.log("subscriptionId", subscriptionId);
  
  const { data: kpi } = useQuery(retrieveKpiQueryOption(
    {
      data: {},
      params: {
        subscriptionId: subscriptionId!,
      },
    },
    dispatch,
  ));
  console.log("kpi", kpi);
  
  return {
    averageRent: kpi?.averageGuaranteedRentAmount ?? 0,
    guaranteedTenants: kpi?.activeRentalApprovalCount ?? 0,
    openClaims: kpi?.claimCount ?? 0,
    totalCandidates: kpi?.rentalApprovalCount ?? 0,
    validatedFiles: kpi?.approvedRentalApprovalCount ?? 0,
  }
}

