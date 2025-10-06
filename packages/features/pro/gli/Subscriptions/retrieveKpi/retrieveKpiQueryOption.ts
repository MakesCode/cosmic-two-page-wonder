import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { queryOptions } from "@tanstack/react-query";
import {
  CtxretrieveKpi,
  retrieveKpiUsecase,
} from "@features/pro/gli/Subscriptions/retrieveKpi/retrieveKpi.usecase";
import { Kpi } from "@features/pro/gli/Subscriptions/model/kpi";

export const retrieveKpiQueryOption = (
  ctx: CtxretrieveKpi,
  dispatch?: Dispatch<UnknownAction> | null | undefined,
) =>
  queryOptions<Kpi>({
    queryKey: ["kpi"],
    queryFn: async () => {
      const data = await dispatch?.(retrieveKpiUsecase(ctx) as any).unwrap();
      return data;
    },
    enabled: !!ctx.params.subscriptionId,
  });
