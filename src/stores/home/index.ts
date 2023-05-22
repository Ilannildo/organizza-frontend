import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IRelevanceEventResponse } from "../../models/event";
import { api } from "../../services/api";
import { createRelevanceEventKey } from "./keys";

export const useRelevanceEvents = (
  options?: UseQueryOptions<IRelevanceEventResponse[]>
) => {
  return useQuery(
    createRelevanceEventKey(),
    () => api.get(`/home/relevance-events`).then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};
