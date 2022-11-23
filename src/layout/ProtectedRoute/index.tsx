import { Navigate, useLocation } from "react-router-dom";
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
}

export const ProtectedRoute = ({ children, allowedRoles }: IProtectedRoutes) => {
  const { isLoading, data } = useAuthenticatedUser();
  const location = useLocation();

  if (!isLoading) {
    if (!data) {
      return (
        <Navigate
          to={`/login?callback-url=${location.pathname}`}
          replace
          state={{ from: location }}
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