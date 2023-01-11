import { lazy } from "react";
import { Loadable } from "../layout/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import { AllowedRolesNames, ProtectedRoute } from "../layout/ProtectedRoute";
import CheckoutOrderCreatedPending from "../pages/Checkout/OrderCreatedPending";
import CheckoutOrderCreatedProcessing from "../pages/Checkout/OrderCreatedProcessing";
// import pages with lazy load
const Login = Loadable(lazy(() => import("../pages/Auth/Login")));
const Register = Loadable(lazy(() => import("../pages/Auth/Register")));
const ConfirmEmail = Loadable(lazy(() => import("../pages/Auth/ConfirmEmail")));
const Event = Loadable(lazy(() => import("../pages/Event")));
const NotFound = Loadable(lazy(() => import("../pages/Auth/NotFound")));
const Home = Loadable(lazy(() => import("../pages/Home")));

const CreateServiceOrder = Loadable(
  lazy(() => import("../pages/Checkout/CreateServiceOrder"))
);
const CheckoutExpired = Loadable(
  lazy(() => import("../pages/Checkout/Expired"))
);
const CheckoutOrderCreatedApproved = Loadable(
  lazy(() => import("../pages/Checkout/OrderCreatedApproved"))
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
      path: "evento/:slug/checkout/buy/expired", //:serviceOrderId/payment
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
      path: "evento/:slug/checkout/buy/order-approved", //:serviceOrderId/payment
      element: (
        <ProtectedRoute
          allowedRoles={[
            AllowedRolesNames["PARTICIPANT"],
            AllowedRolesNames["ADMIN"],
            AllowedRolesNames["ORGANIZER"],
          ]}
          checkout={true}
        >
          <CheckoutOrderCreatedApproved />
        </ProtectedRoute>
      ),
    },
    {
      path: "evento/:slug/checkout/buy/order-pending", //:serviceOrderId/payment
      element: (
        <ProtectedRoute
          allowedRoles={[
            AllowedRolesNames["PARTICIPANT"],
            AllowedRolesNames["ADMIN"],
            AllowedRolesNames["ORGANIZER"],
          ]}
          checkout={true}
        >
          <CheckoutOrderCreatedPending />
        </ProtectedRoute>
      ),
    },
    {
      path: "evento/:slug/checkout/buy/order-processing", //:serviceOrderId/payment
      element: (
        <ProtectedRoute
          allowedRoles={[
            AllowedRolesNames["PARTICIPANT"],
            AllowedRolesNames["ADMIN"],
            AllowedRolesNames["ORGANIZER"],
          ]}
          checkout={true}
        >
          <CheckoutOrderCreatedProcessing />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
