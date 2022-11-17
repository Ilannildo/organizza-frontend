import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IEventType } from "../../models/eventType";
import { api } from "../../services/api";
import { createUseAllEventTypesKey } from "./keys";

export const useAllEventTypes = (options?: UseQueryOptions<IEventType[]>) => {
  return useQuery(
    createUseAllEventTypesKey(),
    () => api.get("/event-types").then((res) => res.data.data),
    { ...options }
  );
};
