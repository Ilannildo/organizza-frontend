import { QueryKey } from "@tanstack/react-query";

export const createUseAllSessionTypesMenuKey = (): QueryKey => [
  "useAllSessionTypesMenuKey",
];

export const createUseSessionTypeByIdKey = (
  sessionTypeId: string
): QueryKey => ["useSessionTypeByIdKey", sessionTypeId];

export const createUseSessionBySessionTypeIdKey = (
  sessionTypeId: string
): QueryKey => ["useSessionBySessionTypeIdKey", sessionTypeId];
