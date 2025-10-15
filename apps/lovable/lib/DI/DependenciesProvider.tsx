import React from "react";
import { DIProvider } from "@dependencies/depencieProvider";
import type { FileRouteTypes } from "@lovable/routeTree.gen";
import type {
  AppRouteName,
  AppRoutesMap as BaseAppRoutesMap,
  Dependencies as BaseDependencies,
} from "@lib/tanstack-start/routerType";

type AppRoutesMap = BaseAppRoutesMap<FileRouteTypes, AppRouteName>;
export type Dependencies = BaseDependencies<FileRouteTypes, AppRouteName>;

const appRoutes = {
  PRO_HOME: "/pro",
  ADMIN_HOME: "/admin",
  HOUSING_HOME: "/housing",
  GLI: "/pro/gli",
  SINISTER_ID: "/pro/sinistres/$claimId",
  SINISTER: "/pro/sinistres",
  BORDEREAUX_NEW: "/pro/bordereaux/nouveau",
  BORDEREAUX_ID: "/pro/bordereaux/$bordereauId",
  BORDEREAUX: "/pro/bordereaux",
} satisfies AppRoutesMap;

export const DependenciesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value: Dependencies = {
    routes: appRoutes,
  };

  return <DIProvider<Dependencies> dependencies={value}>{children}</DIProvider>;
};
