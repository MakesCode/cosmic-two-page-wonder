import { createFileRoute } from "@tanstack/react-router";
import CreateBordereauPage from "@pages/pro/GliBordereaux/CreateBordereauPage";

export const Route = createFileRoute("/pro/(bordereaux)/bordereaux/nouveau")({
  component: () => <CreateBordereauPage />,
  ssr: false,
});
