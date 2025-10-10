import { mutationOptions } from "@lib/react-query/mutationOption";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { Bordereau } from "@features/pro/gli/Bordereaux/model/Bordereau";
import {
  CtxCreateBordereau,
  createBordereauUsecase,
} from "./createBordereau.usecase";

export const createBordereauMutationOption = (
  dispatch?: Dispatch<UnknownAction> | null | undefined
) =>
  mutationOptions<Bordereau, Error, CtxCreateBordereau>({
    mutationFn: async (ctx: CtxCreateBordereau) => {
      const data = await dispatch?.(createBordereauUsecase(ctx) as any).unwrap();
      return data;
    },
  });
