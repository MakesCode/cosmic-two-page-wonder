import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@sgComponent/sidebar/Sidebar";
import { SiteHeader } from "@sgComponent/sidebar/SiteHeader";

export const Route = createFileRoute("/pro/(bordereaux)/bordereaux")({
  component: () => (
    <Sidebar>
      <SiteHeader />
      <Outlet />
    </Sidebar>
  ),
  ssr: false,
});
