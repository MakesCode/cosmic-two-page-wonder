import { selectSubscriptionId } from "@features/common/globalIds/globalIds.selector";
import { retrieveClaimsQueryOption } from "@features/pro/gli/Claims/retrieveClaims/retrieveClaimsQueryOption";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { ClaimStatus } from "@features/pro/gli/Claims/model/Claim";

export const useClaims = () => {
  const dispatch = useDispatch();
  const subscriptionId = useSelector(selectSubscriptionId);

  const { data: claims = [], isLoading } = useQuery(
    retrieveClaimsQueryOption(
      {
        data: {},
        params: {
          subscriptionId: subscriptionId!,
        },
      },
      dispatch
    )
  );

  const openClaims = claims.filter((c) => c.status === ClaimStatus.Open).length;
  const inProgressClaims = claims.filter((c) => c.status === ClaimStatus.InProgress).length;
  const closedClaims = claims.filter((c) => c.status === ClaimStatus.Closed).length;
  const rejectedClaims = claims.filter((c) => c.status === ClaimStatus.Rejected).length;

  return {
    claims,
    isLoading,
    stats: {
      openClaims,
      inProgressClaims,
      closedClaims,
      rejectedClaims,
      totalClaims: claims.length,
    },
  };
};
