import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { queryOptions } from '@tanstack/react-query';
import { CtxretrieveSubscription, retrieveSubscriptionUsecase } from './retrieveSubscription.usecase';
import { GLICreationResponse } from '../model/GLICreationResponse';

export const retrieveSubscriptionQueryOption = (ctx: CtxretrieveSubscription, dispatch?: Dispatch<UnknownAction> | null | undefined) =>
  queryOptions<GLICreationResponse>({
    queryKey: ['subscription'],
    queryFn: async () => {
      const data = await dispatch?.(retrieveSubscriptionUsecase(ctx) as any).unwrap();
      return data;
    },
  });
