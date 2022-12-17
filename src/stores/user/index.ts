import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { createUseUserAuthKey } from "./keys";
import { IUser } from "../../models/user";
import { api } from "../../services/api";

export const useAuthenticatedUser = (options?: UseQueryOptions<IUser>) => {
  return useQuery(
    createUseUserAuthKey(),
    () => api.get(`/users/account`).then((res) => res.data.data),
    {
      ...options,
      retry: 0,
    }
  );
};