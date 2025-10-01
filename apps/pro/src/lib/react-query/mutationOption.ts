import { UseMutationOptions, DefaultError } from '@tanstack/react-query';

export interface DataState<T, TState> {
  data: T;
  state: TState;
}

export function mutationOptions<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationOptions<TData, TError, TVariables, TContext> {
  return options;
}
