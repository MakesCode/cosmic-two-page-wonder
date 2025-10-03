import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { queryOptions } from "@tanstack/react-query";

import { GLICreationResponse } from "@features/pro/gli/Subscriptions/model/GLICreationResponse";
import {
  CtxretrieveSubscription,
  retrieveSubscriptionUsecase,
} from "./retrieveSubscription.usecase";

export const retrieveSubscriptionQueryOption = (
  ctx: CtxretrieveSubscription,
  dispatch?: Dispatch<UnknownAction> | null | undefined,
) =>
  queryOptions<GLICreationResponse>({
    queryKey: ["subscription"],
    queryFn: async () => {
      const data = await dispatch?.(retrieveSubscriptionUsecase(ctx) as any).unwrap();
      return data;
    },
  });
