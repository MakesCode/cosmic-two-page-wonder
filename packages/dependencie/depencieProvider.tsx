import React, { createContext, useContext } from "react";

const DIContext = createContext<unknown | null>(null);

type DIProviderProps<T> = {
  children: React.ReactNode;
  dependencies: T;
};

export const DIProvider = <T,>({ children, dependencies }: DIProviderProps<T>) => {
  return <DIContext.Provider value={dependencies}>{children}</DIContext.Provider>;
};

export const useDI = <T,>() => {
  const context = useContext(DIContext);
  if (context == null) {
    throw new Error("useDI doit être utilisé dans un DIProvider");
  }
  return context as T;
};

export const useDependencies = <T,>() => {
  return useDI<T>();
};
