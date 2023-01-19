import { QueryKey } from "@tanstack/react-query";

export const createEventPanelByIdKey = (event_id?: string): QueryKey => [
  "useEventPanelByIdKey",
  event_id,
];

export const createEventPanelTicketInformationKey = (
  event_id?: string
): QueryKey => ["useEventPanelTicketInformationKey", event_id];

export const createEventPanelSalesKey = (
  event_id?: string
): QueryKey => ["useEventPanelSalesKey", event_id];