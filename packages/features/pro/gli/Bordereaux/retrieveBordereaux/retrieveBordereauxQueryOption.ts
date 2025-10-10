import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { queryOptions } from "@tanstack/react-query";
import { Bordereau } from "@features/pro/gli/Bordereaux/model/Bordereau";
import {
  CtxRetrieveBordereaux,
  retrieveBordereauxUsecase,
} from "./retrieveBordereaux.usecase";

export const retrieveBordereauxQueryOption = (
  ctx: CtxRetrieveBordereaux,
  dispatch?: Dispatch<UnknownAction> | null | undefined
) =>
  queryOptions<Bordereau[]>({
    queryKey: ["bordereaux", ctx.params.subscriptionId],
    queryFn: async () => {
      const data = await dispatch?.(retrieveBordereauxUsecase(ctx) as any).unwrap();
      return data;
    },
  });
