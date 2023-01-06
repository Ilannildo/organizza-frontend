import { QueryKey } from "@tanstack/react-query";

export const createUseAllSessionTypesMenuKey = (): QueryKey => [
  "useAllSessionTypesMenuKey",
];

export const createUseSessionTypeByIdKey = (
  sessionTypeId: string
): QueryKey => ["useSessionTypeByIdKey", sessionTypeId];

export const createUseSessionBySessionTypeIdKey = (
  eventId: string,
  sessionTypeId: string,
  limit: number,
  page: number
): QueryKey => ["useSessionBySessionTypeIdKey", eventId, sessionTypeId, limit, page];
