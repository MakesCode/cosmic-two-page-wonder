import { retrieveBordereauQueryOption } from "@features/pro/gli/Bordereaux/retrieveBordereau/retrieveBordereauQueryOption";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useBordereau = (bordereauId: string) => {
  const dispatch = useDispatch();

  const { data: bordereau, isLoading } = useQuery(
    retrieveBordereauQueryOption(
      {
        data: {},
        params: {
          bordereauId,
        },
      },
      dispatch
    )
  );

  return {
    bordereau,
    isLoading,
  };
};
