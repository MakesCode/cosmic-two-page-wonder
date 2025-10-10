import { createFileRoute } from "@tanstack/react-router";
import BordereauDetailPage from "@pages/pro/GliBordereaux/BordereauDetailPage";

export const Route = createFileRoute("/pro/(bordereaux)/bordereaux/$bordereauId")({
  component: () => <BordereauDetailPage />,
  ssr: false,
});
