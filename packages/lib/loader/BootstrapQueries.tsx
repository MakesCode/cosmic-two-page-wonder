import { retrieveSubscriptionQueryOption } from "@features/pro/gli/Subscriptions/retrieveSubscription/retrieveSubscriptionQueryOption";
import { retrieveOrganizationQueryOption } from "@features/pro/organization/retrieveOrganization/retrieveOrganizationQueryOption";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useLoadedApi = () => {
  const dispatch = useDispatch();
  useQuery(retrieveOrganizationQueryOption({ params: {}, data: {} }, dispatch));
  useQuery(retrieveSubscriptionQueryOption({ params: {}, data: {} }, dispatch));
};

export function BootstrapQueries() {
  useLoadedApi();
  return null;
}
