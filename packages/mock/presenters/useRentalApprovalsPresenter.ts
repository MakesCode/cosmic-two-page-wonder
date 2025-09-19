import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MockRentalApprovalsGateway } from '../gateways/RentalApprovalsGateway';
import { STATUS_OPTIONS, getStatusInfo } from '../constants/status';
import { MockSubscriptionGateway } from '../gateways/SubscriptionGateway';


export  function useRentalApprovalsPresenter() {
    const gateway = useMemo(() => new MockRentalApprovalsGateway(), []);
    const queryClient = useQueryClient();
    const gatewaySub = new MockSubscriptionGateway()
    const { data: dataSub } = useQuery({
      queryKey: ['subscription'],
      queryFn: () => gatewaySub.getSubscription({}),
      select: (response) => response.payload,
    });
    const subscriptionId = dataSub?.id 
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<number | undefined>(undefined);
    const [groupe, setGroupe] = useState<number | undefined>(1);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const resetFilters = () => {
      setSearch('');
      setStatus(undefined);
      setGroupe(1);
      setPageIndex(0);
      setPageSize(10);
    };

    // Data fetching
    const queryKey = ['rentalApprovals', subscriptionId, search, status, groupe, pageIndex, pageSize];
    
    const { data, isLoading, isFetching, isError } = useQuery({
      queryKey,
      queryFn: () => gateway.getRentalApprovals({
        subscriptionId,
        search,
        status,
        groupe,
        page: pageIndex,
        pageSize,
      }),
      select: (response) => response.payload,
      keepPreviousData: true,
    });

    // Archive mutation
    const archiveMutation = useMutation({
      mutationFn: (id: string) => gateway.archiveRentalApproval(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['rentalApprovals'] });
      },
    });

    // Computed values
    const rows = data?.data || [];
    const hasData = rows.length > 0;
    const totalCount = data?.totalCount || 0;
    const pageCount = data?.pageCount || 0;
    const hasNextPage = data?.hasNextPage || false;
    const hasPreviousPage = data?.hasPreviousPage || false;
    const startItem = pageIndex * pageSize + 1;
    const endItem = Math.min(startItem + pageSize - 1, totalCount);

    // Actions
    const goToDetails = (id: string) => {
      console.log('Navigate to details:', id);
      // In real app, this would navigate to details page
    };

    const archive = async (id: string) => {
      await archiveMutation.mutateAsync(id);
    };

    return {
      // Filters
      search,
      status,
      groupe,
      pageIndex,
      pageSize,
      setSearch,
      setStatus,
      setGroupe,
      setPageIndex,
      setPageSize,
      resetFilters,

      // Data
      rows,
      hasData,
      isLoading,
      isFetching,
      isError,
      totalCount,
      pageCount,
      hasNextPage,
      hasPreviousPage,
      startItem,
      endItem,

      // Actions
      goToDetails,
      archive,

      // Constants
      statusOptions: STATUS_OPTIONS,
      getStatusInfo,
    };
  };
