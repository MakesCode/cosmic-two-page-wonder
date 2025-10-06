import React from 'react';
import { DIProvider } from '@dependencies/depencieProvider';
import { Dependencies } from '@pro/lib/dependencies';

export const DependenciesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value: Partial<Dependencies> = {
  };

  return <DIProvider dependencies={value}>{children}</DIProvider>;
};
