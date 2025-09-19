import React from 'react';
import { 
  useKpiPresenter,
  useRentalApprovalsPresenter,
  useSubscriptionPresenter
} from '@mock/index';
import { DIProvider } from '@dependencies/depencieProvider';

export type Dependencies = {
  useSubscriptionPresenter?:  any;
  useKpiPresenter?:  any;
  useRentalApprovalsPresenter?:  any;
};

export const DependenciesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value: Dependencies = {
      useSubscriptionPresenter: useSubscriptionPresenter(),
      useKpiPresenter: useKpiPresenter(),
      useRentalApprovalsPresenter:  useRentalApprovalsPresenter(),
  };

  return <DIProvider<Dependencies> dependencies={value}>{children}</DIProvider>;
};
