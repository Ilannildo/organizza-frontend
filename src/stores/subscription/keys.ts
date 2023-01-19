import { QueryKey } from "@tanstack/react-query";

export const createUserSubscriptionsKey = (
  limit: number,
  page: number,
  search: string,
  user_id?: string
): QueryKey => ["userUserSubscriptionsKey", user_id, page, limit, search];

export const createSubscriptionByIdKey = (
  subscription_id?: string
): QueryKey => ["userSubscriptionByIdKey", subscription_id];
