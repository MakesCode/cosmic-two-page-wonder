import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pro/(sinistres)/sinistres_/test")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pro/sinistres/test"!</div>;
}
