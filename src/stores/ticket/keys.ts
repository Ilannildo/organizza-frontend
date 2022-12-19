import { QueryKey } from "@tanstack/react-query";

export const createTicketByEventIdKey = (event_id?: string): QueryKey => [
  "useTicketByEventIdKey",
  event_id,
];
