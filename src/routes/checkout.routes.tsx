import { AllowedRolesNames, ProtectedRoute } from "../layout/ProtectedRoute";

import CheckoutLayout from "../layout/CheckoutLayout";
import CheckoutPaymentMethod from "../pages/Checkout/PaymentMethod";
import CheckoutPaymentCardForm from "../pages/Checkout/PaymentCardForm";

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
    {
      path: "payment/:paymentMethodId/card-form",
      element: <CheckoutPaymentCardForm />,
    },
  ],
};
