import { QueryKey } from "@tanstack/react-query";

export const createEventByIdKey = (event_id?: string): QueryKey => [
  "useEventByIdKey",
  event_id,
];

export const createEventBySlugKey = (slug?: string): QueryKey => [
  "useEventByIdKey",
  slug,
];

export const createEventByUserIdKey = (
  limit: number,
  page: number,
  user_id?: string
): QueryKey => ["useEventByUserIdKey", user_id, page, limit];
