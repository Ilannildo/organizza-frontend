import { lazy } from "react";
import { Loadable } from "../layout/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import { AllowedRolesNames, ProtectedRoute } from "../layout/ProtectedRoute";
// import pages with lazy load
const Login = Loadable(lazy(() => import("../pages/Auth/Login")));
const Register = Loadable(lazy(() => import("../pages/Auth/Register")));
const ConfirmEmail = Loadable(lazy(() => import("../pages/Auth/ConfirmEmail")));
const Event = Loadable(lazy(() => import("../pages/Event")));
const NotFound = Loadable(lazy(() => import("../pages/Auth/NotFound")));
const Home = Loadable(lazy(() => import("../pages/Home")));
const OrganizerDashboard = Loadable(
  lazy(() => import("../pages/Organizer/Dashboard"))
);
const CreateEvent = Loadable(
  lazy(() => import("../pages/Organizer/Event/Create"))
);

const CreateServiceOrder = Loadable(
  lazy(() => import("../pages/Checkout/CreateServiceOrder"))
);
const CheckoutExpired = Loadable(
  lazy(() => import("../pages/Checkout/Expired"))
);

export const MainRoutes = {
  path: "",
  element: <MinimalLayout />,
  children: [
    {
      path: "",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "cadastro",
      element: <Register />,
    },
    {
      path: "confirmar-cadastro/:code",
      element: <ConfirmEmail />,
    },
    {
      path: "evento/:slug",
      element: <Event />,
    },
    {
      path: "organizador",
      element: (
        <ProtectedRoute allowedRoles={[AllowedRolesNames["ORGANIZER"]]}>
          <OrganizerDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "organizador/evento",
      element: (
        <ProtectedRoute allowedRoles={[AllowedRolesNames["ORGANIZER"]]}>
          <CreateEvent />
        </ProtectedRoute>
      ),
    },
    {
      path: "evento/:slug/checkout/:ticketId", //:serviceOrderId/payment
      element: (
        <ProtectedRoute
          allowedRoles={[
            AllowedRolesNames["PARTICIPANT"],
            AllowedRolesNames["ADMIN"],
            AllowedRolesNames["ORGANIZER"],
          ]}
          checkout={true}
        >
          <CreateServiceOrder />
        </ProtectedRoute>
      ),
    },
    {
      path: "evento/:slug/checkout/expired", //:serviceOrderId/payment
      element: (
        <ProtectedRoute
          allowedRoles={[
            AllowedRolesNames["PARTICIPANT"],
            AllowedRolesNames["ADMIN"],
            AllowedRolesNames["ORGANIZER"],
          ]}
          checkout={true}
        >
          <CheckoutExpired />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
