import { ApiRequest } from '@features/model/apiRequest';

export type RetrieveClaimsRequest = ApiRequest<
  { subscriptionId: string },
  Record<string, never>
>;
