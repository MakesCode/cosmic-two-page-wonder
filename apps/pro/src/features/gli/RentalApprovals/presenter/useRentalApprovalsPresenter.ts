import { useDependencies } from '../../../../lib/depencyInversion/DependenciesProvider';
import type { RentalApproval } from '../model/RentalApproval';

export const useRentalApprovalsPresenter = (args: { subscriptionId?: string }) => {
  const { useRentalApprovalsPresenter } = useDependencies();
  return useRentalApprovalsPresenter(args);
};
