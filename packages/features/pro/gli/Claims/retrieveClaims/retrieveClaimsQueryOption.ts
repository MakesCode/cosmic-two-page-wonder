import { queryOptions, QueryClient } from '@tanstack/react-query';
import { RetrieveClaimsRequest } from '../model/request';
import { RetrieveClaimsUseCase } from './retrieveClaims.usecase';
import { Dependencies } from '@pro/lib/dependencies';

export const retrieveClaimsQueryOption = (
  request: RetrieveClaimsRequest,
  dependencies: Dependencies
) => {
  return queryOptions({
    queryKey: ['claims', request.params.subscriptionId],
    queryFn: async () => {
      const useCase = new RetrieveClaimsUseCase(dependencies.claimsApi);
      return useCase.execute(request);
    },
  });
};
