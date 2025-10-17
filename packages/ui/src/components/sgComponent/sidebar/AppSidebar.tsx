"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@ui/components/ui/sidebar";
import {
  BookmarkCheck,
  Gift,
  HeartHandshake,
  House,
  PersonStanding,
  AlertTriangle,
} from "lucide-react";
import * as React from "react";
import { NavUser } from "@ui/components/sgComponent/sidebar/NavUser";
import { NavMain } from "@ui/components/sgComponent/sidebar/NavMain";
import { NavDocuments } from "@ui/components/sgComponent/sidebar/NavDocument";
import { NavSecondary } from "@ui/components/sgComponent/sidebar/NavSecondary";
import logo from "@asset/img/logoMobile.png";
import { useNavigate } from "@hooks/useNavigate";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Mes Locataires",
        url: () => navigate({ to: "/" }),
        icon: () => <BookmarkCheck className="text-blue-500" />,
      },
      {
        title: "Mes logements",
        url: () => navigate({ to: "/" }),
        icon: () => <PersonStanding className="text-violet-500" />,
      },
      {
        title: "Suivi des garanties GLI",
        url: () => navigate({ to: "/" }),
        icon: () => <HeartHandshake className="text-green-500" />,
      },
      {
        title: "Gestion sinistres",
        url: () => navigate({ to: "/sinistres" }),
        icon: () => <AlertTriangle className="text-red-500" />,
      },
      {
        title: "Avantages",
        url: () => navigate({ to: "/" }),
        icon: () => <Gift />,
      },
      {
        title: "Nos annonces",
        url: () => navigate({ to: "/" }),
        icon: () => <House />,
      },
    ],
    navSecondary: [
      {
        title: "Inviter un locataire",
        url: "#",
      },
      {
        title: "Accéder au kit partenaire",
        url: "#",
      },
      {
        title: "Tutoriel de l'application",
        url: "#",
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-2 ">
              <img
                src={logo}
                alt="SmartGarant Logo"
                className="h-10 w-auto max-w-full object-contain"
              />
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
