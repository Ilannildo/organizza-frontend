import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { createUseUserAuthKey } from "./keys";
import { IUser } from "../../models/user";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

export const useAuthenticatedUser = (options?: UseQueryOptions<IUser>) => {
  const { isAuthenticated } = useAuth();
  const isToken = isAuthenticated();
  return useQuery(
    createUseUserAuthKey(),
    () => api.get(`/users/account`).then((res) => res.data.data),
    {
      ...options,
      retry: 0,
      cacheTime: 1000 * 1 * 60,
      enabled: isToken,
    }
  );
};
