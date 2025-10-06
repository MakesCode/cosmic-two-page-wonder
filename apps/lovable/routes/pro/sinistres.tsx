import { createFileRoute } from "@tanstack/react-router";
import { GliClaimsPage } from "@pages/pro/GliClaims";

export const Route = createFileRoute("/pro/sinistres")({
  component: GliClaimsPage,
});
