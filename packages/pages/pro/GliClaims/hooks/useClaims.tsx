import { selectSubscriptionId } from "@features/common/globalIds/globalIds.selector";
import { retrieveClaimsQueryOption } from "@features/pro/gli/Claims/retrieveClaims/retrieveClaimsQueryOption";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

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

  return {
    claims,
    isLoading,
  };
};
