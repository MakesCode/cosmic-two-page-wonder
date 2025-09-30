import { mutationOptions } from '../../../lib/react-query/mutationOption';
import { OptionalDispatch } from '../../../lib/redux/type';
import { archiveProjectUsecase, CtxarchiveProject } from './archiveProject.usecase';

export const archiveProjectMutationOption = (dispatch: OptionalDispatch) =>
  mutationOptions({
    mutationKey: ['archiveProject'],
    mutationFn: async (ctx: CtxarchiveProject) => {
      return await dispatch?.(archiveProjectUsecase(ctx) as any).unwrap();
    },
  });
