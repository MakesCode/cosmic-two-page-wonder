import { createFileRoute } from '@tanstack/react-router';
import { GliPage } from '@pages/Gli';
import { Sidebar } from '@sgComponent/sidebar/Sidebar';
import { SiteHeader } from '@sgComponent/sidebar/SiteHeader';
import RentalGuaranteeManagement from "@sgComponent/gli/RentalGuaranteeManagement";

// Mock dependencies for admin app - replace with real implementations
const mockDependencies = {
  useSubscriptionPresenter: () => ({ subscription: { id: 'admin-subscription-1' } }),
  useKpiPresenter: () => ({ 
    kpi: {
      averageGuaranteedRentAmount: 1250,
      activeRentalApprovalCount: 15,
      claimCount: 3,
      rentalApprovalCount: 45,
      approvedRentalApprovalCount: 38
    }
  }),
  useRentalApprovalsPresenter: () => ({
    // Mock presenter for admin - implement with real data
    search: '',
    status: undefined,
    groupe: 1,
    pageIndex: 0,
    pageSize: 10,
    setSearch: () => {},
    setStatus: () => {},
    setGroupe: () => {},
    setPageIndex: () => {},
    setPageSize: () => {},
    resetFilters: () => {},
    rows: [],
    hasData: false,
    isLoading: false,
    isFetching: false,
    isError: false,
    totalCount: 0,
    pageCount: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    startItem: 0,
    endItem: 0,
    goToDetails: () => {},
    archive: async () => {},
    statusOptions: [
      { label: 'Tous', value: undefined },
      { label: 'En cours', value: 1 },
      { label: 'Validé', value: 2 },
      { label: 'Refusé', value: 3 }
    ],
    getStatusInfo: (status: number) => ({
      text: status === 1 ? 'En cours' : status === 2 ? 'Validé' : 'Refusé',
      variant: status === 1 ? 'default' : status === 2 ? 'secondary' : 'destructive'
    })
  }),
  RentalGuaranteeManagement,
  Sidebar,
  SiteHeader,
};

export const Route = createFileRoute('/gli')({
  component: AdminGliRoute,
});

function AdminGliRoute() {
  return (
    <GliPage dependencies={mockDependencies} />
  );
}