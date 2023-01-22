import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAuthenticatedUser } from "../../stores/user";
import Loader from "../Loader";

export enum AllowedRolesNames {
  "ADMIN" = "ADMIN",
  "ORGANIZER" = "ORGANIZER",
  "PARTICIPANT" = "PARTICIPANT",
}

interface IProtectedRoutes {
  children: any;
  allowedRoles?: string[];
  checkout?: boolean;
}

export const ProtectedRoute = ({
  children,
  checkout,
  allowedRoles,
}: IProtectedRoutes) => {
  const { isAuthenticated } = useAuth();

  const isToken = isAuthenticated();

  const { isLoading, data } = useAuthenticatedUser({
    enabled: isToken,
  });
  const location = useLocation();

  if (!isToken) {
    return (
      <Navigate
        to={`/login?callback-url=${location.pathname}`}
        replace
        state={{ from: location, checkout }}
      />
    );
  }

  if (!isLoading) {
    if (!data) {
      return (
        <Navigate
          to={`/login?callback-url=${location.pathname}`}
          replace
          state={{ from: location, checkout }}
        />
      );
    }
    if (allowedRoles !== undefined) {
      if (!allowedRoles.some((role) => data?.role?.name === role)) {
        return <Navigate to={`/`} replace state={{ from: location }} />;
      }
    }
    return children;
  }
  return <Loader isLoading={isLoading} progressBar={true} />;
};
