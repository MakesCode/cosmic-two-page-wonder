import { KpiData } from '../types';

export const mockKpiData: Record<string, KpiData> = {
  'sub-001': {
    averageGuaranteedRentAmount: 1250.75,
    activeRentalApprovalCount: 15,
    claimCount: 3,
    rentalApprovalCount: 45,
    approvedRentalApprovalCount: 38,
  },
  'sub-002': {
    averageGuaranteedRentAmount: 980.50,
    activeRentalApprovalCount: 8,
    claimCount: 1,
    rentalApprovalCount: 25,
    approvedRentalApprovalCount: 20,
  },
};

export const getKpiForSubscription = (subscriptionId: string): KpiData => {
  return mockKpiData[subscriptionId] || mockKpiData['sub-001'];
};
