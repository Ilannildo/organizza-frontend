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
  { sessionTypeId }: { sessionTypeId: string },
  options?: UseQueryOptions<ISession[]>
) => {
  return useQuery(
    createUseSessionBySessionTypeIdKey(sessionTypeId),
    () =>
      api
        .get(`/session-types/${sessionTypeId}/sessions`)
        .then((res) => res.data.data),
    { ...options }
  );
};
