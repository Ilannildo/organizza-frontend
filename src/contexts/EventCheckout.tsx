import React, { createContext, useState } from "react";
import { IAddressForm } from "../models/address";
import { IInstallmentResponse } from "../models/installments";
import {
  IPaymentCardForm,
  IPaymentMethodResponse,
} from "../models/paymentMethod";
import { IPayServiceOrderResponse } from "../models/serviceOrder";
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
  handleFinalizeServiceOrder: () => Promise<IPayServiceOrderResponse>;
  paymentMethod: IPaymentMethodResponse | null;
  paymentCardForm: IPaymentCardForm | null;
  handleChangePaymentMethod: (value: IPaymentMethodResponse) => void;
  paymentCardInstallment: IInstallmentResponse | null;
  handleChangePaymentCardInstallment: (
    value: IInstallmentResponse | null
  ) => void;
  handleChangePaymentCardForm: (value: IPaymentCardForm | null) => void;
  handleChangePaymentAddress: (value: IAddressForm | null) => void;
  paymentAddress: IAddressForm | null;
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
  const [paymentAddress, setPaymentAddress] = useState<IAddressForm | null>(
    null
  );

  const handleChangeExpired = (value: boolean) => {
    setIsExpired(value);
  };

  const handleChangeFinalize = (value: boolean) => {
    setFinalize(value);
  };

  const handleChangePaymentCardForm = (value: IPaymentCardForm | null) => {
    setPaymentCardForm(value);
  };

  const handleChangePaymentAddress = (value: IAddressForm | null) => {
    setPaymentAddress(value);
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
    // setIsExpired(true);
    setServiceOrder(null);
    setPaymentMethod(null);
    setPaymentAddress(null);
    setPaymentCardForm(null);
    setPaymentCardInstallment(null);
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
    return new Promise<IPayServiceOrderResponse>(async (resolve, reject) => {
      try {
        setIsFinishingServiceOrder(true);
        let body;
        if (paymentMethod?.payment_type === "credit") {
          body = {
            credit_card_number: paymentCardForm?.cardNumber,
            credit_card_owner_name: paymentCardForm?.cardOwnerName,
            credit_card_expiration_date: paymentCardForm?.expirationDate,
            credit_card_cvv: paymentCardForm?.securityCode,
          };
        }
        const res = await api.post<{
          data: IPayServiceOrderResponse;
          sucess: boolean;
        }>(`/service-orders/${serviceOrder?.service_order_id}/pay`, {
          payment_method_id: paymentMethod?.payment_id,
          payment_type: paymentMethod?.payment_type,
          installments: paymentMethod
            ? paymentMethod?.payment_type === "pix"
              ? 1
              : paymentCardInstallment?.number
            : 1,
          is_free: serviceOrder?.ticket.is_free,
          customer_document: paymentCardForm?.userDocument,
          customer_phone_number: paymentCardForm?.phoneNumber,
          billing_city: paymentAddress?.city,
          billing_address: paymentAddress?.street,
          billing_number: paymentAddress?.number,
          billing_neighborhood: paymentAddress?.neighborhood,
          billing_state: paymentAddress?.state,
          billing_zipcode: paymentAddress?.zipcode,
          ...body,
        });

        console.log("RESPONSE PAYMENT ::", res.data);

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
        handleChangePaymentAddress,
        paymentAddress,
      }}
    >
      {children}
    </EventCheckoutContext.Provider>
  );
};
