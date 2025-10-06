import React from "react";
import { DIProvider } from "@dependencies/depencieProvider";

export type Dependencies = {};

export const DependenciesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value: Dependencies = {};

  return <DIProvider<Dependencies> dependencies={value}>{children}</DIProvider>;
};
