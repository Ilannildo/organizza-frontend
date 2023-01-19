import { IEvent } from "./event";
import { ITicketServiceOrder } from "./ticketServiceOrder";
import { IUser } from "./user";

export interface ISubscription {
  id: string;
  user_id: string;
  event_id: string;
  code_ref: string;
  ticket_service_order_id: string;
  status: "pending" | "processing" | "completed" | "refused";
  created_at?: Date;
  updated_at?: Date;
  user?: IUser;
  event?: IEvent;
  ticket_service_order?: ITicketServiceOrder;
}

export interface IGetUserSubscriptionsResponse {
  id: string;
  code: string;
  event_title: string;
  start_date: Date;
  subscription_date: Date;
  status: "pending" | "processing" | "completed" | "refused";
}

export interface IGetSubscriptionByIdResponse {
  id: string;
  code: string;
  status: "pending" | "processing" | "completed" | "refused";
  participant: {
    name: string;
    email: string;
  };
  ticket: {
    title: string;
    price: number;
    is_free: boolean;
  };
  event: {
    title: string;
    slug: string;
    place: string;
    start_date: Date;
    end_date: Date;
  };
  summary: {
    code_ref: string;
    payment_method?: string;
    payment_date?: Date;
    subscription_date: Date;
    value?: number;
    fee?: number;
    amount_total: number;
    status_payment: "open" | "processing" | "settled" | "closed" | "canceled";
  };
}
