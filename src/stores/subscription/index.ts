import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  IGetSubscriptionByIdResponse,
  IGetUserSubscriptionsResponse,
} from "../../models/subscription";
import { api } from "../../services/api";
import { createSubscriptionByIdKey, createUserSubscriptionsKey } from "./keys";

export const useUserSubscriptions = (
  {
    limit,
    page,
    user_id,
    search,
  }: { user_id?: string; limit: number; page: number; search: string },
  options?: UseQueryOptions<{
    total: number;
    page: number;
    limit: number;
    subscriptions: IGetUserSubscriptionsResponse[];
  }>
) => {
  return useQuery(
    createUserSubscriptionsKey(limit, page, search, user_id),
    () =>
      api
        .get(
          `/users/subscriptions?page=${
            page + 1
          }&limit=${limit}&search=${search}`
        )
        .then((res) => res.data.data),
    {
      ...options,
      retry: 0,
    }
  );
};

export const useSubscriptionById = (
  { subscription_id }: { subscription_id?: string },
  options?: UseQueryOptions<IGetSubscriptionByIdResponse>
) => {
  return useQuery(
    createSubscriptionByIdKey(subscription_id),
    () =>
      api.get(`/subscriptions/${subscription_id}`).then((res) => res.data.data),
    {
      ...options,
      retry: 0,
    }
  );
};
