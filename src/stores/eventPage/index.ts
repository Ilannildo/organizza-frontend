import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IEventPage } from "../../models/event";
import { IEventPageSessions } from "../../models/session";
import { IEventPageTickets } from "../../models/ticket";
import { api } from "../../services/api";
import {
  createEventPageBySlugKey,
  createEventPageSessionKey,
  createEventPageTicketKey,
} from "./keys";

export const useEventPageTickets = (
  { eventId }: { eventId?: string },
  options?: UseQueryOptions<IEventPageTickets[]>
) => {
  return useQuery(
    createEventPageTicketKey(eventId),
    () =>
      api
        .get(`/event-page/tickets?event_id=${eventId}`)
        .then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};

export const useEventPageBySlug = (
  slug?: string,
  options?: UseQueryOptions<IEventPage>
) => {
  return useQuery(
    createEventPageBySlugKey(slug),
    () => api.get(`/event-page?slug=${slug}`).then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};

export const useEventPageSessions = (
  { eventId }: { eventId?: string },
  options?: UseQueryOptions<IEventPageSessions>
) => {
  return useQuery(
    createEventPageSessionKey(eventId),
    () =>
      api
        .get(`/event-page/sessions?event_id=${eventId}`)
        .then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};
