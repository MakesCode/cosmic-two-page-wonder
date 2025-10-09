import { createFileRoute } from "@tanstack/react-router";
import CreateClaimPage from "@pages/pro/GliClaims/CreateClaimPage";

export const Route = createFileRoute("/pro/sinistres/nouveau")({
  component: () => <CreateClaimPage />,
  ssr: false,
});
