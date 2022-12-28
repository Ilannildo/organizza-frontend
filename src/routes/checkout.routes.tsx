import { AllowedRolesNames, ProtectedRoute } from "../layout/ProtectedRoute";

import CheckoutLayout from "../layout/CheckoutLayout";
import CheckoutPaymentMethod from "../pages/Checkout/PaymentMethod";

export const CheckoutRoutes = {
  path: "evento/:slug/checkout/:serviceOrderId",
  element: (
    <ProtectedRoute
      allowedRoles={[
        AllowedRolesNames["PARTICIPANT"],
        AllowedRolesNames["ADMIN"],
        AllowedRolesNames["ORGANIZER"],
      ]}
      checkout={true}
    >
      <CheckoutLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "payment",
      element: <CheckoutPaymentMethod />,
    },
  ],
};
