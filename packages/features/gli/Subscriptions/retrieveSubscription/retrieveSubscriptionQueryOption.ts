import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { queryOptions } from '@tanstack/react-query';
import { CtxretrieveSubscription, retrieveSubscriptionUsecase } from '@features/gli/Subscriptions/retrieveSubscription/retrieveSubscription.usecase';
import { GLICreationResponse } from '@model/pro/GLICreationResponse';

export const retrieveSubscriptionQueryOption = (ctx: CtxretrieveSubscription, dispatch?: Dispatch<UnknownAction> | null | undefined) =>
  queryOptions<GLICreationResponse>({
    queryKey: ['subscription'],
    queryFn: async () => {
      const data = await dispatch?.(retrieveSubscriptionUsecase(ctx) as any).unwrap();
      return data;
    },
  });
