import { QueryKey } from "@tanstack/react-query";

export const createAllPaymentMethodKey = (serviceOrderId?: string): QueryKey => [
    "useAllPaymentMethodKey",
    serviceOrderId,
  ];