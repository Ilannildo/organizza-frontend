import React, { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthenticatedUser } from "../stores/user";
import { Loadable } from "../layout/Loadable";
import Loader from "../layout/Loader";

// import pages with lazy load
const OrganizerDashboard = Loadable(
  lazy(() => import("../pages/Organizer/Dashboard"))
);
const CreateEvent = Loadable(
  lazy(() => import("../pages/Organizer/Event/Create"))
);
const Event = Loadable(lazy(() => import("../pages/Event")));
const Login = Loadable(lazy(() => import("../pages/Auth/Login")));
const Register = Loadable(lazy(() => import("../pages/Auth/Register")));
const NotFound = Loadable(lazy(() => import("../pages/Auth/NotFound")));
const Home = Loadable(lazy(() => import("../pages/Home")));

export enum AllowedRolesNames {
  "ADMIN" = "ADMIN",
  "ORGANIZER" = "ORGANIZER",
  "PARTICIPANT" = "PARTICIPANT",
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="organizador"
        element={
          <ProtectedRoute allowedRoles={[AllowedRolesNames["ORGANIZER"]]}>
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="organizador/evento"
        element={
          <ProtectedRoute allowedRoles={[AllowedRolesNames["ORGANIZER"]]}>
            <CreateEvent />
          </ProtectedRoute>
        }
      />
      <Route path="evento/:slug" element={<Event />} />
      <Route path="login" element={<Login />} />
      <Route path="cadastro" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

interface IProtectedRoutes {
  children: any;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: IProtectedRoutes) => {
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
