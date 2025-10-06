import { SidebarInset, SidebarProvider } from '../../ui/sidebar';
import * as React from 'react';
import { AppSidebar } from './AppSidebar';

export const Sidebar = (props: { children: React.ReactNode }) => {
  return (
    <>
      <AppSidebar variant="inset" />
      <SidebarInset>{props.children}</SidebarInset>
    </>
  );
};
