import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { queryOptions } from "@tanstack/react-query";
import {
  CtxretrieveSubscriptionRentalApprovals,
  retrieveSubscriptionRentalApprovalsUsecase,
} from "@features/pro/gli/RentalApprovals/retrieveSubscriptionRentalApprovals/retrieveSubscriptionRentalApprovals.usecase";
import { RentalApproval } from "@features/pro/gli/RentalApprovals/model/RentalApproval";

export const retrieveSubscriptionRentalApprovalsQueryOption = (
  ctx: CtxretrieveSubscriptionRentalApprovals,
  dispatch?: Dispatch<UnknownAction> | null | undefined,
) =>
  queryOptions<RentalApproval>({
    queryKey: [
      "subscription",
      ctx.params.subscriptionId,
      "rentalApproval",
      ctx.params.rentalApprovalId,
    ],
    queryFn: async () => {
      const data = await dispatch?.(
        retrieveSubscriptionRentalApprovalsUsecase(ctx) as any,
      ).unwrap();
      return data;
    },
  });
