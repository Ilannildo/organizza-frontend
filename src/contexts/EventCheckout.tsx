import React, { createContext, useState } from "react";
import { ITicketServiceOrder } from "../models/ticketServiceOrder";
import { api } from "../services/api";

interface IEventCheckoutContext {
  handleCreateServiceOrder: ({
    ticketId,
  }: {
    ticketId: string;
  }) => Promise<ITicketServiceOrder>;
  isCreatingServiceOrder: boolean;
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
  const [isCreatingServiceOrder, setIsCreatingServiceOrder] = useState(false);

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

  return (
    <EventCheckoutContext.Provider
      value={{ handleCreateServiceOrder, isCreatingServiceOrder }}
    >
      {children}
    </EventCheckoutContext.Provider>
  );
};
