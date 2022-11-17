import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ICity } from "../../models/city";
import { api } from "../../services/api";
import { createUseAllCitiesKey } from "./keys";

export const useAllCities = (options?: UseQueryOptions<ICity[]>) => {
  return useQuery(
    createUseAllCitiesKey(),
    () => api.get("/cities").then((res) => res.data.data),
    { ...options }
  );
};
