import { createFileRoute } from '@tanstack/react-router';
import { GliPage } from '@pages/Gli';
import { Sidebar } from '@sgComponent/sidebar/Sidebar';
import { SiteHeader } from '@sgComponent/sidebar/SiteHeader';
import RentalGuaranteeManagement from "@sgComponent/gli/RentalGuaranteeManagement";
import { useDependencies } from '../lib/depencyInversion/DependenciesProvider';

export const Route = createFileRoute('/gli')({
  component: GliRoute,
});

function GliRoute() {
  const { useSubscriptionPresenter, useKpiPresenter, useRentalApprovalsPresenter } = useDependencies();

  return (
    <GliPage
      dependencies={{
        useSubscriptionPresenter,
        useKpiPresenter,
        useRentalApprovalsPresenter,
        RentalGuaranteeManagement,
        Sidebar,
        SiteHeader,
      }}
    />
  );
}
