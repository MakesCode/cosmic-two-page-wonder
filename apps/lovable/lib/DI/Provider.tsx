import { DependenciesProvider } from "@lovable/lib/DI/DependenciesProvider"
import { ReactNode } from "react"

interface ProviderProps {
  children: ReactNode
}

export const Provider = (props: ProviderProps) => {
  return (
    <>
      <DependenciesProvider>
        {props.children}
      </DependenciesProvider>
    </>
  )
}
