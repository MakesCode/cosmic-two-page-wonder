import { mutationOptions } from '@tanstack/react-query';
import { archiveProjectUsecase, CtxarchiveProject } from './archiveProject.usecase';
import { OptionalDispatch } from '@/lib/redux/type';

export const archiveProjectMutationOption = (dispatch: OptionalDispatch) =>
  mutationOptions({
    mutationKey: ['archiveProject'],
    mutationFn: async (ctx: CtxarchiveProject) => {
      return await dispatch?.(archiveProjectUsecase(ctx) as any).unwrap();
    },
  });
