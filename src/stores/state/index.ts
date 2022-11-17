import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IState } from "../../models/state";
import { api } from "../../services/api";
import { createUseAllStatesKey } from "./keys";

export const useAllStates = (options?: UseQueryOptions<IState[]>) => {
  return useQuery(
    createUseAllStatesKey(),
    () => api.get("/states").then((res) => res.data.data),
    { ...options }
  );
};
