import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { queryOptions } from '@tanstack/react-query';
import { CtxretrieveRentalApprovals, retrieveRentalApprovalsUsecase } from './retrieveRentalApprovals.usecase';
import { RentalApproval } from '../model/RentalApproval';
import { SmartGarantGrid } from '../../../common/model/SmartGarantResponse';

export const retrieveRentalApprovalsQueryOption = (
  ctx: CtxretrieveRentalApprovals,
  dispatch?: Dispatch<UnknownAction> | null | undefined,
) =>
  queryOptions<SmartGarantGrid<RentalApproval>>({
    queryKey: [
      'rentalApprovals',
      'subscription',
      ctx.params.subscriptionId,
      ctx.params?.limite,
      ctx.params?.pageIndex,
      ctx.params?.search,
      ctx.params?.status,
      ctx.params?.groupe,
    ],
    queryFn: async () => {
      const data: SmartGarantGrid<RentalApproval> = await dispatch?.(retrieveRentalApprovalsUsecase(ctx) as any).unwrap();
      return data;
    },
  });
