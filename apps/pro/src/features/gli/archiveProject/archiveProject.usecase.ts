import { createAppAsyncThunk } from "../../../lib/redux/createAppAsyncThunk";
import { Dependencies } from "../../../lib/redux/dependencies";
import { TypeNotifyMessage } from "../../common/notify/model/typeMessage";
import { notificationAdded } from "../../common/notify/notify.action";
import { postArchiveProjectRequest } from "../RentalApprovals/model/request";


export interface CtxarchiveProject {
  params: postArchiveProjectRequest['params'];
  data: {};
}
export const archiveProjectUsecase = createAppAsyncThunk(
  'rentalapprovals/archiveProjectUsecase',
  async (ctx: CtxarchiveProject, { dispatch, extra }) => {
    const { rentalApprovalApi, queryClient } = extra as Dependencies;

    try {
      await rentalApprovalApi.postArchiveProject(ctx);
      queryClient.invalidateQueries({
        queryKey: ['rentalApprovals', 'subscription', ctx.params.subscriptionId],
        exact: false,
      });
      return;
    } catch (error) {
      dispatch(
        notificationAdded({
          typeMessage: TypeNotifyMessage.errorApi,
        }),
      );
      throw error;
    }
  },
);
