import { AllowedRolesNames, ProtectedRoute } from "../layout/ProtectedRoute";

import CheckoutLayout from "../layout/CheckoutLayout";
import CheckoutPay from "../pages/Checkout/Pay";
import CheckoutPaymentAddress from "../pages/Checkout/PaymentAddress";
import CheckoutPaymentCardForm from "../pages/Checkout/PaymentCardForm";
import CheckoutPaymentCardInstallments from "../pages/Checkout/PaymentCardInstallments";
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
      path: "address",
      element: <CheckoutPaymentAddress />,
    },
    {
      path: "payment",
      element: <CheckoutPaymentMethod />,
    },
    {
      path: "payment/:paymentMethodId/card-form",
      element: <CheckoutPaymentCardForm />,
    },
    {
      path: "payment/:paymentMethodId/installments",
      element: <CheckoutPaymentCardInstallments />,
    },
    {
      path: "payment/pay",
      element: <CheckoutPay />,
    },
  ],
};
