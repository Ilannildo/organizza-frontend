import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../../services/api";
import { createUseUserAuthKey } from "./keys";
import { IUser } from "./types";

export const useAuthenticatedUser = (options?: UseQueryOptions<IUser>) => {
  return useQuery(
    createUseUserAuthKey(),
    () => api.get(`/me`).then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};