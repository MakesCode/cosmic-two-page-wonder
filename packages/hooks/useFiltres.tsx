import { useCallback, useMemo } from "react";
import { useSearch } from "@tanstack/react-router";
import { useNavigate } from "@hooks/useNavigate";
import { useDebounce } from "@hooks/useDebounce";

export enum RentalApprovalStatusFilter {
  Ongoing = 1,
  Active = 2,
  Archived = 3,
}

export interface RentalApprovalsFilters {
  q?: string; // search
  p?: number; // page index (0-based)
  l?: number; // limit
  sst?: number; // status
  st?: number; // status
}

export interface ApiParams {
  search: string;
  pageIndex: number;
  limite: number;
  status?: number;
  groupe?: RentalApprovalStatusFilter;
}

export interface UseFiltresParams {
  defaultPageSize?: number;
}

export interface UseFiltresReturn {
  filters: RentalApprovalsFilters;
  search: string;
  status: number | undefined;
  groupe: RentalApprovalStatusFilter | undefined;
  pageIndex: number;
  pageSize: number;
  debouncedSearch: string;

  setSearch: (search: string) => void;
  setStatus: (sst: number | undefined) => void;
  setGroupe: (st: RentalApprovalStatusFilter | undefined) => void;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
  resetFilters: () => void;

  apiParams: ApiParams;
}

export const useFiltres = ({ defaultPageSize = 10 }: UseFiltresParams = {}): UseFiltresReturn => {
  const navigate = useNavigate();

  const searchParams = useSearch({
    strict: false,
  }) as RentalApprovalsFilters;

  const filters = {
    q: searchParams.q || "",
    p: searchParams.p || 0,
    l: searchParams.l || defaultPageSize,
    sst: searchParams.sst,
    st: searchParams.st || 1,
  };

  const debouncedSearch = useDebounce(filters.q || "", 300);

  const updateFilters = useCallback(
    (newFilters: Partial<RentalApprovalsFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };

      const cleanFilters = Object.entries(updatedFilters).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>,
      );

      navigate({
        search: cleanFilters as any,
        replace: true,
      });
    },
    [filters, navigate],
  );

  const setSearch = useCallback(
    (search: string) => {
      updateFilters({ q: search, p: 0 });
    },
    [updateFilters],
  );

  const setStatus = useCallback(
    (status: number | undefined) => {
      updateFilters({ sst: status, p: 0 });
    },
    [updateFilters],
  );

  const setGroupe = useCallback(
    (groupe: RentalApprovalStatusFilter | undefined) => {
      updateFilters({ st: groupe, p: 0 });
    },
    [updateFilters],
  );

  const setPageIndex = useCallback(
    (pageIndex: number) => {
      updateFilters({ p: pageIndex });
    },
    [updateFilters],
  );

  const setPageSize = useCallback(
    (pageSize: number) => {
      updateFilters({ l: pageSize, p: 0 });
    },
    [updateFilters],
  );

  const resetFilters = useCallback(() => {
    navigate({
      search: {} as any,
      replace: true,
    });
  }, [navigate]);

  const currentPageIndex = filters.p || 0;
  const searchTerm = filters.q || "";
  const shouldUseDirectSearch = currentPageIndex > 0 && searchTerm === debouncedSearch;

  const apiParams = useMemo(
    () => ({
      search: shouldUseDirectSearch ? searchTerm : debouncedSearch,
      pageIndex: currentPageIndex,
      limite: filters.l || defaultPageSize,
      status: filters.sst,
      groupe: filters.st,
    }),
    [
      shouldUseDirectSearch,
      searchTerm,
      debouncedSearch,
      currentPageIndex,
      filters.l,
      filters.sst,
      filters.st,
      defaultPageSize,
    ],
  );

  return {
    filters,
    search: searchTerm,
    status: filters.sst,
    groupe: filters.st,
    pageIndex: currentPageIndex,
    pageSize: filters.l || defaultPageSize,
    debouncedSearch,
    setSearch,
    setStatus,
    setGroupe,
    setPageIndex,
    setPageSize,
    resetFilters,
    apiParams,
  };
};
