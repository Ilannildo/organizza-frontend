import { IServiceOrder } from "./serviceOrder";
import { ISubscription } from "./subscription";
import { ITicket } from "./ticket";

export interface ITicketServiceOrder {
  id: string;
  service_order_id: string;
  ticket_id: string;
  service_order?: IServiceOrder;
  ticket?: ITicket;
  subscription?: ISubscription;
}

export interface ITicketServiceOrderResponse {
  service_order_id: string;
  total: number;
  subtotal: number;
  fee: number;
  quantity: number;
  expires_in: number;
  ticket: {
    event_title: string;
    title: string;
    icon_url?: string;
  };
}
