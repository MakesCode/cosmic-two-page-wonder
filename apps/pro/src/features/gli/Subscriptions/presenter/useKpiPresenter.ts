import { useDependencies } from '../../../../lib/depencyInversion/DependenciesProvider';

export const useKpiPresenter = (subscriptionId?: string) => {
  const { useKpiPresenter } = useDependencies();
  return useKpiPresenter({ subscriptionId });
};

