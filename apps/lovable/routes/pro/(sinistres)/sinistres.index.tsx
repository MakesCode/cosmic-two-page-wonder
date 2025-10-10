import GliClaimsPage from "@pages/pro/GliClaims";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pro/(sinistres)/sinistres/")({
  component: GliClaimsPage,
});
