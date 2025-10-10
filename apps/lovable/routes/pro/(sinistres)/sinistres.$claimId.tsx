import { createFileRoute } from "@tanstack/react-router";
import ClaimDetailPage from "@pages/pro/GliClaims/ClaimDetailPage";

export const Route = createFileRoute("/pro/(sinistres)/sinistres/$claimId")({
  component: () => <ClaimDetailPage />,
  ssr: false,
});
