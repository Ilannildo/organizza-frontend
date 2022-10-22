import Cookies from "js-cookie";
import { useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { api, apiUrl } from "../services/api";
import { Codes } from "../utils/codes";

export const WithAxios = ({ children }: any) => {
  const { signOut } = useAuth();

  useMemo(() => {
    api.interceptors.request.use(
      (config) => {
        const _token = Cookies.get("__token");
        if (typeof _token === "string") {
          if (_token) {
            const { origin } = new URL(config.url!);
            const allowedOrigins = [apiUrl];
            if (config.headers)
              if (allowedOrigins.includes(origin)) {
                config.headers.Authorization = `Beaer ${_token}`;
              }
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 423 || error.response.status === 401) {
          if (
            error.response.data?.error.code === Codes.AUTH__USER_NOT_AUTHORIZED ||
            error.response.data?.error.code === Codes.AUTH__USER_DISABLED || 
            error.response.data?.error.code === Codes.AUTH__UNEXPECTED_AUTHORIZATION
          ) {
            // toast.error(error.response.data?.error.message);
            return signOut();
          }
        }
        return Promise.reject(error);
      }
    );
  }, [signOut]);

  return children;
};
