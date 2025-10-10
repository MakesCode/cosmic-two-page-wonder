import { selectSubscriptionId } from "@features/common/globalIds/globalIds.selector";
import { retrieveBordereauxQueryOption } from "@features/pro/gli/Bordereaux/retrieveBordereaux/retrieveBordereauxQueryOption";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

export const useBordereaux = () => {
  const dispatch = useDispatch();
  const subscriptionId = useSelector(selectSubscriptionId);

  const { data: bordereaux = [], isLoading } = useQuery(
    retrieveBordereauxQueryOption(
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
    bordereaux,
    isLoading,
  };
};
