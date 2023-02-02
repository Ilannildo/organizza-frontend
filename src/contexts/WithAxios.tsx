import { AxiosHeaders } from "axios";
import Cookies from "js-cookie";
import { useMemo } from "react";
import { toast } from "react-toastify";
import config from "../config";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { Codes } from "../utils/codes";

export const WithAxios = ({ children }: any) => {
  const { signOut } = useAuth();

  useMemo(() => {
    api.interceptors.request.use(
      (request) => {
        const _token = Cookies.get(config.token_key);
        if (typeof _token === "string") {
          if (_token) {
            if (request && request.headers) {
              // request.headers = { Authorization: `Bearer ${_token}` };
              (request.headers as AxiosHeaders).set(
                "Authorization",
                `Bearer ${_token}`
              );
            }
          }
        }
        return request;
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
