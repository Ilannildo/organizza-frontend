import { QueryKey } from "@tanstack/react-query";

export const createEventPageTicketKey = (event_id?: string): QueryKey => [
  "useEventPageTicketKey",
  event_id,
];

export const createEventPageSessionKey = (event_id?: string): QueryKey => [
  "useEventPageSessionKey",
  event_id,
];

export const createEventPageBySlugKey = (event_id?: string): QueryKey => [
  "useEventPageBySlugKey",
  event_id,
];
