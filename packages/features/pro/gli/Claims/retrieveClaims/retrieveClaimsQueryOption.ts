import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { queryOptions } from "@tanstack/react-query";
import { Claim } from "@features/pro/gli/Claims/model/Claim";
import {
  CtxRetrieveClaims,
  retrieveClaimsUsecase,
} from "./retrieveClaims.usecase";

export const retrieveClaimsQueryOption = (
  ctx: CtxRetrieveClaims,
  dispatch?: Dispatch<UnknownAction> | null | undefined
) =>
  queryOptions<Claim[]>({
    queryKey: ["claims", ctx.params.subscriptionId],
    queryFn: async () => {
      const data = await dispatch?.(retrieveClaimsUsecase(ctx) as any).unwrap();
      return data;
    },
  });
