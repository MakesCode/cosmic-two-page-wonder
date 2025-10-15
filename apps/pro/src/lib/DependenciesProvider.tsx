import React from "react";
import { DIProvider } from "@dependencies/depencieProvider";
import type {
  AppRouteName,
  AppRoutesMap as BaseAppRoutesMap,
  Dependencies as BaseDependencies,
} from "@lib/tanstack-start/routerType";
import { FileRouteTypes } from "@pro/routeTree.gen";

type AppRoutesMap = BaseAppRoutesMap<FileRouteTypes, AppRouteName>;
export type Dependencies = BaseDependencies<FileRouteTypes, AppRouteName>;

const appRoutes = {
  GLI: "/",
  SINISTER: "/sinistres",
  BORDEREAUX_NEW: "https://www.google.com",
} satisfies AppRoutesMap;

export const DependenciesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value: Partial<Dependencies> = {
    routes: appRoutes,
  };

  return <DIProvider dependencies={value}>{children}</DIProvider>;
};
