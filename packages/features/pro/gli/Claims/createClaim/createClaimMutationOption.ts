import { mutationOptions } from "@lib/react-query/mutationOption";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { Claim } from "../model/Claim";
import { createClaimUsecase } from "./createClaim.usecase";
import { CreateClaimRequest } from "@dependencies/interface/pro/ClaimsGateway";

export const createClaimMutationOption = (
  dispatch?: Dispatch<UnknownAction> | null | undefined
) =>
  mutationOptions<Claim, Error, CreateClaimRequest>({
    mutationFn: async (ctx: CreateClaimRequest) => {
      const data = await dispatch?.(createClaimUsecase(ctx) as any).unwrap();
      return data;
    },
  });
