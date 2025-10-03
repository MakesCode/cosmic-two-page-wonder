import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { queryOptions } from '@tanstack/react-query';
import type { ProfileApi } from '@features/organization/model/organization';
import { CtxRetrieveSaleProfile, retrieveSaleProfileUsecase } from '@features/organization/retrieveSaleProfile/retrieveSaleProfile.usecase';

export const retrieveSaleProfileQueryOption = (
  ctx: CtxRetrieveSaleProfile,
  dispatch?: Dispatch<UnknownAction> | null | undefined,
) =>
  queryOptions<ProfileApi>({
    queryKey: ['organization', ctx.params.organizationId, 'saleprofile'],
    queryFn: async () => {
      const data = await dispatch?.(retrieveSaleProfileUsecase(ctx) as any).unwrap();
      return data as ProfileApi;
    },
    enabled: !!ctx.params.organizationId,
  });

