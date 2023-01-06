import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { createEventByIdKey, createEventBySlugKey, createEventByUserIdKey } from "./keys";
import { api } from "../../services/api";
import { IEvent } from "../../models/event";

export const useEventById = (
  event_id?: string,
  options?: UseQueryOptions<IEvent>
) => {
  return useQuery(
    createEventByIdKey(event_id),
    () => api.get(`/events?event_id=${event_id}`).then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};

export const useEventBySlug = (
  slug?: string,
  options?: UseQueryOptions<IEvent>
) => {
  return useQuery(
    createEventBySlugKey(slug),
    () => api.get(`/events/slug?slug=${slug}`).then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};

export const useEventByUserId = (
  user_id?: string,
  options?: UseQueryOptions<IEvent[]>
) => {
  return useQuery(
    createEventByUserIdKey(user_id),
    () => api.get(`/users/events`).then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};
