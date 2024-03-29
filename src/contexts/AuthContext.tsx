import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import config from "../config";
import { api } from "../services/api";

type AuthContextProps = {
  initialized: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  isAuthenticated: () => boolean;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  const isAuthenticated = () => {
    try {
      const token = Cookies.get(config.token_key);
      return !!token;
    } catch (error) {
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
      setIsLoading(true);
      try {
        const res = await api.post("/auth/login", {
          email,
          password,
        });
        Cookies.set(config.token_key, res.data.data.access_token, {
          expires: 1,
          secure: true,
          sameSite: "lax",
        });
        setIsLoading(false);
        resolve(true);
      } catch (error: any) {
        setIsLoading(false);
        reject(error);
      }
    });
  };
  const signOut = async () => {
    return new Promise<void>((resolve, reject) => {
      setIsLoading(true);
      setInitialized(false);

      Cookies.remove(config.token_key);
      setIsLoading(false);
      window.location.reload();
      resolve();
    });
  };

  return (
    <AuthContext.Provider
      value={{
        initialized,
        isLoading,
        signIn,
        signOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
