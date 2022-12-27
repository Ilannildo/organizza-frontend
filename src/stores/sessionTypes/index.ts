import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ISession } from "../../models/session";
import { ISessionType, ISessionTypeMenu } from "../../models/sessionType";
import { api } from "../../services/api";
import {
  createUseAllSessionTypesMenuKey,
  createUseSessionBySessionTypeIdKey,
  createUseSessionTypeByIdKey,
} from "./keys";

export const useAllSessionTypesMenu = (
  options?: UseQueryOptions<ISessionTypeMenu[]>
) => {
  return useQuery(
    createUseAllSessionTypesMenuKey(),
    () => api.get("/session-types/menu").then((res) => res.data.data),
    { ...options }
  );
};

export const useSessionTypeById = (
  { sessionTypeId }: { sessionTypeId: string },
  options?: UseQueryOptions<ISessionType>
) => {
  return useQuery(
    createUseSessionTypeByIdKey(sessionTypeId),
    () =>
      api.get(`/session-types/${sessionTypeId}`).then((res) => res.data.data),
    { ...options }
  );
};

export const useSessionBySessionTypeId = (
  {
    sessionTypeId,
    eventId,
    limit,
    page = 1,
  }: { sessionTypeId: string; eventId: string; limit: number; page: number },
  options?: UseQueryOptions<{
    sessions: ISession[];
    limit: number;
    page: number;
    total: number;
  }>
) => {
  return useQuery(
    createUseSessionBySessionTypeIdKey(eventId, sessionTypeId, page, limit),
    () =>
      api
        .get(
          `/events/${eventId}/session-types/${sessionTypeId}/sessions?page=${
            page + 1
          }&limit=${limit}`
        )
        .then((res) => res.data.data),
    { ...options }
  );
};
