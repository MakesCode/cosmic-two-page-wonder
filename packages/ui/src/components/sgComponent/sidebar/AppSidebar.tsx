'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../ui/sidebar';
import { BookmarkCheck, Gift, HeartHandshake, House, PersonStanding, X } from 'lucide-react';
import * as React from 'react';
import { NavUser } from './NavUser';
import { NavMain } from './NavMain';
import { NavDocuments } from './NavDocument';
import { NavSecondary } from './NavSecondary';
import logo from '../../../assets/img/logoMobile.png';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
      {
        title: 'Mes Locataires',
        url: '#',
        icon: () => <BookmarkCheck className="text-blue-500" />,
      },
      {
        title: 'Mes logements',
        url: '#',
        icon: () => <PersonStanding className="text-violet-500" />,
      },
      {
        title: 'Mes GLI',
        url: '#',
        icon: () => <HeartHandshake className="text-green-500" />,
      },
      {
        title: 'Avantages',
        url: '#',
        icon: () => <Gift />,
      },
      {
        title: 'Nos annonces',
        url: '#',
        icon: () => <House />,
      },
    ],
    navSecondary: [
      {
        title: 'Inviter un locataire',
        url: '#',
      },
      {
        title: 'Accéder au kit partenaire',
        url: '#',
      },
      {
        title: "Tutoriel de l'application",
        url: '#',
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-2 ">
              <img src={logo} alt="SmartGarant Logo" className="h-10 w-auto max-w-full object-contain" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments />
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
