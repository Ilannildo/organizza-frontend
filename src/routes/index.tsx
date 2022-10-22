import { lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loadable } from "../layout/Loadable";
import Loader from "../layout/Loader";

// import pages with lazy load
const OrganizerDashboard = Loadable(
  lazy(() => import("../pages/organizer/Dashboard"))
  );
  const Login = Loadable(lazy(() => import("../pages/auth/Login")));
  const Register = Loadable(lazy(() => import("../pages/auth/Register")));
const NotFound = Loadable(lazy(() => import("../pages/auth/NotFound")));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute>
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const ProtectedRoute = ({ children }: any) => {
  const {isAuthenticated, isLoading} = useAuth();
  // const { isLoading, data } = useAuthenticatedUser();

  const data = isAuthenticated();
  const location = useLocation();

  if (!data) {
    return (
      <Navigate
        to={`/login?callback-url=${location.pathname}`}
        replace
        state={{ from: location }}
      />
    );
  }
  return children;
  // if (!isLoading) {
    
  // }
  // return <Loader isLoading={isLoading} progressBar={true} />;
};
