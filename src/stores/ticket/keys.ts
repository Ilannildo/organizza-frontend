import { QueryKey } from "@tanstack/react-query";

export const createTicketByEventIdKey = (
  limit: number,
  page: number,
  event_id?: string
): QueryKey => ["useTicketByEventIdKey", event_id, limit, page];

export const createTicketPriceTypeKey = (): QueryKey => [
  "useTicketPriceTypeKey",
];
