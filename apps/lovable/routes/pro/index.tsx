import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pro/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/pro/"!</div>;
}
