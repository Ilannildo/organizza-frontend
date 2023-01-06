import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IInstallmentResponse } from "../../models/installments";
import { IPaymentMethodResponse } from "../../models/paymentMethod";
import { api } from "../../services/api";
import {
  createAllPaymentInstallmentsKey,
  createAllPaymentMethodKey,
} from "./keys";

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

export const useAllPaymentInstallments = (
  serviceOrderId?: string,
  paymentMethodId?: string,
  options?: UseQueryOptions<IInstallmentResponse[]>
) => {
  return useQuery(
    createAllPaymentInstallmentsKey(serviceOrderId, paymentMethodId),
    () =>
      api
        .get(
          `/service-orders/${serviceOrderId}/payments/${paymentMethodId}/installments`
        )
        .then((res) => res.data.data),
    {
      ...options,
      retry: false,
    }
  );
};
