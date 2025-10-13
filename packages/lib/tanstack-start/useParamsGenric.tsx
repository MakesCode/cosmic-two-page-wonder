import { useMatch } from "@tanstack/react-router";

export function useParamsGenric<T extends object>(): T {
  const match = useMatch({ strict: false });
  return match.params as T;
}
