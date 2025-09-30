import { useDependencies } from '../../../../lib/depencyInversion/DependenciesProvider';

export const useSubscriptionPresenter = () => {
  const { useSubscriptionPresenter } = useDependencies();
  return useSubscriptionPresenter();
};

