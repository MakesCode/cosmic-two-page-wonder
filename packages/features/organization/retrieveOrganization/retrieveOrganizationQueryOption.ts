import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { queryOptions } from '@tanstack/react-query';
import { OrganizationBase } from '@features/organization/model/organization';
import { CtxRetrieveOrganization, retrieveOrganizationUsecase } from '@features/organization/retrieveOrganization/retrieveOrganization.usecase';

export const retrieveOrganizationQueryOption = (ctx: CtxRetrieveOrganization, dispatch?: Dispatch<UnknownAction> | null | undefined) =>
  queryOptions<OrganizationBase>({
    queryKey: ['organization'],
    queryFn: async () => {
      const data = await dispatch?.(retrieveOrganizationUsecase(ctx) as any).unwrap();
      return data;
    },
  });
