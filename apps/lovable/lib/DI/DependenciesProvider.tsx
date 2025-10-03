import React from "react";
import { DIProvider } from "@dependencies/depencieProvider";

export const DependenciesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = {};

  return <DIProvider dependencies={value}>{children}</DIProvider>;
};
