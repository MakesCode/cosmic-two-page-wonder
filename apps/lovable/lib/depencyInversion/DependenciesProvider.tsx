import React from 'react';
import { 
  UseSubscriptionPresenter, 
  UseKpiPresenter, 
  UseRentalApprovalsPresenter,
  createUseSubscriptionPresenter,
  createUseKpiPresenter,
  createUseRentalApprovalsPresenter
} from '@mock/index';

export type Dependencies = {
  useSubscriptionPresenter?: UseSubscriptionPresenter;
  useKpiPresenter?: UseKpiPresenter;
  useRentalApprovalsPresenter?: UseRentalApprovalsPresenter;
};

const DependenciesContext = React.createContext<Required<Dependencies>>({
  useSubscriptionPresenter: createUseSubscriptionPresenter(),
  useKpiPresenter: createUseKpiPresenter(),
  useRentalApprovalsPresenter: createUseRentalApprovalsPresenter(),
});

export const DependenciesProvider: React.FC<{
  dependencies?: Dependencies;
  children: React.ReactNode;
}> = ({ dependencies, children }) => {
  const value = React.useMemo(() => {
    return {
      useSubscriptionPresenter: dependencies?.useSubscriptionPresenter ?? createUseSubscriptionPresenter(),
      useKpiPresenter: dependencies?.useKpiPresenter ?? createUseKpiPresenter(),
      useRentalApprovalsPresenter: dependencies?.useRentalApprovalsPresenter ?? createUseRentalApprovalsPresenter(),
    } as Required<Dependencies>;
  }, [dependencies]);
  return <DependenciesContext.Provider value={value}>{children}</DependenciesContext.Provider>;
};

export const useDependencies = () => React.useContext(DependenciesContext);
