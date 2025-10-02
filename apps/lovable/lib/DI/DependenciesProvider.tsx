import React from 'react';
// import { 
// useStats
// } from '@mock/index';
import { useStats } from '../../../pro/src/lib/DI/hooks/useStats';
import { DIProvider } from '@dependencies/depencieProvider';
import { TypeDI } from '@dependencies/type';


export const DependenciesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value: TypeDI = {
   useStats: useStats,
  };

  return <DIProvider<TypeDI> dependencies={value}>{children}</DIProvider>;
};
