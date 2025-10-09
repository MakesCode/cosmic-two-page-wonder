import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { queryOptions } from "@tanstack/react-query";
import { Claim } from "../model/Claim";
import { retrieveClaimsUsecase } from "./retrieveClaims.usecase";
import { GetClaimsRequest } from "@dependencies/interface/pro/ClaimsGateway";

export const retrieveClaimsQueryOption = (
  ctx: GetClaimsRequest,
  dispatch?: Dispatch<UnknownAction> | null | undefined
) =>
  queryOptions<Claim[]>({
    queryKey: ["claims", ctx.params.subscriptionId],
    queryFn: async () => {
      const data = await dispatch?.(retrieveClaimsUsecase(ctx) as any).unwrap();
      return data;
    },
  });
