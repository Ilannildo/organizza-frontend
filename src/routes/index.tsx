import { lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Loadable } from "../layout/Loadable";
import Loader from "../layout/Loader";

// import pages with lazy load
const OrganizerDashboard = Loadable(
  lazy(() => import("../pages/organizer/Dashboard"))
);
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
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
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const ProtectedRoute = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  // const { isLoading, data } = useAuthenticatedUser();

  const data: any | undefined = undefined;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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
    return children;
  }
  return <Loader isLoading={isLoading} progressBar={true} />;
};
