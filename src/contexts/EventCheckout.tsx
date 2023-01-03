import React, { createContext, useState } from "react";
import { IInstallmentResponse } from "../models/installments";
import {
  IPaymentCardForm,
  IPaymentMethodResponse,
} from "../models/paymentMethod";
import {
  ITicketServiceOrder,
  ITicketServiceOrderResponse,
} from "../models/ticketServiceOrder";
import { api } from "../services/api";

interface IEventCheckoutContext {
  handleCreateServiceOrder: ({
    ticketId,
  }: {
    ticketId: string;
  }) => Promise<ITicketServiceOrder>;
  handleGetServiceOrder: ({
    serviceOrderId,
  }: {
    serviceOrderId: string;
  }) => Promise<ITicketServiceOrderResponse>;
  isCreatingServiceOrder: boolean;
  isFinishingServiceOrder: boolean;
  isFetchingServiceOrder: boolean;
  finalize: boolean;
  isExpired: boolean;
  serviceOrder: ITicketServiceOrderResponse | null;
  handleChangeExpired: (value: boolean) => void;
  handleChangeFinalize: (value: boolean) => void;
  handleResetServiceOrder: () => void;
  handleFinalizeServiceOrder: () => void;
  paymentMethod: IPaymentMethodResponse | null;
  paymentCardForm: IPaymentCardForm | null;
  handleChangePaymentMethod: (value: IPaymentMethodResponse) => void;
  paymentCardInstallment: IInstallmentResponse | null;
  handleChangePaymentCardInstallment: (
    value: IInstallmentResponse | null
  ) => void;
  handleChangePaymentCardForm: (value: IPaymentCardForm | null) => void;
}

export const EventCheckoutContext = createContext<IEventCheckoutContext>(
  {} as IEventCheckoutContext
);

type IEventCheckoutProvider = {
  children: React.ReactNode;
};

export const EventCheckoutProvider: React.FC<IEventCheckoutProvider> = ({
  children,
}) => {
  const [isExpired, setIsExpired] = useState(false);
  const [isCreatingServiceOrder, setIsCreatingServiceOrder] = useState(false);
  const [isFinishingServiceOrder, setIsFinishingServiceOrder] = useState(false);
  const [isFetchingServiceOrder, setIsFetchingServiceOrder] = useState(false);
  const [finalize, setFinalize] = useState(false);
  const [serviceOrder, setServiceOrder] =
    useState<ITicketServiceOrderResponse | null>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<IPaymentMethodResponse | null>(null);

  const [paymentCardForm, setPaymentCardForm] =
    useState<IPaymentCardForm | null>(null);

  const [paymentCardInstallment, setPaymentCardInstallment] =
    useState<IInstallmentResponse | null>(null);

  const handleChangeExpired = (value: boolean) => {
    setIsExpired(value);
  };

  const handleChangeFinalize = (value: boolean) => {
    setFinalize(value);
  };

  const handleChangePaymentCardForm = (value: IPaymentCardForm | null) => {
    setPaymentCardForm(value);
  };

  const handleChangePaymentCardInstallment = (
    value: IInstallmentResponse | null
  ) => {
    setPaymentCardInstallment(value);
  };

  const handleChangePaymentMethod = (value: IPaymentMethodResponse) => {
    setPaymentMethod(value);
  };

  const handleResetServiceOrder = () => {
    setIsExpired(true);
    setServiceOrder(null);
    setPaymentMethod(null);
  };

  const handleGetServiceOrder = async ({
    serviceOrderId,
  }: {
    serviceOrderId: string;
  }) => {
    return new Promise<ITicketServiceOrderResponse>(async (resolve, reject) => {
      if (serviceOrder) {
        resolve(serviceOrder);
      } else {
        try {
          setIsFetchingServiceOrder(true);
          const res = await api.get(`/service-orders/${serviceOrderId}`);
          setIsFetchingServiceOrder(false);
          setServiceOrder(res.data.data);
          resolve(res.data.data);
        } catch (error: any) {
          setIsFetchingServiceOrder(false);
          reject(error);
        }
      }
    });
  };

  const handleCreateServiceOrder = async ({
    ticketId,
  }: {
    ticketId: string;
  }) => {
    return new Promise<ITicketServiceOrder>(async (resolve, reject) => {
      try {
        setIsCreatingServiceOrder(true);
        const res = await api.post("/service-orders/tickets", {
          ticket_id: ticketId,
        });

        setIsCreatingServiceOrder(false);
        resolve(res.data.data);
      } catch (error: any) {
        setIsCreatingServiceOrder(false);
        reject(error);
      }
    });
  };

  const handleFinalizeServiceOrder = async () => {
    return new Promise<ITicketServiceOrder>(async (resolve, reject) => {
      try {
        setIsFinishingServiceOrder(true);
        const res = await api.post("/service-orders/tickets", {});

        setIsFinishingServiceOrder(false);
        resolve(res.data.data);
      } catch (error: any) {
        setIsFinishingServiceOrder(false);
        reject(error);
      }
    });
  };

  return (
    <EventCheckoutContext.Provider
      value={{
        handleChangePaymentCardInstallment,
        handleChangePaymentCardForm,
        handleChangePaymentMethod,
        handleFinalizeServiceOrder,
        handleCreateServiceOrder,
        handleResetServiceOrder,
        handleGetServiceOrder,
        handleChangeFinalize,
        handleChangeExpired,
        isFinishingServiceOrder,
        isCreatingServiceOrder,
        isFetchingServiceOrder,
        isExpired,
        serviceOrder,
        finalize,
        paymentMethod,
        paymentCardForm,
        paymentCardInstallment,
      }}
    >
      {children}
    </EventCheckoutContext.Provider>
  );
};
