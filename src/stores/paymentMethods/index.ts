import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IPaymentMethodResponse } from "../../models/paymentMethod";
import { api } from "../../services/api";
import { createAllPaymentMethodKey } from "./keys";

export const useAllPaymentMethods = (
  serviceOrderId?: string,
  options?: UseQueryOptions<IPaymentMethodResponse[]>
) => {
  return useQuery(
    createAllPaymentMethodKey(serviceOrderId),
    () =>
      api
        .get(`/service-orders/${serviceOrderId}/payment-methods`)
        .then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};
