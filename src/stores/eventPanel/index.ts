import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IEventPanelResponse } from "../../models/event";
import { IEventPanelSalesResponse } from "../../models/serviceOrder";
import { IEventPanelTicketInformationResponse } from "../../models/ticket";
import { api } from "../../services/api";
import {
  createEventPanelByIdKey,
  createEventPanelSalesKey,
  createEventPanelTicketInformationKey,
} from "./keys";

export const useEventPanelById = (
  { eventId }: { eventId?: string },
  options?: UseQueryOptions<IEventPanelResponse>
) => {
  return useQuery(
    createEventPanelByIdKey(eventId),
    () => api.get(`/event-panel/${eventId}`).then((res) => res.data.data),
    {
      ...options,
      retry: 0,
    }
  );
};

export const useEventPanelTicketInformation = (
  { eventId }: { eventId?: string },
  options?: UseQueryOptions<IEventPanelTicketInformationResponse>
) => {
  return useQuery(
    createEventPanelTicketInformationKey(eventId),
    () =>
      api
        .get(`/event-panel/${eventId}/ticket-information`)
        .then((res) => res.data.data),
    {
      ...options,
      retry: 0,
    }
  );
};

export const useEventPanelSales = (
  { eventId }: { eventId?: string },
  options?: UseQueryOptions<IEventPanelSalesResponse>
) => {
  return useQuery(
    createEventPanelSalesKey(eventId),
    () =>
      api
        .get(`/event-panel/${eventId}/sales`)
        .then((res) => res.data.data),
    {
      ...options,
      retry: 0,
    }
  );
};
