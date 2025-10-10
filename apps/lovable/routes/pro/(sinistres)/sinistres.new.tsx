import { createFileRoute } from "@tanstack/react-router";
import CreateClaimPage from "@pages/pro/GliClaims/CreateClaimPage";

export const Route = createFileRoute("/pro/(sinistres)/sinistres/new")({
  component: () => <CreateClaimPage />,
  ssr: false,
  errorComponent: () => <p>error</p>,
});
