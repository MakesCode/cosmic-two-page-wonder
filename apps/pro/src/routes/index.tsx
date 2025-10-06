import { createFileRoute } from "@tanstack/react-router";
import GliPage from "@pages/pro/Gli";

export const Route = createFileRoute("/")({
  component: () => <GliPage />,
  ssr: false,
});
