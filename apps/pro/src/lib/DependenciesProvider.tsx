import React, { useMemo } from 'react';
import { DIProvider } from '@dependencies/depencieProvider';
import { createDependencies, Dependencies } from '@pro/lib/dependencies';
import { useQueryClient } from '@tanstack/react-query';

export const DependenciesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const queryClient = useQueryClient();
  
  const dependencies = useMemo(() => {
    return createDependencies(queryClient);
  }, [queryClient]);

  return <DIProvider dependencies={dependencies}>{children}</DIProvider>;
};
