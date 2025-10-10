import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { queryOptions } from "@tanstack/react-query";
import { Bordereau } from "@features/pro/gli/Bordereaux/model/Bordereau";
import {
  CtxRetrieveBordereau,
  retrieveBordereauUsecase,
} from "./retrieveBordereau.usecase";

export const retrieveBordereauQueryOption = (
  ctx: CtxRetrieveBordereau,
  dispatch?: Dispatch<UnknownAction> | null | undefined
) =>
  queryOptions<Bordereau>({
    queryKey: ["bordereau", ctx.params.bordereauId],
    queryFn: async () => {
      const data = await dispatch?.(retrieveBordereauUsecase(ctx) as any).unwrap();
      return data;
    },
  });
