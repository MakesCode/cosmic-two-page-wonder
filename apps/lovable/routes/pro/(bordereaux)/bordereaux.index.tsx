import GliBordereauxPage from "@pages/pro/GliBordereaux";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pro/(bordereaux)/bordereaux/")({
  component: GliBordereauxPage,
});
