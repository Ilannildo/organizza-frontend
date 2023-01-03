import { QueryKey } from "@tanstack/react-query";

export const createAllPaymentMethodKey = (
  serviceOrderId?: string
): QueryKey => ["useAllPaymentMethodKey", serviceOrderId];

export const createAllPaymentInstallmentsKey = (
  serviceOrderId?: string,
  paymentMethodId?: string
): QueryKey => [
  "useAllPaymentInstallmentsKey",
  serviceOrderId,
  paymentMethodId,
];
