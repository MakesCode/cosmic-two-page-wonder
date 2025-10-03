import { SidebarInset, SidebarProvider } from '@ui/components/ui/sidebar';
import * as React from 'react';
import { AppSidebar } from '@ui/components/sgComponent/sidebar/AppSidebar';

export const Sidebar = (props: { children: React.ReactNode }) => {
  return (
    <>
      <AppSidebar variant="inset" />
      <SidebarInset>{props.children}</SidebarInset>
    </>
  );
};
