import { ApiParams } from '@hooks/useFiltres';
import { createAppAsyncThunk } from '@lib/redux/createAppAsyncThunk';
import { Dependencies } from '@lib/redux/dependencies';

export interface CtxretrieveRentalApprovals {
  params: ApiParams & { subscriptionId: string };
  data: {};
}
export const retrieveRentalApprovalsUsecase = createAppAsyncThunk(
  'rentalApprovals/retrieveRentalApprovalsUsecase',
  async ({ params }: CtxretrieveRentalApprovals, { dispatch, extra }) => {
    const { rentalApprovalApi } = extra as Dependencies;

    try {
      const data = await rentalApprovalApi.getRentalApprovals({
        data: {},
        params,
      });
      return data.payload;
    } catch (error) {
      throw error;
    }
  },
);
