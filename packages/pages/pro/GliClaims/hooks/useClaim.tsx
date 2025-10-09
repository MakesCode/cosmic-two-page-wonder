import { retrieveClaimQueryOption } from "@features/pro/gli/Claims/retrieveClaim/retrieveClaimQueryOption";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useClaim = (claimId: string) => {
  const dispatch = useDispatch();

  const { data: claim, isLoading } = useQuery(
    retrieveClaimQueryOption(
      {
        data: {},
        params: {
          claimId,
        },
      },
      dispatch
    )
  );

  return {
    claim,
    isLoading,
  };
};
