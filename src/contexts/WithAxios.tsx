import Cookies from "js-cookie";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { Codes } from "../utils/codes";

export const WithAxios = ({ children }: any) => {
  const { signOut } = useAuth();

  useMemo(() => {
    api.interceptors.request.use(
      (config) => {
        const _token = Cookies.get("__token");
        if (typeof _token === "string") {
          if (_token) {
            config.headers
              ? (config.headers.Authorization = `Bearer ${_token}`)
              : (config.headers = { Authorization: `Bearer ${_token}` });
            // if (config.headers)
            //   config.headers.Authorization = `Bearer ${_token}`;
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
        if (error.response) {
          if (error.response.status === 423 || error.response.status === 401) {
            if (
              error.response.data?.error.code ===
                Codes.AUTH__USER_NOT_AUTHORIZED ||
              error.response.data?.error.code === Codes.AUTH__USER_DISABLED
            ) {
              toast.error(error.response.data?.error.message);
              return signOut();
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }, [signOut]);

  return children;
};
