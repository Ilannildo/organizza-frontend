import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { createEventByIdKey } from "./keys";
import { api } from "../../services/api";
import { IEvent } from "../../models/event";

export const useEventById = (event_id: string, options?: UseQueryOptions<IEvent>) => {
  return useQuery(
    createEventByIdKey(event_id),
    () => api.get(`/events/${event_id}`).then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};
