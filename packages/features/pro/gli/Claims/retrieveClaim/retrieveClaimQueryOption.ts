import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { queryOptions } from "@tanstack/react-query";
import { Claim } from "../model/Claim";
import { retrieveClaimUsecase } from "./retrieveClaim.usecase";
import { GetClaimRequest } from "@dependencies/interface/pro/ClaimsGateway";

export const retrieveClaimQueryOption = (
  ctx: GetClaimRequest,
  dispatch?: Dispatch<UnknownAction> | null | undefined
) =>
  queryOptions<Claim>({
    queryKey: ["claim", ctx.params.claimId],
    queryFn: async () => {
      const data = await dispatch?.(retrieveClaimUsecase(ctx) as any).unwrap();
      return data;
    },
  });
